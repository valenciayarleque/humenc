/* script.js - interacciones: menú móvil, hero 3D, formulario demo, ajustes del footer y whatsapp */
document.addEventListener('DOMContentLoaded', function () {
  // Año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // NAV TOGGLE (mobile)
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    const open = navLinks.style.display === 'flex';
    navLinks.style.display = open ? '' : 'flex';
    if(!open) navLinks.style.flexDirection = 'column';
  });

  // HERO 3D INTERACTIVO
  const heroCard = document.getElementById('heroCard');
  const resetTransform = () => {
    heroCard.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  function handleMove(e) {
    const rect = heroCard.getBoundingClientRect();
    const x = (e.clientX ?? (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY ?? (e.touches && e.touches[0].clientY)) - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / cy; // -1 .. 1
    const ry = (x - cx) / cx;
    const degX = rx * 6; // intensidad
    const degY = ry * -8;
    heroCard.style.transform = `perspective(900px) rotateX(${degX}deg) rotateY(${degY}deg) translateZ(0)`;
  }

  // mouse
  heroCard.addEventListener('mousemove', handleMove);
  heroCard.addEventListener('mouseleave', resetTransform);
  heroCard.addEventListener('touchmove', function(e){
    handleMove(e);
    e.preventDefault();
  }, {passive:false});
  heroCard.addEventListener('touchend', resetTransform);

  // Simple form demo (no envío real)
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  contactForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitBtn.textContent = 'Enviando...';
    setTimeout(() => {
      submitBtn.textContent = 'Enviar mensaje';
      alert('Gracias — tu mensaje se ha registrado (demo). Reemplaza con tu back-end o servicio de correo.');
      contactForm.reset();
    }, 900);
  });

  // WHATSAPP: personaliza número si lo deseas (el elemento tiene data-whatsapp)
  const waBtn = document.getElementById('whatsappBtn');
  // ejemplo: si quieres cambiar el número desde JS:
  // waBtn.href = "https://wa.me/51987654321";
  // waBtn.setAttribute('data-whatsapp', '+51987654321');

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      if(!targetId) return;
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        // close mobile nav if open
        if(window.innerWidth < 700 && navLinks.style.display === 'flex'){
          navLinks.style.display = '';
        }
      }
    });
  });

  // Accessibility: allow heroCard to respond to keyboard focus (small tilt)
  heroCard.addEventListener('focus', ()=> heroCard.style.transform = 'perspective(900px) rotateX(-4deg) rotateY(6deg)');
  heroCard.addEventListener('blur', resetTransform);
});

const carousel = document.getElementById('productsCarousel');
const cards = document.querySelectorAll('.product-card');
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;

function updateCarousel() {
  const angle = 25; // Ángulo de rotación
  const spacing = 300; // Distancia entre tarjetas

  cards.forEach((card, i) => {
    const offset = i - currentIndex;
    card.style.transform = `translateX(${offset * spacing}px) rotateY(${offset * -angle}deg) scale(${offset===0?1:0.85})`;
    card.style.zIndex = cards.length - Math.abs(offset);
    card.style.opacity = offset < -3 || offset > 3 ? 0 : 1;
  });
}

// Botones
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateCarousel();
});

// Inicializar
updateCarousel();


const whatsappBtn = document.getElementById('whatsappBtn');

// Altura inicial desde el top
let baseTop = 200;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY || window.pageYOffset;

  // Nuevo top = altura inicial + scroll
  whatsappBtn.style.top = baseTop + scrollY + "px";
});


//icons//
document.querySelectorAll('.social-item').forEach(item => {
  item.addEventListener('click', () => {
    const link = item.getAttribute('data-link');
    if(link) window.open(link, '_blank');
  });
});

