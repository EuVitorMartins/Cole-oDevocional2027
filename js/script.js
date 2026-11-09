
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
   SEÇÃO 02 - CARROSSEL DE MATERIAIS
========================================= */

(function () {

  function iniciarCarrosselKit() {

    const carrosseis = document.querySelectorAll(
      '[data-kit-slider]'
    );

    carrosseis.forEach(function (carousel) {

      if (carousel.dataset.initialized === 'true') return;

      const track = carousel.querySelector(
        '.kit-slider__track'
      );

      if (!track) return;

      const slides = Array.from(
        track.querySelectorAll('.kit-slider__slide')
      );

      const total = slides.length;

      if (!total) return;

      carousel.dataset.initialized = 'true';

      const anterior = carousel.querySelector(
        '[data-kit-prev]'
      );

      const proximo = carousel.querySelector(
        '[data-kit-next]'
      );

      const dotsContainer = carousel.querySelector(
        '[data-kit-dots]'
      );

      const intervalo = Math.max(
        2000,
        Number(carousel.dataset.interval) || 4000
      );

      let indice = 0;
      let timer = null;
      let mouseSobre = false;
      let focoAtivo = false;
      let visivel = true;
      let inicioToque = null;

      const movimentoReduzido = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      );


      /* CLONES PARA LOOP INFINITO */

      if (total > 1) {

        const ultimoClone = slides[total - 1].cloneNode(true);

        const primeiroClone = slides[0].cloneNode(true);

        ultimoClone.setAttribute('aria-hidden', 'true');

        primeiroClone.setAttribute('aria-hidden', 'true');

        track.insertBefore(ultimoClone, slides[0]);

        track.appendChild(primeiroClone);

      }


      let posicao = total > 1 ? 1 : 0;


      /* INDICADORES */

      const dots = [];

      if (dotsContainer) {

        dotsContainer.innerHTML = '';

        slides.forEach(function (_, i) {

          const dot = document.createElement('button');

          dot.type = 'button';

          dot.className = 'kit-slider__dot';

          dot.setAttribute(
            'aria-label',
            'Ir para imagem ' + (i + 1)
          );

          dot.addEventListener('click', function () {

            irPara(i);

            reiniciar();

          });

          dotsContainer.appendChild(dot);

          dots.push(dot);

        });

      }


      /* POSICIONAMENTO */

      function mover(instantaneo = false) {

        if (instantaneo) {
          track.classList.add('is-instant');
        }

        track.style.transform =
          'translate3d(-' + (posicao * 100) + '%, 0, 0)';

        if (instantaneo) {

          track.offsetHeight;

          track.classList.remove('is-instant');

        }

      }


      /* ATUALIZAR BOLINHAS */

      function atualizarDots() {

        dots.forEach(function (dot, i) {

          dot.classList.toggle(
            'is-active',
            i === indice
          );

          dot.setAttribute(
            'aria-current',
            i === indice ? 'true' : 'false'
          );

        });

      }


      /* PRÓXIMA */

      function avancar() {

        if (total < 2) return;

        indice = (indice + 1) % total;

        posicao++;

        mover();

        atualizarDots();

      }


      /* ANTERIOR */

      function voltar() {

        if (total < 2) return;

        indice = (indice - 1 + total) % total;

        posicao--;

        mover();

        atualizarDots();

      }


      /* IR PARA UMA IMAGEM */

      function irPara(i) {

        if (total < 2) return;

        indice = i;

        posicao = i + 1;

        mover();

        atualizarDots();

      }


      /* LOOP INFINITO */

      track.addEventListener(
        'transitionend',
        function (event) {

          if (
            event.target !== track ||
            event.propertyName !== 'transform'
          ) return;


          if (posicao === total + 1) {

            posicao = 1;

            mover(true);

          }

          if (posicao === 0) {

            posicao = total;

            mover(true);

          }

        }
      );


      /* SETAS */

      if (anterior) {

        anterior.addEventListener('click', function () {

          voltar();

          reiniciar();

        });

      }


      if (proximo) {

        proximo.addEventListener('click', function () {

          avancar();

          reiniciar();

        });

      }


      /* DESLIZAR COM O DEDO */

      carousel.addEventListener(
        'pointerdown',
        function (event) {

          if (event.target.closest('button')) return;

          inicioToque = event.clientX;

        }
      );


      carousel.addEventListener(
        'pointerup',
        function (event) {

          if (inicioToque === null) return;

          const diferenca =
            inicioToque - event.clientX;

          inicioToque = null;

          if (Math.abs(diferenca) > 45) {

            if (diferenca > 0) {
              avancar();
            } else {
              voltar();
            }

            reiniciar();

          }

        }
      );


      carousel.addEventListener(
        'pointercancel',
        function () {
          inicioToque = null;
        }
      );


      /* AUTOPLAY */

      function parar() {

        if (timer) {

          clearInterval(timer);

          timer = null;

        }

      }


      function iniciar() {

        parar();

        if (
          total < 2 ||
          document.hidden ||
          mouseSobre ||
          focoAtivo ||
          !visivel ||
          movimentoReduzido.matches
        ) return;

        timer = setInterval(
          avancar,
          intervalo
        );

      }


      function reiniciar() {

        parar();

        iniciar();

      }


      /* PAUSA AO PASSAR O MOUSE */

      carousel.addEventListener(
        'mouseenter',
        function () {

          mouseSobre = true;

          parar();

        }
      );


      carousel.addEventListener(
        'mouseleave',
        function () {

          mouseSobre = false;

          iniciar();

        }
      );


      /* PAUSA AO USAR TECLADO */

      carousel.addEventListener(
        'focusin',
        function () {

          focoAtivo = true;

          parar();

        }
      );


      carousel.addEventListener(
        'focusout',
        function (event) {

          if (!carousel.contains(event.relatedTarget)) {

            focoAtivo = false;

            iniciar();

          }

        }
      );


      /* PAUSA QUANDO A PÁGINA FICA OCULTA */

      document.addEventListener(
        'visibilitychange',
        function () {

          if (document.hidden) {

            parar();

          } else {

            iniciar();

          }

        }
      );


      /* PAUSA FORA DA ÁREA VISÍVEL */

      if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(
          function (entries) {

            entries.forEach(function (entry) {

              visivel = entry.isIntersecting;

              if (visivel) {
                iniciar();
              } else {
                parar();
              }

            });

          },
          { threshold: 0.15 }
        );

        observer.observe(carousel);

      }


      /* UMA ÚNICA IMAGEM */

      if (total < 2) {

        if (anterior) anterior.hidden = true;

        if (proximo) proximo.hidden = true;

        if (dotsContainer) dotsContainer.hidden = true;

      }


      /* INICIALIZAR */

      mover(true);

      atualizarDots();

      iniciar();

    });

  }


  if (document.readyState === 'loading') {

    document.addEventListener(
      'DOMContentLoaded',
      iniciarCarrosselKit
    );

  } else {

    iniciarCarrosselKit();

  }

})();


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
