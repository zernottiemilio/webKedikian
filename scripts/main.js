// Funcionalidad principal del sitio web
document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación móvil
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');
    
    // Toggle del menú hamburguesa - CORREGIDO
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animación del hamburger
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                
                // Prevenir scroll del body cuando el menú está abierto
                document.body.style.overflow = 'hidden';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
                
                // Restaurar scroll del body
                document.body.style.overflow = '';
            }
        });
    }
    
    // Cerrar menú móvil al hacer click en un enlace - MEJORADO
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo cerrar si es móvil Y no es un dropdown trigger
            if (window.innerWidth <= 768 && !link.classList.contains('dropdown-trigger')) {
                closeMenuMobile();
            }
        });
    });
    
    // Función para cerrar menú móvil
    function closeMenuMobile() {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Restaurar scroll
            document.body.style.overflow = '';
            
            // Cerrar todos los dropdowns abiertos
            document.querySelectorAll('.dropdown.open, .dropdown-login.open').forEach(el => {
                el.classList.remove('open');
            });
        }
    }
    
    // Header scroll effect
    let lastScrollTop = 0;
    
    if (header) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.style.background = 'rgba(44, 44, 44, 0.98)';
                header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.2)';
            } else {
                header.style.background = 'rgba(44, 44, 44, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            }
            
            // Hide/show header on scroll (solo en desktop)
            if (window.innerWidth > 768) {
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // SISTEMA DE DROPDOWNS COMPLETAMENTE REESCRITO
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const loginDropdown = document.querySelector('.dropdown-login');
    const loginDropdownMenu = document.querySelector('.login-dropdown-menu');
    let dropdownTimeout;

    function isMobileView() {
        return window.innerWidth <= 768;
    }

    // Desktop: comportamiento por hover
    function setupDesktopHover() {
        if (!isMobileView()) {
            // Servicios dropdown
            if (dropdown && dropdownMenu) {
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(dropdownTimeout);
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateX(-50%) translateY(0)';
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdownTimeout = setTimeout(() => {
                        dropdownMenu.style.opacity = '0';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.transform = 'translateX(-50%) translateY(-15px)';
                    }, 200);
                });
            }
            
            // Login dropdown
            if (loginDropdown && loginDropdownMenu) {
                loginDropdown.addEventListener('mouseenter', function() {
                    clearTimeout(dropdownTimeout);
                    loginDropdownMenu.style.opacity = '1';
                    loginDropdownMenu.style.visibility = 'visible';
                    loginDropdownMenu.style.transform = 'translateX(-50%) translateY(0)';
                });
                
                loginDropdown.addEventListener('mouseleave', function() {
                    dropdownTimeout = setTimeout(() => {
                        loginDropdownMenu.style.opacity = '0';
                        loginDropdownMenu.style.visibility = 'hidden';
                        loginDropdownMenu.style.transform = 'translateX(-50%) translateY(-15px)';
                    }, 200);
                });
            }
        }
    }

    // Mobile: comportamiento por clic
    function setupMobileClick() {
        if (isMobileView()) {
            // Servicios dropdown móvil
            if (dropdown) {
                const trigger = dropdown.querySelector('.dropdown-trigger');
                if (trigger) {
                    trigger.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const isOpen = dropdown.classList.contains('open');
                        
                        // Cerrar todos los dropdowns primero
                        document.querySelectorAll('.dropdown.open, .dropdown-login.open').forEach(el => {
                            el.classList.remove('open');
                        });
                        
                        // Si no estaba abierto, abrirlo
                        if (!isOpen) {
                            dropdown.classList.add('open');
                        }
                    });
                }
            }
            
            // Login dropdown móvil
            if (loginDropdown) {
                const trigger = loginDropdown.querySelector('.dropdown-trigger');
                if (trigger) {
                    trigger.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        
                        const isOpen = loginDropdown.classList.contains('open');
                        
                        // Cerrar todos los dropdowns primero
                        document.querySelectorAll('.dropdown.open, .dropdown-login.open').forEach(el => {
                            el.classList.remove('open');
                        });
                        
                        // Si no estaba abierto, abrirlo
                        if (!isOpen) {
                            loginDropdown.classList.add('open');
                        }
                    });
                }
            }
        }
    }

    function setupDropdownBehavior() {
        // Limpiar eventos previos removiendo y volviendo a clonar elementos
        // Solo reseteamos estilos
        if (dropdownMenu) {
            dropdownMenu.style.opacity = '';
            dropdownMenu.style.visibility = '';
            dropdownMenu.style.transform = '';
        }
        
        if (loginDropdownMenu) {
            loginDropdownMenu.style.opacity = '';
            loginDropdownMenu.style.visibility = '';
            loginDropdownMenu.style.transform = '';
        }

        // Remover clases abiertas al cambiar de modo
        document.querySelectorAll('.dropdown.open, .dropdown-login.open').forEach(el => {
            el.classList.remove('open');
        });

        // Configurar según el modo
        if (isMobileView()) {
            setupMobileClick();
        } else {
            setupDesktopHover();
        }
    }

    // Inicializar sistema de dropdowns
    setupDropdownBehavior();
    
    // Reconfigurar en resize con debounce
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            setupDropdownBehavior();
        }, 100);
    });
    
    // Cerrar dropdowns al hacer clic fuera - MEJORADO
    document.addEventListener('click', function(e) {
        const clickedInsideDropdown = e.target.closest('.dropdown, .dropdown-login');
        const clickedHamburger = e.target.closest('.hamburger');
        
        if (!clickedInsideDropdown && !clickedHamburger) {
            if (isMobileView()) {
                // Mobile: remover clases open
                document.querySelectorAll('.dropdown.open, .dropdown-login.open').forEach(el => {
                    el.classList.remove('open');
                });
            } else {
                // Desktop: ocultar por estilos inline
                if (dropdownMenu) {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateX(-50%) translateY(-15px)';
                }
                if (loginDropdownMenu) {
                    loginDropdownMenu.style.opacity = '0';
                    loginDropdownMenu.style.visibility = 'hidden';
                    loginDropdownMenu.style.transform = 'translateX(-50%) translateY(-15px)';
                }
            }
        }
        
        // Cerrar menú móvil si se hace clic fuera
        if (!clickedHamburger && !e.target.closest('.nav-menu') && navMenu && navMenu.classList.contains('active')) {
            closeMenuMobile();
        }
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('active')) {
                closeMenuMobile();
            }
            
            // Cerrar dropdowns
            document.querySelectorAll('.dropdown.open, .dropdown-login.open').forEach(el => {
                el.classList.remove('open');
            });
        }
    });
    
    // Smooth scrolling para enlaces internos
    // Smooth scrolling para enlaces internos
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Ignorar si es solo "#"
        if (!targetId || targetId === '#') {
            return;
        }

        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            if (isMobileView()) {
                closeMenuMobile();
            }
        }
    });
});

    
    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-item, .actividad-text, .actividad-image');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // Contador animado para estadísticas (si las hay)
    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const startValue = parseInt(start);
        const endValue = parseInt(end);
        const difference = endValue - startValue;
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (difference * easeOutQuart));
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Iniciar contadores cuando sean visibles
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const endValue = counter.getAttribute('data-counter');
                animateCounter(counter, 0, endValue, 2000);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Parallax effect para el hero
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                heroBackground.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Botones con efecto ripple
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');
        
        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Agregar efecto ripple a botones
    const buttons = document.querySelectorAll('.cta-button, .learn-more-btn, .view-all-services');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });
    
    // CSS para el efecto ripple
    if (!document.getElementById('ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Funcionalidad de búsqueda (si se implementa)
    const searchToggle = document.querySelector('.search-toggle');
    const searchBox = document.querySelector('.search-box');
    
    if (searchToggle && searchBox) {
        searchToggle.addEventListener('click', function() {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchBox.querySelector('input').focus();
            }
        });
    }
    
    // Preloader (opcional)
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }
    
    // Funcionalidad de tema oscuro (opcional)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
        });
        
        // Cargar tema guardado
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
    
    // Actualizar año en el footer
    const currentYear = document.querySelector('.current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    console.log('🚧 Sitio web de movimientos de tierra cargado correctamente');
});

// Utilidades globales
window.siteUtils = {
    // Función para mostrar notificaciones
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        });
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    },
    
    // Función para validar formularios
    validateForm: function(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    },
    
    // Función para formatear números
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
};