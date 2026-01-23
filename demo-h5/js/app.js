// Basketball Court H5 Demo - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tabbar active state based on current page
    initTabbar();

    // Add smooth scroll behavior
    initSmoothScroll();

    // Add hover effects for cards
    initCardEffects();
});

// Tabbar active state
function initTabbar() {
    const currentPath = window.location.pathname;
    const tabbarItems = document.querySelectorAll('.tabbar-item');

    tabbarItems.forEach(item => {
        const href = item.getAttribute('href');
        if (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.course-card, .court-card, .class-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Utility: Format currency
function formatCurrency(amount) {
    return '¥' + amount.toLocaleString('zh-CN');
}

// Utility: Add click handler for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const text = this.textContent.trim();
        console.log('Button clicked:', text);

        // Add loading state
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            this.dataset.originalText = text;
            this.textContent = '加载中...';

            setTimeout(() => {
                this.classList.remove('loading');
                this.textContent = this.dataset.originalText;
            }, 1000);
        }
    });
});

// Toast notification (simulated)
function showToast(message, duration = 2000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
`;
document.head.appendChild(style);

console.log('Basketball Court H5 Demo loaded successfully!');
