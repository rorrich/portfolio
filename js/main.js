document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при скролле
    const fadeInElements = document.querySelectorAll('.work-card, .about__text');
    
    const fadeInOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        fadeInObserver.observe(element);
    });
    
    // Добавляем стиль для класса fade-in, который будет применяться при появлении элемента
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Смена цветовой схемы при клике на кнопку "какой ты сегодня"
    const colorChanger = document.querySelector('.header__color-changer');
    const colors = [
        { 
            name: 'light', 
            background: '#F5F1F0', // bg color из Figma
            text: '#000000', // main color из Figma
            outline: '#CBCBD0', // outline из Figma
            secondary: '#8F8F8F', // secondary из Figma
            stickerBg: 'transparent' // sticker_color из Figma - убрали заливку
        },
        { 
            name: 'dark', 
            background: '#141313', // bg color из Figma
            text: '#EADBDB', // main color из Figma
            outline: '#3B3535', // outline из Figma
            secondary: '#C8BDBD', // secondary из Figma
            stickerBg: 'transparent' // sticker_color из Figma - убрали заливку
        },
        { 
            name: 'blue', 
            background: '#131844', 
            text: '#E2281E', 
            outline: '#273A62', 
            secondary: '#3E5483', 
            stickerBg: 'transparent'
        },
        { name: 'green', background: '#22351B', text: '#F7CDDB', outline: '#445E3B', secondary: '#F7E4EA', stickerBg: 'transparent' },
        { name: 'soft', background: '#9BB6D2', text: '#FFFFFF', outline: '#C0D6E3', secondary: '#FFFFFF', stickerBg: 'transparent' }
    ];
    let currentColorIndex = 0;
    
    colorChanger.addEventListener('click', function() {
        currentColorIndex = (currentColorIndex + 1) % colors.length;
        const newColor = colors[currentColorIndex];
        
        // Применяем цвета мгновенно без анимации
        
        // Удаляем все атрибуты theme
        document.body.removeAttribute('data-theme');
        
        // Если это темная тема, добавляем атрибут
        if (newColor.name === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', newColor.name);
        }
        
        // Устанавливаем стили без анимации
        document.body.style.backgroundColor = newColor.background;
        document.body.style.color = newColor.text;
        
        // Меняем цвет рамок у skill-tag и других элементов
        const borderElements = document.querySelectorAll('.skill-tag, .header__color-changer');
        borderElements.forEach(el => {
            el.style.borderColor = newColor.outline;
        });
        
        // Меняем цвет линии в футере
        const footerLine = document.querySelector('.footer__line hr');
        if (footerLine) {
            footerLine.style.backgroundColor = newColor.outline;
        }
        
        // Меняем цвет текста для работ
        const workTypes = document.querySelectorAll('.work-card__type');
        workTypes.forEach(type => {
            type.style.color = newColor.secondary;
        });
        
        // Обновляем цвета стикеров (skill-tag)
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.style.backgroundColor = newColor.stickerBg;
            if (newColor.name === 'dark') {
                tag.style.color = newColor.text; // светлый текст для темной темы
            } else {
                tag.style.color = newColor.text; // темный текст для светлых тем
            }
            tag.style.borderColor = newColor.outline;
        });
    });
    
    // Анимация элемента при наведении на пункты меню
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const elementAnim = item.querySelector('.element-anim');
        
        item.addEventListener('mouseenter', function() {
            elementAnim.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
            elementAnim.classList.remove('active');
        });
    });
    
    // Дублирование элементов для бесконечной анимации
    const duplicateElementsForAnimation = () => {
        const innerAA = document.querySelector('.skills-track.aa .skills-track__inner');
        const innerBB = document.querySelector('.skills-track.bb .skills-track__inner');
        
        if (innerAA && innerBB) {
            // Клонируем всё содержимое внутреннего контейнера для бесшовной анимации
            const contentAA = innerAA.innerHTML;
            const contentBB = innerBB.innerHTML;
            
            // Добавляем дубликат содержимого для бесконечной прокрутки
            innerAA.innerHTML = contentAA + contentAA;
            innerBB.innerHTML = contentBB + contentBB;
        }
    };
    
    duplicateElementsForAnimation();
    
    // Обработка клика по карточкам работ
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        card.addEventListener('click', function() {
            // Здесь будет код для открытия детальной страницы работы
            // В текущей реализации просто добавим анимацию нажатия
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Управление видео-фоном при наведении
    const largeWorkCard = document.querySelector('.work-card.large');
    if (largeWorkCard) {
        const video = largeWorkCard.querySelector('.background-video');
        
        if (video) {
            // Загружаем первый кадр и делаем паузу
            video.load();
            video.pause();
            
            // При наведении запускаем видео
            largeWorkCard.addEventListener('mouseenter', function() {
                video.play();
            });
            
            // При уходе курсора ставим на паузу
            largeWorkCard.addEventListener('mouseleave', function() {
                video.pause();
            });
        }
    }

    // Анимация печатающегося текста
    const textElement = document.getElementById('typed-text');
    const cursorElement = document.querySelector('.cursor');
    const words = ['сайты', 'мобилки'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; // скорость печати в мс
    let blinkTimeout = null;
    
    function type() {
        // Курсор не должен мигать во время печати и стирания
        cursorElement.classList.add('no-blink');
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Стираем текст
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 48; // увеличил скорость стирания еще на 40%
        } else {
            // Печатаем текст
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 105; // увеличил скорость набора на 30%
        }
        
        // Если слово полностью напечатано
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = false;
            
            // Очищаем предыдущий таймаут, если он существует
            if (blinkTimeout) {
                clearTimeout(blinkTimeout);
            }
            
            // Через 0.5 секунды включаем мигание курсора
            blinkTimeout = setTimeout(() => {
                cursorElement.classList.remove('no-blink');
                
                // Через 3 секунды начинаем стирать и выключаем мигание
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, 3000);
            }, 500);
            
            return; // Выходим из функции, чтобы не запускать следующий вызов type()
        }
        
        // Если слово полностью стерто
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // переключаемся на следующее слово
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Запускаем анимацию
    type();
}); 