// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeHeader();
  initializeProductGallery();
  initializeRadioButtons();
  initializeFAQ();
  initializeTestimonials();
  initializeStatistics();
  initializeMobileMenu();
  initializeSearchBox();
});

// Header Functionality
function initializeHeader() {
  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuClose = document.querySelector(".mobile-menu-close");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      mobileMenu.classList.add("active");
    });
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener("click", function () {
      mobileMenu.classList.remove("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      mobileMenu &&
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove("active");
    }
  });
}

// Search Box Functionality
function initializeSearchBox() {
  const searchIcon = document.querySelector(".search-icon");
  const searchBox = document.querySelector(".search-box");
  const searchInput = document.querySelector(".search-input");

  if (searchIcon && searchBox) {
    searchIcon.addEventListener("click", function () {
      searchBox.classList.toggle("active");
      if (searchBox.classList.contains("active") && searchInput) {
        searchInput.focus();
      }
    });

    // Close search box when clicking outside
    document.addEventListener("click", function (e) {
      if (
        searchBox.classList.contains("active") &&
        !searchBox.contains(e.target) &&
        !searchIcon.contains(e.target)
      ) {
        searchBox.classList.remove("active");
      }
    });

    // Close search box on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchBox.classList.contains("active")) {
        searchBox.classList.remove("active");
      }
    });
  }
}

// Product Gallery Functionality
function initializeProductGallery() {
  const galleryImages = [
    "../assets/images/img_group_1000004121.png",
    "../assets/images/img_image_fx_14_photoroom.png",
    "../assets/images/img_image_fx_16_photoroom.png",
    "../assets/images/img_pexels_pixabay_264870.png",
    "../assets/images/img_pexels_pixabay_264950.png",
  ];

  const mainImage = document.querySelector(".main-product-image");
  const prevBtn = document.querySelector(".gallery-prev");
  const nextBtn = document.querySelector(".gallery-next");
  const dots = document.querySelectorAll(".gallery-dot");
  const thumbnails = document.querySelectorAll(".gallery-thumbnail");

  let currentIndex = 0;

  function updateImage(index) {
    if (mainImage && galleryImages[index]) {
      mainImage.src = galleryImages[index];
      mainImage.alt = `GTG Perfume ${index + 1}`;
    }

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });

    // Update thumbnails
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });

    currentIndex = index;
  }

  // Navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      const newIndex =
        currentIndex > 0 ? currentIndex - 1 : galleryImages.length - 1;
      updateImage(newIndex);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      const newIndex =
        currentIndex < galleryImages.length - 1 ? currentIndex + 1 : 0;
      updateImage(newIndex);
    });
  }

  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      updateImage(index);
    });
  });

  // Thumbnail navigation
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      updateImage(index);
    });
  });

  // Auto-play gallery
  setInterval(function () {
    if (nextBtn) {
      nextBtn.click();
    }
  }, 5000);
}

// Radio Button Functionality
function initializeRadioButtons() {
  const fragranceRadios = document.querySelectorAll('input[name="fragrance"]');
  const purchaseTypeRadios = document.querySelectorAll(
    'input[name="purchase-type"]'
  );
  const addToCartBtn = document.querySelector(".add-to-cart-btn");

  // Cart links for different combinations
  const cartLinks = {
    "original-single": "https://example.com/cart/original-single",
    "original-double": "https://example.com/cart/original-double",
    "original-try": "https://example.com/cart/original-try",
    "lily-single": "https://example.com/cart/lily-single",
    "lily-double": "https://example.com/cart/lily-double",
    "lily-try": "https://example.com/cart/lily-try",
    "rose-single": "https://example.com/cart/rose-single",
    "rose-double": "https://example.com/cart/rose-double",
    "rose-try": "https://example.com/cart/rose-try",
  };

  let selectedFragrance = "original";
  let selectedPurchaseType = "single";

  function updateAddToCartLink() {
    const key = `${selectedFragrance}-${selectedPurchaseType}`;
    const link = cartLinks[key] || "https://example.com/cart/default";

    if (addToCartBtn) {
      addToCartBtn.href = link;
      addToCartBtn.textContent = `Add to Cart - ${
        selectedFragrance.charAt(0).toUpperCase() + selectedFragrance.slice(1)
      } ${
        selectedPurchaseType.charAt(0).toUpperCase() +
        selectedPurchaseType.slice(1)
      }`;
    }
  }

  // Fragrance selection
  fragranceRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      selectedFragrance = this.value;
      updateAddToCartLink();
      updateSubscriptionDetails();
    });
  });

  // Purchase type selection
  purchaseTypeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      selectedPurchaseType = this.value;
      updateAddToCartLink();
      updateSubscriptionDetails();
    });
  });

  // Initialize with default values
  updateAddToCartLink();
}

// Subscription Details Expansion
function updateSubscriptionDetails() {
  const subscriptionCards = document.querySelectorAll(".subscription-card");

  subscriptionCards.forEach((card) => {
    const details = card.querySelector(".subscription-details");
    const radio = card.querySelector('input[type="radio"]:checked');

    if (details && radio) {
      if (radio.checked) {
        details.classList.add("expanded");
      } else {
        details.classList.remove("expanded");
      }
    }
  });
}

// FAQ Functionality
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (question && answer) {
      question.addEventListener("click", function () {
        const isActive = item.classList.contains("active");

        // Close all FAQ items
        faqItems.forEach((faqItem) => {
          faqItem.classList.remove("active");
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });
}

// Testimonials Scroll Functionality
function initializeTestimonials() {
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );
  const testimonialsGrid = document.querySelector(".testimonials-grid");

  if (testimonialsContainer && testimonialsGrid) {
    let isDown = false;
    let startX;
    let scrollLeft;

    testimonialsContainer.addEventListener("mousedown", function (e) {
      isDown = true;
      testimonialsContainer.style.cursor = "grabbing";
      startX = e.pageX - testimonialsContainer.offsetLeft;
      scrollLeft = testimonialsContainer.scrollLeft;
    });

    testimonialsContainer.addEventListener("mouseleave", function () {
      isDown = false;
      testimonialsContainer.style.cursor = "grab";
    });

    testimonialsContainer.addEventListener("mouseup", function () {
      isDown = false;
      testimonialsContainer.style.cursor = "grab";
    });

    testimonialsContainer.addEventListener("mousemove", function (e) {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - testimonialsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      testimonialsContainer.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    testimonialsContainer.addEventListener("touchstart", function (e) {
      startX = e.touches[0].pageX - testimonialsContainer.offsetLeft;
      scrollLeft = testimonialsContainer.scrollLeft;
    });

    testimonialsContainer.addEventListener("touchmove", function (e) {
      if (!startX) return;
      const x = e.touches[0].pageX - testimonialsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      testimonialsContainer.scrollLeft = scrollLeft - walk;
    });

    testimonialsContainer.addEventListener("touchend", function () {
      startX = null;
    });
  }
}

// Statistics Count Up Animation
function initializeStatistics() {
  const statistics = document.querySelectorAll(".statistic-item h3");

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.textContent);
        animateCountUp(target, 0, finalValue, 2000);
        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statistics.forEach((stat) => {
    observer.observe(stat);
  });
}

function animateCountUp(element, start, end, duration) {
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * progress);
    element.textContent =
      current + (element.textContent.includes("%") ? "%" : "");

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    }
  }

  requestAnimationFrame(updateCount);
}

// Mobile Menu Functionality
function initializeMobileMenu() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileNav = document.querySelector(".mobile-nav");

  if (mobileNav) {
    // Add navigation links to mobile menu
    const navLinks = [
      { text: "Home", href: "#" },
      { text: "Shop", href: "#" },
      { text: "Fragrances", href: "#" },
      { text: "About Us", href: "#" },
      { text: "Blog", href: "#" },
      { text: "Contact", href: "#" },
    ];

    navLinks.forEach((link) => {
      const a = document.createElement("a");
      a.href = link.href;
      a.textContent = link.text;
      mobileNav.appendChild(a);
    });
  }
}

// Smooth Scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Newsletter Form Submission
function initializeNewsletterForms() {
  document.querySelectorAll(".newsletter-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (email) {
        alert("Thank you for subscribing!");
        this.querySelector('input[type="email"]').value = "";
      }
    });
  });
}

// Intersection Observer for Animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(
      ".testimonial-card, .feature-item, .subscription-card, .fade-in"
    )
    .forEach((el) => {
      observer.observe(el);
    });
}

// Initialize additional functionality
document.addEventListener("DOMContentLoaded", function () {
  initializeSmoothScrolling();
  initializeNewsletterForms();
  initializeAnimations();
});

// Utility Functions
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

// Handle window resize
window.addEventListener(
  "resize",
  debounce(function () {
    // Reinitialize components that need resize handling
    if (window.innerWidth >= 768) {
      const mobileMenu = document.querySelector(".mobile-menu");
      if (mobileMenu) {
        mobileMenu.classList.remove("active");
      }
    }
  }, 250)
);


  // Accordion Logic
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-header span').textContent = '+';
      });

      if (!isActive) {
        item.classList.add('active');
        header.querySelector('span').textContent = '−';
      }
    });
  });

 // === PRODUCT CAROUSEL ===
const productTrack = document.querySelector('.carousel-track');
const productDots = document.querySelectorAll('.product-dot');
const productImages = document.querySelectorAll('.carousel-track img');
let productIndex = 0;

function updateProductCarousel() {
  productTrack.style.transform = `translateX(-${productIndex * 100}%)`;
  productDots.forEach(dot => dot.classList.remove('active'));
  productDots[productIndex].classList.add('active');
}

document.querySelector('.carousel-btn.next').addEventListener('click', () => {
  productIndex = (productIndex + 1) % productImages.length;
  updateProductCarousel();
});

document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
  productIndex = (productIndex - 1 + productImages.length) % productImages.length;
  updateProductCarousel();
});

productDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    productIndex = i;
    updateProductCarousel();
  });
});

updateProductCarousel();


// === TESTIMONIAL CAROUSEL ===
const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
const testimonialPrevBtn = document.querySelector(".testimonial-prev");
const testimonialNextBtn = document.querySelector(".testimonial-next");

let testimonialIndex = 0;
const totalTestimonials = testimonialDots.length;

function updateTestimonialCarousel() {
  const slideWidth = testimonialTrack.children[0].offsetWidth + 24; // card + margin
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * slideWidth}px)`;

  testimonialDots.forEach(dot => dot.classList.remove("active"));
  testimonialDots[testimonialIndex].classList.add("active");
}

testimonialPrevBtn.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex - 1 + totalTestimonials) % totalTestimonials;
  updateTestimonialCarousel();
});

testimonialNextBtn.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % totalTestimonials;
  updateTestimonialCarousel();
});

testimonialDots.forEach((dot, i) =>
  dot.addEventListener("click", () => {
    testimonialIndex = i;
    updateTestimonialCarousel();
  })
);

updateTestimonialCarousel();
