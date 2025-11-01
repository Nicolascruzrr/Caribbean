// Observer para animaciones de scroll
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '20px 0px' });

// Observar elementos
document.querySelectorAll('.section, .split-card, .timeline-item.reveal').forEach(el => observer.observe(el));

// Botón flotante Back to Top
class FloatingBackToTop {
  constructor() {
    this.button = document.getElementById('floatingBackToTop');
    this.scrollThreshold = 100;
    this.isVisible = false;
    this.animationDuration = 300;
    this.init();
  }
  
  init() {
    if (!this.button) return;
    
    this.handleScroll = this.throttle(this.toggleVisibility.bind(this), 16);
    this.handleClick = this.smoothScrollToTop.bind(this);
    
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    this.button.addEventListener('click', this.handleClick);
    this.toggleVisibility();
  }
  
  toggleVisibility() {
    const scrollY = window.scrollY;
    const shouldShow = scrollY > this.scrollThreshold;
    
    if (shouldShow && !this.isVisible) {
      this.show();
    } else if (!shouldShow && this.isVisible) {
      this.hide();
    }
  }
  
  show() {
    this.isVisible = true;
    this.button.classList.add('visible');
    this.button.style.transition = `all ${this.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  }
  
  hide() {
    this.isVisible = false;
    this.button.classList.remove('visible');
    this.button.style.transition = `all ${this.animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
  }
  
  smoothScrollToTop() {
    // Usar animación manual de scroll
    const startPosition = window.pageYOffset;
    const duration = 800;
    let start = null;
    
    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuad(timeElapsed, startPosition, -startPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    
    requestAnimationFrame(animation);
    this.button.style.transform = 'scale(0.95)';
    setTimeout(() => this.button.style.transform = '', 150);
  }
  
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
}

// Inicializar botón flotante
document.addEventListener('DOMContentLoaded', () => new FloatingBackToTop());

// Función de smooth scroll manual para todos los dispositivos (especialmente iPad)
function smoothScrollTo(target) {
  if (!target) return;
  
  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000; // Duración en milisegundos
  let start = null;
  
  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }
  
  // Función de easing para una transición suave
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  
  requestAnimationFrame(animation);
}

// Navbar scroll appearance - Optimizado con requestAnimationFrame
let navbarTicking = false;
const navbarEl = document.getElementById('navbar');

// Función para actualizar el estado del navbar
function updateNavbarState() {
  if (window.scrollY > 100) {
    navbarEl.classList.add('navbar--visible');
  } else {
    navbarEl.classList.remove('navbar--visible');
  }
}

// Inicializar el navbar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  updateNavbarState();
});

window.addEventListener('scroll', function() {
  if (!navbarTicking) {
    window.requestAnimationFrame(function() {
      updateNavbarState();
      navbarTicking = false;
    });
    navbarTicking = true;
  }
}, { passive: true });

// Smooth scroll para enlaces internos - TODOS LOS DISPOSITIVOS
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      let target = document.getElementById(targetId);
      
      // Si es el enlace "nosotros", usar la función para obtener la sección correcta
      if (targetId === 'nosotros') {
        target = getNosotrosSection();
      }
      
      if (target) {
        smoothScrollTo(target);
      }
    });
  });
});

// Función para obtener la sección nosotros correcta según el dispositivo
function getNosotrosSection() {
  const isDesktop = window.innerWidth >= 1025;
  return isDesktop ? document.getElementById('nosotros-desktop') : document.getElementById('nosotros');
}

// Scroll suave al hacer click en scroll-indicator (angle down)
document.addEventListener('DOMContentLoaded', function() {
  const scrollIndicator = document.getElementById('newHeroScroll');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function(e) {
      e.preventDefault();
      const target = getNosotrosSection();
      if (target) {
        smoothScrollTo(target);
      }
    });
  }
});

// (removed) duplicate navbar scroll handler


// Datos de los proyectos
const projectData = {
  'edificio-caribbean': {
    title: 'Edificio Caribbean',
    description: 'Torre de apartamentos con piscina, gazebo y amenidades completas.',
    image: 'Fotos/Edificio Caribbean.jpg',
    gallery: [
      'E.C Fotos/Entrada E.C.jpg',
      'E.C Fotos/Area Social E.C.jpg',
      'E.C Fotos/Area Social E.C 2.jpg',
      'E.C Fotos/Area Social E.C 3.jpg',
      'E.C Fotos/Sala E.C.jpg',
      'E.C Fotos/Habitacion E.C.jpg',
      'E.C Fotos/Estudio E.C.jpg',
      'E.C Fotos/Estudio E.C 2.jpg'
    ],
    area: '138 m²',
    rooms: '20 Unidades',
    year: '2023',
    features: [
      'Piscina con área de descanso',
      'Gazebo elegante para eventos sociales',
      'Ascensores modernos y seguros',
      'Parqueos techados disponibles y destechados',
      'Lobby de recepción elegante y espacioso'
    ]
  },
  'caribbean-view': {
    title: 'Caribbean View',
    description: 'Residencia de lujo con piscina en área social y acabados premium.',
    gallery: [
      'C.V Fotos/Entrada C.V.jpg',
      'C.V Fotos/Sala C.V.jpg',
      'C.V Fotos/Comedor C.V.jpg',
      'C.V Fotos/Cocina C.V.jpg',
      'C.V Fotos/Area Social C.V.jpg',
      'C.V Fotos/Habitacion C.V.jpg',
      'C.V Fotos/Estudio C.V.jpg',
      'Fotos/Caribbean View.png'
    ],
    area: '257 m²',
    rooms: '8 Unidades',
    year: '2025',
    features: [
      'Piscina moderna en area social',
      'Acabados de lujo y materiales premium',
      'Diseño arquitectónico contemporáneo',
      'Tecnología inteligente integrada',
      'Espacios amplios con terraza privada'
    ]
  }
};

// Elementos del modal
const projectModal = document.getElementById('project-detail-modal');
const closeModalBtn = document.getElementById('close-project-modal');
const backToProjectsBtn = document.getElementById('back-to-projects');
const projectTitle = document.getElementById('project-title');
const projectDescription = document.getElementById('project-description');
const slider = document.getElementById('project-slider');
const slidesTrack = document.getElementById('project-slides');
const dotsContainer = document.getElementById('slider-dots');
const projectBreadcrumbName = document.getElementById('project-breadcrumb-name');
const projectArea = document.getElementById('project-area');
const projectRooms = document.getElementById('project-rooms');
const projectYear = document.getElementById('project-year');
const projectFeatures = document.getElementById('project-features');

let currentSlideIndex = 0;
let autoSlideTimer = null;
let userInteractedWithSlider = false;
let touchStartX = 0;
let touchDeltaX = 0;

// Función para actualizar enlace de WhatsApp con nombre del proyecto
function updateWhatsAppLinkForProject(projectName) {
  const requestInfoBtn = document.getElementById('request-info-btn');
  if (requestInfoBtn && projectName) {
    const message = `Hola, me gustaria tener mas informacion sobre ${projectName}`;
    const encodedMessage = encodeURIComponent(message);
    requestInfoBtn.href = `https://wa.me/18098922298?text=${encodedMessage}`;
  }
}

// Variable para guardar la posición de scroll
let savedScrollPosition = 0;

// Función para abrir el modal
function openProjectModal(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  // Guardar la posición actual de scroll
  savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  // Fijar el body en la posición actual para evitar saltos
  document.body.style.top = `-${savedScrollPosition}px`;

  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;
  
  // Actualizar enlace de WhatsApp inmediatamente
  updateWhatsAppLinkForProject(project.title);
  
  if (slidesTrack) {
    slidesTrack.innerHTML = '';
    const images = (project.gallery && project.gallery.length) ? project.gallery : [project.image];
    images.forEach((src, idx) => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      const img = document.createElement('img');
      // Lazy load todas excepto la primera imagen
      if (idx === 0) {
        img.src = src;
      } else {
        img.setAttribute('data-src', src);
        img.style.opacity = '0';
      }
      img.alt = project.title;
      slide.appendChild(img);
      slidesTrack.appendChild(slide);
    });
    
    // Cargar imagen siguiente cuando se abre el modal
    setTimeout(() => {
      const nextImg = slidesTrack.querySelector('img[data-src]');
      if (nextImg) {
        nextImg.src = nextImg.getAttribute('data-src');
        nextImg.removeAttribute('data-src');
        nextImg.style.transition = 'opacity 0.3s ease';
        nextImg.style.opacity = '1';
      }
    }, 300);
    
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      images.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot' + (idx === 0 ? ' active' : '');
        dot.addEventListener('click', () => moveToSlide(idx));
        dotsContainer.appendChild(dot);
      });
    }
    
    currentSlideIndex = 0;
    userInteractedWithSlider = false;
    updateSliderPosition();
    startAutoSlide();
  }
  
  projectBreadcrumbName.textContent = project.title;
  projectArea.textContent = project.area;
  projectRooms.textContent = project.rooms;
  projectYear.textContent = project.year;

  projectFeatures.innerHTML = '';
  project.features.forEach(feature => {
    const li = document.createElement('li');
    li.className = 'feature-item';
    li.textContent = feature;
    projectFeatures.appendChild(li);
  });

  projectModal.classList.add('active');
  document.body.classList.add('hide-scrollbar');
}

function updateSliderPosition() {
  if (!slidesTrack) return;
  // Usar requestAnimationFrame para smooth animation
  window.requestAnimationFrame(() => {
    const offset = -currentSlideIndex * 100;
    slidesTrack.style.transform = `translate3d(${offset}%, 0, 0)`;
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlideIndex));
    }
  });
}

function moveToSlide(index) {
  if (!slidesTrack) return;
  const total = slidesTrack.children.length;
  currentSlideIndex = Math.max(0, Math.min(index, total - 1));
  
  // Precargar imagen del slide actual si no está cargada
  const currentSlide = slidesTrack.children[currentSlideIndex];
  if (currentSlide) {
    const img = currentSlide.querySelector('img[data-src]');
    if (img) {
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      img.style.transition = 'opacity 0.3s ease';
      img.style.opacity = '1';
    }
  }
  
  // Precargar siguiente imagen
  if (currentSlideIndex + 1 < total) {
    const nextSlide = slidesTrack.children[currentSlideIndex + 1];
    if (nextSlide) {
      const nextImg = nextSlide.querySelector('img[data-src]');
      if (nextImg) {
        nextImg.src = nextImg.getAttribute('data-src');
        nextImg.removeAttribute('data-src');
        nextImg.style.transition = 'opacity 0.3s ease';
        nextImg.style.opacity = '1';
      }
    }
  }
  
  updateSliderPosition();
}

function nextSlide() {
  if (!slidesTrack) return;
  const total = slidesTrack.children.length;
  moveToSlide((currentSlideIndex + 1) % total);
}

function startAutoSlide() {
  stopAutoSlide();
  if (!userInteractedWithSlider) {
    autoSlideTimer = setInterval(nextSlide, 4000);
  }
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  document.body.classList.remove('hide-scrollbar');
  
  // Restaurar el body a su estado normal y posición
  document.body.style.top = '';
  
  // Restaurar la posición de scroll SIN animación
  const scrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = 'auto';
  document.body.style.scrollBehavior = 'auto';
  
  window.scrollTo(0, savedScrollPosition);
  
  // Restaurar scroll behavior después
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = scrollBehavior || '';
    document.body.style.scrollBehavior = '';
  }, 0);
  
  stopAutoSlide();
}

// Event listeners del modal
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeProjectModal);
}

if (backToProjectsBtn) {
  backToProjectsBtn.addEventListener('click', closeProjectModal);
}

projectModal.addEventListener('click', function(e) {
  if (e.target === projectModal) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
  if (projectModal.classList.contains('active') && e.key === 'ArrowRight') {
    userInteractedWithSlider = true;
    stopAutoSlide();
    nextSlide();
  }
  if (projectModal.classList.contains('active') && e.key === 'ArrowLeft') {
    userInteractedWithSlider = true;
    stopAutoSlide();
    const total = slidesTrack ? slidesTrack.children.length : 0;
    if (total > 0) {
      const prevIndex = (currentSlideIndex - 1 + total) % total;
      moveToSlide(prevIndex);
    }
  }
});

// Botones "Ver Proyecto"
document.addEventListener('DOMContentLoaded', function() {
  const splitButtons = document.querySelectorAll('#split-projects .btn-split.primary');
  splitButtons.forEach((btn) => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      let projectId = btn.getAttribute('data-project');
      if (!projectId) {
        const container = btn.closest('.split-card');
        const titleEl = container ? container.querySelector('.split-title') : null;
        const title = titleEl ? titleEl.textContent.trim() : '';
        if (title === 'Edificio Caribbean') projectId = 'edificio-caribbean';
        if (title === 'Caribbean View') projectId = 'caribbean-view';
      }
      if (projectId === 'oceanview') projectId = 'caribbean-view';
      if (projectId === 'corporate') projectId = 'edificio-caribbean';
      openProjectModal(projectId || 'edificio-caribbean');
    });
  });
});

// Touch swipe en móvil/tablet para el slider del modal
document.addEventListener('DOMContentLoaded', function() {
  if (!slidesTrack) return;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouch) return;

  slidesTrack.addEventListener('touchstart', function(e){
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchDeltaX = 0;
    userInteractedWithSlider = true;
    stopAutoSlide();
  }, { passive: true });

  slidesTrack.addEventListener('touchmove', function(e){
    const t = e.touches[0];
    touchDeltaX = t.clientX - touchStartX;
    if (Math.abs(touchDeltaX) > 10) {
      e.preventDefault();
    }
  }, { passive: false });

  slidesTrack.addEventListener('touchend', function(){
    const threshold = 40; // px mínimos para considerar swipe
    if (Math.abs(touchDeltaX) > threshold) {
      if (touchDeltaX < 0) {
        nextSlide();
      } else {
        const total = slidesTrack.children.length;
        const prevIndex = (currentSlideIndex - 1 + total) % total;
        moveToSlide(prevIndex);
      }
    }
  }, { passive: true });
});


// Formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  const successNotification = document.getElementById('success-notification');
  
  if (contactForm && successNotification) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      successNotification.classList.add('show');
      setTimeout(() => {
        successNotification.classList.remove('show');
        setTimeout(() => contactForm.reset(), 400);
      }, 8500);
    });
  }
});

// ======================
// TIMELINE ANIMATIONS
// ======================

// Función de animación con IntersectionObserver para el timeline
function initTimelineAnimations() {
  // Configuración del observer específico para el timeline
  const timelineObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Añadir clase reveal para mostrar el elemento del timeline
          entry.target.classList.add('reveal');
          
          // Dejar de observar este elemento una vez revelado
          obs.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.1,           // Se activa cuando 10% del elemento es visible
      rootMargin: '20px 0px'    // Margen adicional de 20px arriba y abajo
    }
  );

  // Función para observar los elementos del timeline
  function observeTimelineItems() {
    // Seleccionar todos los elementos timeline-item específicos del timeline section
    const timelineItems = document.querySelectorAll('.timeline-section .timeline-item');
    
    // Observar cada elemento
    timelineItems.forEach(item => {
      timelineObserver.observe(item);
    });
  }

  // Inicializar observación cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeTimelineItems);
  } else {
    observeTimelineItems();
  }
}

// Funcionalidad adicional para mejorar la experiencia del timeline
function initTimelineAdditionalFeatures() {
  // Event listeners para efectos adicionales en los iconos del timeline
  const timelineIcons = document.querySelectorAll('.timeline-section .timeline-icon');
  
  timelineIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      // Efecto adicional en hover si se desea
      this.style.transform = 'translateX(-50%) scale(1.15) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'translateX(-50%) scale(1) rotate(0deg)';
    });
  });
  
  // Event listeners para las tarjetas del timeline
  const timelineCards = document.querySelectorAll('.timeline-section .timeline-card');
  
  timelineCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Pequeño efecto de pulsación en hover
      this.style.transform = 'translateY(-8px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-6px) scale(1.02)';
    });
  });
}

// Función de inicialización principal del timeline
function initTimeline() {
  initTimelineAnimations();
  initTimelineAdditionalFeatures();
}

// Ejecutar cuando el script se carga
initTimeline();

// Función para reinicializar si es necesario (útil para SPAs)
window.reinitTimeline = function() {
  initTimeline();
};

// Listener para cambios de tamaño de ventana (orientación, resize)
window.addEventListener('resize', function() {
  // Reinicializar el timeline cuando cambie el tamaño de ventana
  setTimeout(() => {
    initTimeline();
  }, 100);
});

// ======================
// SECCIÓN NOSOTROS MÓVIL
// ======================

// Función para inicializar la sección nosotros móvil
function initNosotrosMobile() {
  // Observer para animaciones de scroll en la sección nosotros
  const nosotrosObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { 
      threshold: 0.2,           // Más sensible para móviles
      rootMargin: '20px 0px'    // Margen adicional
    }
  );

  // Observar elementos de la sección nosotros
  const nosotrosElements = document.querySelectorAll('.nosotros-section .reveal');
  nosotrosElements.forEach(el => {
    nosotrosObserver.observe(el);
  });

  // Efectos de touch para las tarjetas
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    // Touch start
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(1.02)';
    }, { passive: true });
    
    // Touch end
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }, { passive: true });
    
    // Touch cancel
    card.addEventListener('touchcancel', function() {
      this.style.transform = '';
    }, { passive: true });
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initNosotrosMobile);

// Reinicializar en cambios de tamaño de ventana
window.addEventListener('resize', () => {
  setTimeout(initNosotrosMobile, 100);
});

// ======================
// MENÚ HAMBURGUESA MÓVIL
// ======================

// Función para inicializar el menú hamburguesa
function initHamburgerMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const body = document.body;

  if (!hamburgerBtn || !mobileMenu) return;

  // Función para abrir el menú
  function openMenu() {
    hamburgerBtn.classList.add('active');
    mobileMenu.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
  }

  // Función para cerrar el menú
  function closeMenu() {
    hamburgerBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  // Event listener para el botón hamburguesa
  hamburgerBtn.addEventListener('click', function() {
    if (mobileMenu.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Event listeners para los enlaces del menú móvil
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Cerrar menú al hacer click fuera del contenido
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });

  // Cerrar menú con tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // Cerrar menú al redimensionar la ventana (si se cambia a desktop)
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initHamburgerMenu);

// ======================
// INDICADORES DE DISPOSITIVO
// ======================

// Función para detectar el tipo de dispositivo
function getDeviceType() {
  const width = window.innerWidth;
  
  if (width <= 480) {
    return 'mobile';
  } else if (width <= 768) {
    return 'mobile';
  } else if (width <= 1024) {
    return 'tablet';
  } else if (width <= 1440) {
    return 'desktop';
  } else {
    return 'large-desktop';
  }
}

// Optimización de rendimiento - Lazy loading para imágenes
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    images.forEach(img => {
      img.classList.add('loaded');
    });
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  initLazyLoading(); // Agregar lazy loading
});

// ======================
// TOUCH HOVER PARA TABLET (iPad)
// ======================

// Función para manejar efectos hover con touch en tablets
function initTouchHover() {
  // Detectar si es un dispositivo táctil (tablet/iPad)
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  if (!isTouchDevice) return;
  
  // Elementos que deben tener efecto touch-hover
  const touchElements = document.querySelectorAll(
    '.timeline-card, .btn-split, .btn-icon, .btn-form, ' +
    '.contact-icon, .social-icon, .service-card, .split-card, ' +
    '.timeline-icon, .media-card'
  );
  
  let currentTouchedElement = null;
  
  // Agregar eventos touch a cada elemento
  touchElements.forEach(element => {
    element.addEventListener('touchstart', function(e) {
      // Remover clase de cualquier elemento previamente tocado
      if (currentTouchedElement && currentTouchedElement !== this) {
        currentTouchedElement.classList.remove('touch-active');
      }
      
      // Agregar clase al elemento actual
      this.classList.add('touch-active');
      currentTouchedElement = this;
    }, { passive: true });
  });
  
  // Remover efecto al tocar fuera o en el background
  document.addEventListener('touchstart', function(e) {
    // Verificar si el touch es en el background (no en un elemento interactivo)
    const isInteractiveElement = e.target.closest(
      '.timeline-card, .btn-split, .btn-icon, .btn-form, ' +
      '.contact-icon, .social-icon, .service-card, .split-card, ' +
      '.timeline-icon, .media-card'
    );
    
    // Si tocamos fuera de los elementos interactivos, remover todas las clases
    if (!isInteractiveElement && currentTouchedElement) {
      currentTouchedElement.classList.remove('touch-active');
      currentTouchedElement = null;
    }
  }, { passive: true });
  
  // También remover al hacer scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      if (currentTouchedElement) {
        currentTouchedElement.classList.remove('touch-active');
        currentTouchedElement = null;
      }
    }, 150);
  }, { passive: true });
}

// Inicializar touch hover cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTouchHover);

// ======================
// TOUCH BLUR PARA INPUTS EN TABLET (iPad)
// ======================

// Función para remover focus de inputs al tocar el background
function initTouchBlurInputs() {
  // Detectar si es un dispositivo táctil (tablet/iPad)
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  
  if (!isTouchDevice) return;
  
  // Escuchar toques en el documento
  document.addEventListener('touchstart', function(e) {
    // Verificar si el touch NO es en un input, textarea, select, label o botón
    const isFormElement = e.target.closest('input, textarea, select, label, button, .contact-form, .premium-contact-section, .btn-form, .btn-split, .btn-icon');
    
    // Si tocamos fuera de elementos de formulario, remover focus de todos los inputs
    if (!isFormElement) {
      const activeElement = document.activeElement;
      
      // Si hay un input, textarea o select con focus, quitarle el focus
      if (activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.tagName === 'SELECT'
      )) {
        activeElement.blur();
        
        // Forzar el cierre del teclado virtual en algunos dispositivos
        if (activeElement.setAttribute) {
          activeElement.setAttribute('readonly', 'readonly');
          setTimeout(() => {
            activeElement.removeAttribute('readonly');
          }, 100);
        }
      }
    }
  }, { passive: true });
  
  // También escuchar clicks para dispositivos híbridos
  document.addEventListener('click', function(e) {
    const isFormElement = e.target.closest('input, textarea, select, label, button, .contact-form, .premium-contact-section, .btn-form, .btn-split, .btn-icon');
    
    if (!isFormElement) {
      const activeElement = document.activeElement;
      
      if (activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.tagName === 'SELECT'
      )) {
        activeElement.blur();
      }
    }
  });
}

// Inicializar touch blur para inputs cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initTouchBlurInputs);

