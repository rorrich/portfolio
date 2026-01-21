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
        element.classList.add('fade-in-ready');
        fadeInObserver.observe(element);
    });
    
    // Смена цветовой схемы при клике на кнопку "какой ты сегодня"
    const colorChanger = document.querySelector('.header__color-changer');
    const themes = ['light', 'dark', 'blue', 'green', 'soft'];
    let currentThemeIndex = 0;
    
    // Определяем начальную тему из data-theme или используем 'light'
    const initialTheme = document.body.getAttribute('data-theme') || 'light';
    currentThemeIndex = themes.indexOf(initialTheme) >= 0 ? themes.indexOf(initialTheme) : 0;
    
    colorChanger.addEventListener('click', function() {
        // Отключаем анимации на время смены темы
        document.body.classList.add('no-transition');

        // Переключаем на следующую тему
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        
        // Устанавливаем тему через data-theme атрибут
        // CSS переменные автоматически применятся через селекторы body[data-theme="..."]
        if (newTheme === 'light') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', newTheme);
        }

        // Включаем анимации обратно после небольшой задержки
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.remove('no-transition');
            });
        });
    });
    
    // Анимация элемента при наведении на пункты меню
    const menuItems = document.querySelectorAll('.menu-item');
    
    // При загрузке страницы проверяем, находится ли курсор над элементами
    // и синхронизируем состояние без анимации
    menuItems.forEach(item => {
        const elementAnim = item.querySelector('.element-anim');
        
        // Проверяем hover состояние при загрузке
        if (item.matches(':hover')) {
            // Временно отключаем transition для синхронизации состояния без анимации
            elementAnim.classList.add('no-transition-temp', 'active');
            
            // Включаем transition обратно после небольшой задержки
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    elementAnim.classList.remove('no-transition-temp');
                });
            });
        }
    });
    
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
            // Клонируем все дочерние элементы для бесшовной анимации
            const childrenAA = Array.from(innerAA.children);
            const childrenBB = Array.from(innerBB.children);
            
            // Клонируем каждый дочерний элемент и добавляем его
            childrenAA.forEach(child => {
                const clone = child.cloneNode(true);
                innerAA.appendChild(clone);
            });
            
            childrenBB.forEach(child => {
                const clone = child.cloneNode(true);
                innerBB.appendChild(clone);
            });
        }
    };
    
    duplicateElementsForAnimation();
    
    // Обработка клика по карточкам работ
    const workCards = document.querySelectorAll('.work-card');
    
    workCards.forEach(card => {
        card.addEventListener('click', function() {
            // Здесь будет код для открытия детальной страницы работы
            // В текущей реализации просто добавим анимацию нажатия через класс
            card.classList.add('is-pressed');
            setTimeout(() => {
                card.classList.remove('is-pressed');
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
    
    if (textElement && cursorElement) {
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
    }

    // Мобильное меню
    const burger = document.querySelector('.header__burger');
    const menuOverlay = document.querySelector('.menu-overlay');
    
    if (burger && menuOverlay) {
        // Инициализируем доступность
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-controls', menuOverlay.id || 'menu-overlay');

        burger.addEventListener('click', function(e) {
            e.stopPropagation(); // Предотвращаем любые конфликты с кликами
            
            // Используем toggle для классов
            const isActive = this.classList.toggle('active');
            menuOverlay.classList.toggle('active');

            // Синхронизируем aria-expanded
            this.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            
            // Блокируем/разблокируем скролл страницы через класс
            if (isActive) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });
        
        // Закрытие меню при клике на ссылку
        const menuLinks = document.querySelectorAll('.menu-overlay__link, .menu-overlay__contact');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    } else {
        console.error('Mobile menu elements not found in DOM');
    }

    // Логика фильтрации на странице Works
    const worksTabs = document.querySelectorAll('.works-tab');
    const checkboxWrapper = document.querySelector('.works-tabs__checkbox');
    const customCheckbox = document.querySelector('.custom-checkbox');
    const worksItems = document.querySelectorAll('.works-item');

    function filterWorks() {
        // Находим активную категорию
        const activeTab = document.querySelector('.works-tab.active');
        const filterCategory = activeTab ? activeTab.getAttribute('data-filter') : 'all';
        
        // Проверяем состояние чекбокса
        const isPaidOnly = customCheckbox && customCheckbox.classList.contains('checked');

        worksItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const itemPaid = item.getAttribute('data-paid') === 'true';

            let isVisible = true;

            // Фильтр по категории
            if (filterCategory !== 'all' && itemCategory !== filterCategory) {
                isVisible = false;
            }

            // Фильтр по чекбоксу (если включен, показываем только paid=true)
            if (isPaidOnly && !itemPaid) {
                isVisible = false;
            }

            // Применяем видимость через классы
            if (isVisible) {
                item.classList.remove('is-hidden');
                item.classList.add('is-visible');
            } else {
                item.classList.remove('is-visible');
                item.classList.add('is-hidden');
            }
            
            // Убираем класс последнего элемента у всех (сброс)
            item.classList.remove('last-visible');
        });
        
        // Находим последний видимый элемент и убираем у него бордер
        const visibleItems = Array.from(worksItems).filter(item => item.classList.contains('is-visible'));
        if (visibleItems.length > 0) {
            visibleItems[visibleItems.length - 1].classList.add('last-visible');
        }
    }

    // Инициализируем начальное состояние элементов фильтрации
    if (worksItems.length > 0) {
        worksItems.forEach(item => {
            // По умолчанию все элементы видимы
            item.classList.add('is-visible');
            item.classList.remove('is-hidden');
        });
    }
    
    // Запускаем фильтрацию при загрузке, чтобы убрать бордер у последнего элемента
    filterWorks();

    if (worksTabs.length > 0) {
        worksTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Убираем active у всех
                worksTabs.forEach(t => t.classList.remove('active'));
                // Добавляем active текущему
                this.classList.add('active');
                // Запускаем фильтрацию
                filterWorks();
            });
        });
    }

    if (checkboxWrapper && customCheckbox) {
        checkboxWrapper.addEventListener('click', function() {
            customCheckbox.classList.toggle('checked');
            // Запускаем фильтрацию
            filterWorks();
        });
    }

    // --- Sticky Header + First Screen Height Logic ---
    function updateHeaderHeight() {
        const header = document.querySelector('.header');
        if (header) {
            const height = header.offsetHeight;
            // Set CSS variable on root for global access
            document.documentElement.style.setProperty('--header-height', `${height}px`);
        }
    }

    // Update on load
    updateHeaderHeight();

    // Update on resize
    window.addEventListener('resize', updateHeaderHeight);
});