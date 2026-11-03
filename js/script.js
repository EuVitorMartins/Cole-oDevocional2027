
// ==========================================
// COLEÇÃO DEVOCIONAL
// JAVASCRIPT PRINCIPAL
// ==========================================

document.addEventListener('DOMContentLoaded', function () {

  // DATA AUTOMÁTICA DA OFERTA

  const offerDate = document.getElementById('offer-date');

  if (offerDate) {

    const currentDate = new Date();

    const formattedDate = new Intl.DateTimeFormat('pt-BR', {

      timeZone: 'America/Sao_Paulo',

      day: '2-digit',

      month: '2-digit',

      year: 'numeric'

    }).format(currentDate);

    offerDate.textContent = formattedDate;

  }

});


/* =========================================
   CARROSSEIS - SEÇÃO 02
========================================= */

document.addEventListener('DOMContentLoaded', function () {

  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(function (carousel) {

    const track = carousel.querySelector('.carousel-track');

    const slides = carousel.querySelectorAll('.carousel-slide');

    const prev = carousel.querySelector('.prev');

    const next = carousel.querySelector('.next');

    const indicators = carousel.querySelector('.carousel-indicators');

    let currentIndex = 0;

    let startX = 0;
    let endX = 0;

    const totalSlides = slides.length;

    // CRIAR INDICADORES

    slides.forEach(function (_, index) {

      const dot = document.createElement('button');

      dot.type = 'button';

      dot.className = 'carousel-dot';

      dot.setAttribute('aria-label', 'Ir para imagem ' + (index + 1));

      dot.addEventListener('click', function () {

        currentIndex = index;

        updateCarousel();

      });

      indicators.appendChild(dot);

    });

    const dots = indicators.querySelectorAll('.carousel-dot');

    // ATUALIZAR CARROSSEL

    function updateCarousel() {

      track.style.transform =
        `translateX(-${currentIndex * 100}%)`;

      dots.forEach(function (dot, index) {

        dot.classList.toggle(
          'active',
          index === currentIndex
        );

      });

    }

    // PRÓXIMA IMAGEM

    next.addEventListener('click', function () {

      currentIndex = (currentIndex + 1) % totalSlides;

      updateCarousel();

    });

    // IMAGEM ANTERIOR

    prev.addEventListener('click', function () {

      currentIndex =
        (currentIndex - 1 + totalSlides) % totalSlides;

      updateCarousel();

    });

    // DESLIZAR COM O MOUSE OU DEDO

    track.addEventListener('pointerdown', function (event) {

      startX = event.clientX;

    });

    track.addEventListener('pointerup', function (event) {

      endX = event.clientX;

      const difference = startX - endX;

      if (Math.abs(difference) > 45) {

        if (difference > 0) {

          currentIndex = (currentIndex + 1) % totalSlides;

        } else {

          currentIndex =
            (currentIndex - 1 + totalSlides) % totalSlides;

        }

        updateCarousel();

      }

    });

    // INICIAR

    updateCarousel();

  });

});

/* =========================================
   SEÇÃO 09 - ANO AUTOMÁTICO DO RODAPÉ
========================================= */

document.addEventListener('DOMContentLoaded', function () {

  const yearElement = document.getElementById('footer-year');

  if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

  }

});

/* =========================================
   SEÇÃO 07 - FAQ INTERATIVO
========================================= */

document.addEventListener('DOMContentLoaded', function () {

  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {

    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {

      const isOpen = item.classList.contains('active');

      // FECHAR TODOS OS ITENS

      faqItems.forEach(function (faq) {

        faq.classList.remove('active');

        faq.querySelector('.faq-question')
          .setAttribute('aria-expanded', 'false');

      });

      // ABRIR O ITEM SELECIONADO

      if (!isOpen) {

        item.classList.add('active');

        question.setAttribute('aria-expanded', 'true');

      }

    });

  });

});
