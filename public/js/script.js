// Flavor Archive Client-Side Functionality

document.addEventListener('DOMContentLoaded', () => {
    console.log('Flavor Archive loaded');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current navigation link
    const currentPage = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Form validation for recipe form
    const recipeForm = document.querySelector('.recipe-form');
    if (recipeForm) {
        recipeForm.addEventListener('submit', (e) => {
            const nameInput = recipeForm.querySelector('#name');
            const descriptionInput = recipeForm.querySelector('#description');
            
            if (!nameInput.value.trim()) {
                e.preventDefault();
                alert('Please enter a recipe name');
                nameInput.focus();
            } else if (!descriptionInput.value.trim()) {
                e.preventDefault();
                alert('Please enter a recipe description');
                descriptionInput.focus();
            }
        });
    }

    // Search form handling
    const searchForms = document.querySelectorAll('.search-form');
    searchForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const input = form.querySelector('.search-input');
            if (!input.value.trim()) {
                e.preventDefault();
                alert('Please enter a search term');
            }
        });
    });

    // Add hover effects to recipe cards
    const recipeCards = document.querySelectorAll('.recipe-card');
    recipeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Lazy loading for images (if supported)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Utility function to format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Utility function to truncate text
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}