(function(){
    // Selecciona solo los iframes con lazy-iframe y data-src (los fijos)
    var iframes = Array.prototype.slice.call(document.querySelectorAll('iframe.lazy-iframe[data-src]'));
    if (!iframes.length) return;
  
    // Función para cargar el contenido del iframe
    function loadIframe(el){
      // Si ya está cargando o cargado, salimos.
      if (el.dataset.loaded) return;
      
      const realSrc = el.dataset.src;
      
      // Establecer src para iniciar la carga
      el.src = realSrc;
      // Marcar como cargado inmediatamente.
      el.dataset.loaded = "true";
    }
  
    // Usar IntersectionObserver para la carga perezosa
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting || entry.intersectionRatio > 0){
            loadIframe(entry.target);
            io.unobserve(entry.target); // Dejar de observar una vez cargado
          }
        });
      }, { 
          root: null, 
          rootMargin: '600px 0px', 
          threshold: 0.01 
      });
  
      iframes.forEach(function(el){ io.observe(el); });
    } else {
      // Fallback para navegadores antiguos
      
      // Cargar el primer iframe inmediatamente
      iframes.slice(0, 1).forEach(loadIframe);
      
      var timer;
      function onScroll(){
        clearTimeout(timer);
        timer = setTimeout(function(){
          iframes.forEach(function(el){
            if (el.dataset.loaded) return;
            var rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 600 && rect.bottom > -600){
              loadIframe(el);
            }
          });
        }, 100);
      }
      
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', onScroll);
      onScroll(); 
    }
  })();