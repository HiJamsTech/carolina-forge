// Carolina Forge Website JavaScript

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Registration form handling
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);

    // Form validation
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
});

// Handle registration form submission
function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'company', 'role', 'serviceArea'];
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');
    
    if (missingFields.length > 0) {
        showFormError('Please fill in all required fields.');
        highlightMissingFields(missingFields);
        return;
    }
    
    // Validate email format
    if (!isValidEmail(data.email)) {
        showFormError('Please enter a valid email address.');
        highlightField('email', true);
        return;
    }
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Registering...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // In a real implementation, you would send this data to your backend
        console.log('Registration data:', data);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        e.target.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track conversion (analytics)
        trackRegistration(data);
        
    }, 1500);
}

// Show success message
function showSuccessMessage() {
    const form = document.getElementById('registrationForm');
    const successDiv = document.getElementById('form-success');
    
    if (form && successDiv) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        
        // Scroll to success message
        successDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Show form error
function showFormError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.style.cssText = `
        background-color: #FEF2F2;
        border: 1px solid #FECACA;
        color: #DC2626;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-size: 0.875rem;
    `;
    errorDiv.textContent = message;
    
    // Insert error message at the top of the form
    const form = document.getElementById('registrationForm');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// Highlight missing fields
function highlightMissingFields(fields) {
    // Clear previous highlights
    document.querySelectorAll('.field-error').forEach(field => {
        field.classList.remove('field-error');
    });
    
    // Highlight missing fields
    fields.forEach(fieldName => {
        highlightField(fieldName, true);
    });
}

// Highlight individual field
function highlightField(fieldName, isError) {
    const field = document.getElementById(fieldName);
    if (field) {
        if (isError) {
            field.classList.add('field-error');
            field.style.borderColor = '#DC2626';
            field.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
        } else {
            field.classList.remove('field-error');
            field.style.borderColor = '#D1D5DB';
            field.style.boxShadow = 'none';
        }
    }
}

// Clear field error on input
function clearFieldError(e) {
    const field = e.target;
    if (field.classList.contains('field-error')) {
        highlightField(field.id, false);
    }
    
    // Remove form error message if exists
    const formError = document.querySelector('.form-error');
    if (formError && field.value.trim() !== '') {
        formError.remove();
    }
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Check if required field is empty
    if (field.hasAttribute('required') && value === '') {
        highlightField(field.id, true);
        return false;
    }
    
    // Validate email format
    if (field.type === 'email' && value !== '' && !isValidEmail(value)) {
        highlightField(field.id, true);
        return false;
    }
    
    // Field is valid
    highlightField(field.id, false);
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    }
}

// Track registration for analytics
function trackRegistration(data) {
    // Google Analytics tracking (if implemented)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'registration', {
            'event_category': 'engagement',
            'event_label': 'carolina_forge_launch',
            'custom_parameters': {
                'company': data.company,
                'industry_served': data.industryServed,
                'how_heard': data.howHeard
            }
        });
    }
    
    // Facebook Pixel tracking (if implemented)
    if (typeof fbq !== 'undefined') {
        fbq('track', 'CompleteRegistration', {
            content_name: 'Carolina Forge Launch Event',
            content_category: 'Event Registration'
        });
    }
    
    // Console log for debugging
    console.log('Registration tracked:', data);
}

// Intersection Observer for animations (optional enhancement)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.problem-item, .shield-quadrant, .testimonial, .attendee-category');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure styles are loaded
    setTimeout(initScrollAnimations, 100);
});

// Mobile menu toggle (if needed for responsive design)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('mobile-open');
    }
}

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            flex-direction: column;
            padding: 1rem;
        }
        
        .nav-menu.mobile-open {
            display: flex;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none;
        }
    }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Form auto-save (localStorage backup)
function autoSaveForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Save to localStorage
    localStorage.setItem('carolina_forge_registration_backup', JSON.stringify(data));
}

// Restore form from localStorage
function restoreFormData() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    const savedData = localStorage.getItem('carolina_forge_registration_backup');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        } catch (e) {
            console.log('Could not restore form data:', e);
        }
    }
}

// Clear saved form data after successful submission
function clearSavedFormData() {
    localStorage.removeItem('carolina_forge_registration_backup');
}

// Initialize form auto-save
document.addEventListener('DOMContentLoaded', function() {
    restoreFormData();
    
    const form = document.getElementById('registrationForm');
    if (form) {
        // Auto-save every 30 seconds
        setInterval(autoSaveForm, 30000);
        
        // Auto-save on input change
        form.addEventListener('input', debounce(autoSaveForm, 2000));
    }
});

// Debounce utility function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}