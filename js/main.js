/**
 * 主交互模块 - 处理导航栏和滚动动画
 */

(function() {
    'use strict';

    // 导航栏滚动效果
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 导航链接平滑滚动
    function initSmoothScroll() {
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const target = document.querySelector(targetId);
                if (target) {
                    const headerOffset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // 滚动显示动画 - 使用 Intersection Observer
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // 选择需要动画的元素
        const animatedElements = document.querySelectorAll(
            '.edu-item, .research-card, .project-card, .pub-list li, .award-item, .patent-item, .book-item'
        );

        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // 初始化所有功能
    function init() {
        initNavbar();
        initSmoothScroll();
        initScrollReveal();
    }

    // 页面加载完成后启动
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
