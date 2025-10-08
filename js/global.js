// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.carousel-slide');
  let currentSlide = 0;

  function showNextSlide() {
    if (slides.length > 0) {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }
  }

  if (slides.length > 0) {
    setInterval(showNextSlide, 5000);
  }
});

// Services functionality
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.service-card');
  let maxVisible;

  if (window.innerWidth < 992) {
    maxVisible = 4;
  } else {
    maxVisible = 12;
  }

  const btn = document.createElement('button');
  btn.textContent = 'View More';
  btn.className = 'view-more-btn';

  if (cards.length > maxVisible) {
    cards.forEach((card, index) => {
      if (index >= maxVisible) card.style.display = 'none';
    });

    const container = document.querySelector('.services-grid');
    if (container) {
      const wrapper = document.createElement('div');
      wrapper.className = 'view-more-wrapper';
      wrapper.appendChild(btn);
      container.insertAdjacentElement('afterend', wrapper);

      btn.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          window.location.href = 'services.html';
        } else {
          cards.forEach(card => card.style.display = 'block');
          btn.remove();
        }
      });
    }
  }
});

// Partners functionality
function scrollPartners(direction) {
  const grid = document.getElementById('partnersGrid');
  if (grid) {
    const cardWidth = grid.querySelector('.partner-card').offsetWidth + 20;
    grid.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }
}

// Solutions tooltip functionality
document.addEventListener('DOMContentLoaded', function() {
  const solutionsLink = document.getElementById('solutionsLink');
  const solutionsTooltip = document.getElementById('solutionsTooltip');

  if (solutionsLink && solutionsTooltip) {
    // Check if device is mobile
    function isMobile() {
      return window.innerWidth <= 992;
    }

    solutionsLink.addEventListener('click', function(e) {
      e.preventDefault();

      if (isMobile()) {
        // On mobile, toggle sub-list instead of tooltip
        solutionsTooltip.classList.toggle('mobile-submenu');
      } else {
        // On desktop, show tooltip
        solutionsTooltip.classList.toggle('show');
      }
    });

    // Desktop behavior
    if (!isMobile()) {
      document.addEventListener('click', function(e) {
        if (!solutionsLink.contains(e.target) && !solutionsTooltip.contains(e.target)) {
          solutionsTooltip.classList.remove('show');
        }
      });

      solutionsLink.addEventListener('mouseenter', function() {
        solutionsTooltip.classList.add('show');
      });

      solutionsLink.addEventListener('mouseleave', function() {
        setTimeout(function() {
          if (!solutionsTooltip.matches(':hover')) {
            solutionsTooltip.classList.remove('show');
          }
        }, 100);
      });

      solutionsTooltip.addEventListener('mouseleave', function() {
        solutionsTooltip.classList.remove('show');
      });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
      if (isMobile()) {
        solutionsTooltip.classList.remove('show');
      } else {
        solutionsTooltip.classList.remove('mobile-submenu');
      }
    });
  }
});
