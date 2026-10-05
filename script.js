document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-btn');
  const jumpButtons = document.querySelectorAll('.dimension-jump-btn[data-jump]');
  const pages = document.querySelectorAll('.dimension-page');
  const badge = document.getElementById('currentDimensionBadge');
  const blobs = [
    document.getElementById('morphBlob1'),
    document.getElementById('morphBlob2'),
    document.getElementById('morphBlob3')
  ];

  // Random Blob Morphing Coordinator per Page Transition
  function mutateMorphBlobs() {
    blobs.forEach(blob => {
      if (!blob) return;
      const randomX = Math.floor(Math.random() * 60) - 30;
      const randomY = Math.floor(Math.random() * 60) - 30;
      const randomScale = (Math.random() * 0.4 + 0.8).toFixed(2);
      blob.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale})`;
    });
  }

  // Smooth Dimension Morphing Switcher
  function transitionToDimension(targetPageId) {
    mutateMorphBlobs();

    // 1. Fade out current active page
    pages.forEach(page => {
      if (page.classList.contains('active')) {
        page.style.opacity = '0';
        page.style.filter = 'blur(20px)';
        page.style.transform = 'scale(0.85) rotate(-2deg)';
        
        setTimeout(() => {
          page.classList.remove('active');
        }, 350);
      }
    });

    // 2. Bring in target slide after morph delay
    setTimeout(() => {
      const targetPage = document.getElementById(targetPageId);
      if (targetPage) {
        targetPage.classList.add('active');
        
        // Trigger CSS reflow for fluid animation
        void targetPage.offsetWidth;

        targetPage.style.opacity = '1';
        targetPage.style.filter = 'blur(0px)';
        targetPage.style.transform = 'scale(1) rotate(0deg)';
      }

      // Update Nav Button Highlights
      navButtons.forEach(btn => {
        if (btn.getAttribute('data-page') === targetPageId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      // Update Top Badge
      if (badge) {
        badge.textContent = `DIM: ${targetPageId.toUpperCase()}`;
      }

      window.scrollTo(0, 0);
    }, 380);
  }

  // Nav Links Click Handlers
  navButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = button.getAttribute('data-page');
      transitionToDimension(targetPage);
    });
  });

  // Jump Buttons Click Handlers
  jumpButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPage = button.getAttribute('data-jump');
      transitionToDimension(targetPage);
    });
  });

  // Interactive 3D Card Tilt Effect
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // Expandable Project Details Toggle
  const expandBtns = document.querySelectorAll('.expand-project-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      if (details) {
        details.classList.toggle('open');
        btn.innerHTML = details.classList.contains('open') 
          ? '<i class="fas fa-chevron-up"></i> Hide Details' 
          : '<i class="fas fa-chevron-down"></i> Details';
      }
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message transmitted successfully across dimensions!');
      contactForm.reset();
    });
  }
});