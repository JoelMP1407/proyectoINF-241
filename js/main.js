// Bratva Fitness - Funcionalidad interactiva y experiencia de usuario

document.addEventListener('DOMContentLoaded', function () {
  // 1. Menú hamburguesa para pantallas móviles
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('header.top nav');
  if (burger && nav) {
    burger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });
  }

  // 2. Generación automática de Migas de Pan (Breadcrumbs) en los banners
  var banner = document.querySelector('.banner');
  var activeLink = document.querySelector('.menu a.act');
  if (banner && activeLink && !activeLink.getAttribute('href').includes('index.html')) {
    var breadcrumb = document.createElement('div');
    breadcrumb.className = 'breadcrumbs';

    var parentLi = activeLink.closest('.menu > li');
    var parentCategory = parentLi ? parentLi.querySelector(':scope > a') : null;

    var html = '<a href="index.html">Inicio</a> <span class="sep">›</span> ';

    if (parentCategory && parentCategory !== activeLink) {
      html += '<a href="' + parentCategory.getAttribute('href') + '">' + parentCategory.textContent.trim() + '</a> <span class="sep">›</span> ';
    }
    html += '<span class="current">' + activeLink.textContent.trim() + '</span>';

    breadcrumb.innerHTML = html;
    banner.insertBefore(breadcrumb, banner.firstChild);
  }

  // 3. Visor de diagramas en pantalla completa (Lightbox)
  var figures = document.querySelectorAll('.fig');
  if (figures.length > 0) {
    // Crear el overlay del visor una sola vez
    var lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.id = 'lightbox';
    lightbox.innerHTML =
      '<div class="lightbox-content">' +
        '<button class="lightbox-close" aria-label="Cerrar visor">&times;</button>' +
        '<img class="lightbox-img" src="" alt="Diagrama ampliado">' +
        '<div class="lightbox-caption"></div>' +
      '</div>';
    document.body.appendChild(lightbox);

    var lbImg = lightbox.querySelector('.lightbox-img');
    var lbCaption = lightbox.querySelector('.lightbox-caption');
    var lbClose = lightbox.querySelector('.lightbox-close');

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });

    figures.forEach(function (fig) {
      var img = fig.querySelector('img');
      var caption = fig.querySelector('figcaption');

      if (img) {
        // Indicador visual de zoom
        var hint = document.createElement('span');
        hint.className = 'fig-zoom-hint';
        hint.innerHTML = '🔍 Clic para ampliar diagrama';
        fig.appendChild(hint);

        fig.addEventListener('click', function () {
          lbImg.src = img.src;
          lbCaption.textContent = caption ? caption.textContent.trim() : img.alt || '';
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      }
    });
  }
});
