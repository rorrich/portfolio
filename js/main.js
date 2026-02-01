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
    const themes = ['light', 'dark', 'blue', 'green', 'soft'];
    const THEME_STORAGE_KEY = 'portfolio-theme';
    
    // Функция для применения темы
    function applyTheme(theme) {
        if (theme === 'light') {
            document.body.removeAttribute('data-theme');
        } else {
            document.body.setAttribute('data-theme', theme);
        }
    }
    
    // Функция для сохранения темы в localStorage
    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (e) {
            console.warn('Не удалось сохранить тему в localStorage:', e);
        }
    }
    
    // Функция для проверки, является ли страница страницей работы
    function isWorkPage() {
        const bodyClass = document.body.className;
        // Проверяем классы body, которые указывают на страницы работ
        const workPageClasses = ['roast-page', 'dr-coffee-page', 'cleanner-page'];
        return workPageClasses.some(className => bodyClass.includes(className));
    }
    
    // Функция для загрузки темы из localStorage
    function loadTheme() {
        // На страницах работ всегда используем дефолтную тему
        if (isWorkPage()) {
            return 'light';
        }
        
        try {
            const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
            if (savedTheme && themes.includes(savedTheme)) {
                return savedTheme;
            }
        } catch (e) {
            console.warn('Не удалось загрузить тему из localStorage:', e);
        }
        return 'light'; // Дефолтная тема
    }
    
    // Применяем сохраненную тему сразу при загрузке страницы
    const savedTheme = loadTheme();
    applyTheme(savedTheme);
    
    // Обработчик кнопки переключения темы (если она есть на странице)
    const colorChanger = document.querySelector('.header__color-changer');
    
    if (colorChanger) {
        // На страницах работ кнопка переключения темы не работает
        if (!isWorkPage()) {
            // Определяем текущий индекс темы на основе сохраненной темы
            let currentThemeIndex = themes.indexOf(savedTheme);
            if (currentThemeIndex < 0) {
                currentThemeIndex = 0;
            }
            
            colorChanger.addEventListener('click', function() {
                // Отключаем анимации на время смены темы
                document.body.classList.add('no-transition');

                // Переключаем на следующую тему
                currentThemeIndex = (currentThemeIndex + 1) % themes.length;
                const newTheme = themes[currentThemeIndex];
                
                // Применяем и сохраняем новую тему
                applyTheme(newTheme);
                saveTheme(newTheme);

                // Включаем анимации обратно после небольшой задержки
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        document.body.classList.remove('no-transition');
                    });
                });
            });
        }
    }
    
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

    // --- Заполнение данных проектов из единого источника ---
    function fillProjectData() {
        // Проверяем, что данные проектов загружены
        if (typeof projectsData === 'undefined') {
            console.warn('projectsData не загружен. Убедитесь, что data.js подключен перед main.js');
            return;
        }

        // Находим все элементы с data-id (контейнеры проектов)
        const projectContainers = document.querySelectorAll('[data-id]');
        
        projectContainers.forEach(container => {
            const projectId = container.getAttribute('data-id');
            const projectData = projectsData[projectId];
            
            if (!projectData) {
                console.warn(`Данные для проекта "${projectId}" не найдены в projectsData`);
                return;
            }
            
            // Находим все элементы с data-field внутри контейнера
            const fieldElements = container.querySelectorAll('[data-field]');
            
            fieldElements.forEach(element => {
                const fieldName = element.getAttribute('data-field');
                
                // Специальная обработка для websiteLabel
                if (fieldName === 'websiteLabel') {
                    const websiteUrl = projectData.websiteUrl;
                    const websiteLabel = projectData.websiteLabel;
                    
                    if (websiteLabel !== undefined) {
                        // Если websiteUrl задан — создаем/обновляем ссылку со стрелкой (как у menu-item)
                        if (websiteUrl && websiteUrl !== null) {
                            const setLinkContent = (linkEl) => {
                                linkEl.href = websiteUrl;
                                linkEl.target = '_blank';
                                linkEl.rel = 'noopener noreferrer';
                                linkEl.textContent = '';
                                const anim = document.createElement('div');
                                anim.className = 'element-anim';
                                const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                                svg.setAttribute('width', '12');
                                svg.setAttribute('height', '9');
                                svg.setAttribute('viewBox', '0 0 13 10');
                                svg.setAttribute('fill', 'none');
                                svg.setAttribute('aria-hidden', 'true');
                                svg.setAttribute('focusable', 'false');
                                const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
                                use.setAttribute('href', 'images/sprite.svg#icon-arrow-right');
                                svg.appendChild(use);
                                anim.appendChild(svg);
                                const span = document.createElement('span');
                                span.textContent = websiteLabel;
                                linkEl.appendChild(anim);
                                linkEl.appendChild(span);
                            };
                            if (element.tagName === 'A') {
                                setLinkContent(element);
                            } else {
                                const link = document.createElement('a');
                                link.className = element.className;
                                setLinkContent(link);
                                element.parentNode.replaceChild(link, element);
                            }
                        } else {
                            // Если websiteUrl пустой/null — создаем/обновляем span
                            if (element.tagName === 'A') {
                                // Если элемент ссылка, заменяем на span
                                const span = document.createElement('span');
                                span.textContent = websiteLabel;
                                span.className = element.className;
                                element.parentNode.replaceChild(span, element);
                            } else {
                                // Если элемент уже span/div, просто обновляем текст
                                element.textContent = websiteLabel;
                            }
                        }
                    }
                    return; // Пропускаем обычную обработку для websiteLabel
                }
                
                // Обычная обработка для остальных полей
                const fieldValue = projectData[fieldName];
                
                if (fieldValue !== undefined) {
                    // Заполняем элемент данными
                    // Если это input или textarea, используем value, иначе textContent
                    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                        element.value = fieldValue;
                    } else {
                        element.textContent = fieldValue;
                    }
                } else {
                    console.warn(`Поле "${fieldName}" не найдено в данных проекта "${projectId}"`);
                }
            });
        });
    }

    // Заполняем данные проектов при загрузке страницы
    fillProjectData();
});