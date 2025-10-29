(function(){
    // Seleccionar TODOS los iframes con data-src (fijos y los que están en el texto)
    var iframes = Array.prototype.slice.call(document.querySelectorAll('iframe.lazy-iframe[data-src]'));
    if (!iframes.length) return;
  
    // Función para cargar el contenido del iframe
    function loadIframe(el){
      // Si ya está cargando o cargado, salimos.
      if (el.dataset.loaded) return;
      
      const realSrc = el.dataset.src;
      
      // Establecer src para iniciar la carga
      el.src = realSrc;
      // Marcar como cargado inmediatamente para evitar intentos de carga duplicados.
      el.dataset.loaded = "true";
    }
  
    // Usar IntersectionObserver para la carga perezosa óptima
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          // Si el elemento está intersectando o cerca (rootMargin)
          if (entry.isIntersecting || entry.intersectionRatio > 0){
            loadIframe(entry.target);
            io.unobserve(entry.target); // Dejar de observar una vez cargado
          }
        });
      }, { 
          root: null, 
          // Cargar con 600px de antelación para que estén listos al hacer scroll
          rootMargin: '600px 0px', 
          threshold: 0.01 
      });
  
      iframes.forEach(function(el){ io.observe(el); });
    } else {
      // Fallback: cargar el primero inmediatamente y el resto con throttle en scroll.
      
      // Cargar los primeros elementos visible/cercanos (ej. los primeros gráficos fijos)
      iframes.slice(0, 1).forEach(loadIframe);
      
      var timer;
      function onScroll(){
        clearTimeout(timer);
        timer = setTimeout(function(){
          iframes.forEach(function(el){
            if (el.dataset.loaded) return;
            var rect = el.getBoundingClientRect();
            // Comprobar si está en el viewport + 600px de buffer
            if (rect.top < window.innerHeight + 600 && rect.bottom > -600){
              loadIframe(el);
            }
          });
        }, 100);
      }
      
      // Adjuntar listeners
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', onScroll);
      onScroll(); // Comprobación inicial
    }
  })();