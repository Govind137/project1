document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');
    const playButton = document.querySelector('.play-button');

    if (playButton && video) {
        playButton.addEventListener('click', () => {
            video.play();
            playButton.style.display = 'none';
        });

        video.addEventListener('pause', () => {
            playButton.style.display = 'block';
        });

        video.addEventListener('play', () => {
            playButton.style.display = 'none';
        });
    }

    const conditionsPrevButton = document.querySelector('.conditions-section .nav-button.prev');
    const conditionsNextButton = document.querySelector('.conditions-section .nav-button.next');
    const conditionsGrid = document.querySelector('.conditions-grid');

    if (conditionsGrid && conditionsPrevButton && conditionsNextButton) {
        let currentSlide = 0;
        const conditionCards = document.querySelectorAll('.condition-card');
        const totalSlides = conditionCards.length;
        const visibleSlides = window.innerWidth < 768 ? 1 : 3;

        function updateConditionsSlider() {
            const cardWidth = conditionCards[0].offsetWidth;
            const gap = parseInt(getComputedStyle(conditionsGrid).columnGap) || 20;
            const scrollAmount = currentSlide * (cardWidth + gap);
            conditionsGrid.style.transform = `translateX(-${scrollAmount}px)`;
            
            conditionsPrevButton.disabled = currentSlide === 0;
            conditionsNextButton.disabled = currentSlide >= totalSlides - visibleSlides;
            
            conditionsPrevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
            conditionsNextButton.style.opacity = currentSlide >= totalSlides - visibleSlides ? '0.5' : '1';
        }

        conditionsPrevButton.addEventListener('click', () => {
            currentSlide = Math.max(currentSlide - 1, 0);
            updateConditionsSlider();
        });

        conditionsNextButton.addEventListener('click', () => {
            currentSlide = Math.min(currentSlide + 1, totalSlides - visibleSlides);
            updateConditionsSlider();
        });

        window.addEventListener('resize', () => {
            const newVisibleSlides = window.innerWidth < 768 ? 1 : 3;
            if (newVisibleSlides !== visibleSlides) {
                visibleSlides = newVisibleSlides;
                currentSlide = Math.min(currentSlide, totalSlides - visibleSlides);
            }
            updateConditionsSlider();
        });

        updateConditionsSlider();
    }

    const options = document.querySelectorAll('.option');
    const progress = document.querySelector('.progress');

    if (options.length && progress) {
        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                progress.style.width = this.classList.contains('yes') ? '75%' : '50%';
            });
        });
    }

    const testimonialsContainer = document.querySelector('.testimonials-container');
    const testimonialPrevButton = document.querySelector('.testimonials .nav-button.prev');
    const testimonialNextButton = document.querySelector('.testimonials .nav-button.next');
    
    if (testimonialsContainer && testimonialPrevButton && testimonialNextButton) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        function updateTestimonialsSlider() {
            const cardWidth = testimonialCards[0].offsetWidth;
            const gap = parseInt(getComputedStyle(testimonialsContainer).columnGap) || 20;
            const scrollAmount = currentIndex * (cardWidth + gap);
            testimonialsContainer.scrollLeft = scrollAmount;
            
            testimonialPrevButton.disabled = currentIndex === 0;
            testimonialNextButton.disabled = currentIndex >= testimonialCards.length - 1;
            
            testimonialPrevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            testimonialNextButton.style.opacity = currentIndex >= testimonialCards.length - 1 ? '0.5' : '1';
        }
        
        testimonialPrevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateTestimonialsSlider();
            }
        });
        
        testimonialNextButton.addEventListener('click', function() {
            if (currentIndex < testimonialCards.length - 1) {
                currentIndex++;
                updateTestimonialsSlider();
            }
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialsContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialsContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                if (currentIndex < testimonialCards.length - 1) {
                    currentIndex++;
                    updateTestimonialsSlider();
                }
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateTestimonialsSlider();
                }
            }
        }
        
        window.addEventListener('resize', updateTestimonialsSlider);
        
        updateTestimonialsSlider();
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});
