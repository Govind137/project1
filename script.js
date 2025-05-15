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

    // Add slider functionality
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const conditionsGrid = document.querySelector('.conditions-grid');

    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.condition-card').length;

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            currentSlide = Math.max(currentSlide - 1, 0);
            updateSlider();
        });

        nextButton.addEventListener('click', () => {
            currentSlide = Math.min(currentSlide + 1, totalSlides - 3);
            updateSlider();
        });
    }

    function updateSlider() {
        const offset = currentSlide * -100;
        conditionsGrid.style.transform = `translateX(${offset}%)`;
    }

    document.addEventListener('DOMContentLoaded', function() {
        const options = document.querySelectorAll('.option');
        const progress = document.querySelector('.progress');

        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                progress.style.width = this.classList.contains('yes') ? '75%' : '50%';
            });
        });
    });
});
// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    // Mobile optimization
    document.addEventListener('DOMContentLoaded', function() {
        // Handle testimonial slider for mobile
        const testimonialContainer = document.querySelector('.testimonials-container');
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const prevButton = document.querySelector('.testimonials .nav-button.prev');
        const nextButton = document.querySelector('.testimonials .nav-button.next');
        
        let currentIndex = 0;
        const cardWidth = testimonialCards[0].offsetWidth;
        
        // Update card width on resize
        window.addEventListener('resize', function() {
            const newCardWidth = testimonialCards[0].offsetWidth;
            testimonialContainer.scrollLeft = currentIndex * newCardWidth;
        });
        
        // Navigation buttons
        nextButton.addEventListener('click', function() {
            if (currentIndex < testimonialCards.length - 1) {
                currentIndex++;
                testimonialContainer.scrollLeft = currentIndex * testimonialCards[0].offsetWidth;
            }
        });
        
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                testimonialContainer.scrollLeft = currentIndex * testimonialCards[0].offsetWidth;
            }
        });
        
        // Touch swipe for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        testimonialContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        testimonialContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left
                if (currentIndex < testimonialCards.length - 1) {
                    currentIndex++;
                    testimonialContainer.scrollLeft = currentIndex * testimonialCards[0].offsetWidth;
                }
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right
                if (currentIndex > 0) {
                    currentIndex--;
                    testimonialContainer.scrollLeft = currentIndex * testimonialCards[0].offsetWidth;
                }
            }
        }
    });
    if (testimonialsContainer && prevButton && nextButton) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        // Set initial position
        updateSliderPosition();
        
        // Previous button click
        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });
        
        // Next button click
        nextButton.addEventListener('click', function() {
            if (currentIndex < testimonialCards.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });
        
        function updateSliderPosition() {
            const cardWidth = testimonialCards[0].offsetWidth;
            const scrollPosition = currentIndex * (cardWidth + 20); // 20px is the gap
            testimonialsContainer.scrollLeft = scrollPosition;
            
            // Update button states
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === testimonialCards.length - 1;
            
            // Visual feedback for disabled buttons
            prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextButton.style.opacity = currentIndex === testimonialCards.length - 1 ? '0.5' : '1';
        }
        
        // Handle window resize
        window.addEventListener('resize', updateSliderPosition);
    }
});
