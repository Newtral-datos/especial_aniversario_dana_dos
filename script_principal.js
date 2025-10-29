document.addEventListener('DOMContentLoaded', () => {

  // --- INICIO DE LA MODIFICACIÓN ---
  
  const isIPhone = /iPhone/i.test(navigator.userAgent);
  
  if (isIPhone) {
    const urlIPhoneChart3 = 'https://i.imgur.com/MmnIC9V.png';
    const originalChart3 = document.getElementById('chart-3');

    // Comprobamos que 'chart-3' existe y es un iframe (para no romper nada)
    if (originalChart3 && originalChart3.tagName === 'IFRAME') {
      
      // 1. Creamos el nuevo elemento <a>
      const imageLink = document.createElement('a');
      imageLink.id = originalChart3.id; // Mantenemos el ID 'chart-3'
      imageLink.href = '#'; // Puedes poner un enlace si quieres, o dejar '#'
      imageLink.target = '_blank';
      imageLink.rel = 'noopener noreferrer';
      
      // 2. Le asignamos 'data-image="1"' para que coja los estilos CSS de las otras imágenes
      imageLink.dataset.image = '1';
      
      // 3. Copiamos todas las clases del iframe original (opacity, z-index, transition...)
      imageLink.className = originalChart3.className;

      // 4. Creamos la <img> de dentro
      const image = document.createElement('img');
      image.src = urlIPhoneChart3;
      image.alt = 'Gráfico estático para iPhone';
      
      // 5. Las conectamos
      imageLink.appendChild(image);
      
      // 6. Reemplazamos el <iframe> por el <a> en el DOM
      originalChart3.parentNode.replaceChild(imageLink, originalChart3);
    }
  }
  // --- FIN DE LA MODIFICACIÓN ---


  // El resto de tu script original sigue aquí, sin cambios.
  // Ahora, cuando se defina el objeto 'charts', document.getElementById('chart-3')
  // encontrará el <iframe> (en PC/Android) o el <a> (en iPhone).

  const steps = document.querySelectorAll('.step');
  
  const charts = {
    'chart-1': document.getElementById('chart-1'),
    'chart-2': document.getElementById('chart-2'),
    'chart-3': document.getElementById('chart-3'), // ¡Este elemento ya es el correcto!
    'chart-4': document.getElementById('chart-4'),
    'chart-5': document.getElementById('chart-5'),
    'chart-6': document.getElementById('chart-6'),
    'chart-7': document.getElementById('chart-7'),
    'chart-8': document.getElementById('chart-8'),
    'chart-9': document.getElementById('chart-9'),
    'chart-10': document.getElementById('chart-10'),
    'chart-11': document.getElementById('chart-11'),
    'chart-12': document.getElementById('chart-12'),
    'imagen-1': document.getElementById('imagen-1'),
    'chart-14': document.getElementById('chart-14'),
    'imagen-2': document.getElementById('imagen-2'),
    'chart-16': document.getElementById('chart-16'),
    'chart-17': document.getElementById('chart-17'),
  };
  
  let currentChartId = 'chart-1';

  window.addEventListener("message", function (evt) {
    const payload = evt.data && evt.data["datawrapper-height"];
    if (!payload) return;

    for (const key in payload) {
      const requestedHeight = payload[key];
      
      Object.values(charts).forEach(f => {
        if (f.tagName !== 'IFRAME') return;
        
        if (f.contentWindow === evt.source && f.id === currentChartId) {
          const container = document.querySelector(".chart-container");
          if (container) {
            container.style.height = requestedHeight + "px";
          }
        }
      });
    }
  });

  window.addEventListener('resize', () => {
    const frame = charts[currentChartId];
    const container = document.querySelector(".chart-container");
    if (!frame || !container) return;

    // Tu lógica original ya maneja esto perfectamente:
    // Si es un <a> (imagen) o no es datawrapper, usa la altura completa.
    if (frame.tagName === 'A' || !frame.src.includes('datawrapper')) {
        let newHeight = '100vh';
        if (window.innerWidth >= 768) { 
            newHeight = 'calc(100vh - 2rem)';
        }
        container.style.height = newHeight;
    }
    // Si es un iframe de datawrapper, pide la altura.
    else if (frame.tagName === 'IFRAME' && frame.src.includes('datawrapper')) {
         try {
           if (frame.contentWindow) {
             frame.contentWindow.postMessage({ 'datawrapper-height-query': true }, '*');
           }
         } catch (e) { 
           console.warn("No se pudo enviar 'datawrapper-height-query' en resize", e);
         }
    }
  });


  const showChart = (idToShow) => {
    if (!charts[idToShow]) {
      console.warn(`Chart ID "${idToShow}" no encontrado.`);
      return;
    }

    Object.entries(charts).forEach(([id, el]) => {
      const show = id === idToShow;
      el.classList.toggle('opacity-100', show);
      el.classList.toggle('z-10', show);
      el.classList.toggle('pointer-events-auto', show);
      el.classList.toggle('opacity-0', !show);
      el.classList.toggle('z-0', !show);
      el.classList.toggle('pointer-events-none', !show);
    });

    currentChartId = idToShow;

    const frame = charts[currentChartId];
    const container = document.querySelector(".chart-container");
    if (!frame || !container) return;

    // Tu lógica original también maneja esto
    if (frame.tagName === 'IFRAME' && frame.src.includes('datawrapper')) {
      try {
        if (frame.contentWindow) {
          frame.contentWindow.postMessage({ 'datawrapper-height-query': true }, '*');
        }
      } catch (e) {
        console.warn("No se pudo enviar 'datawrapper-height-query' en showChart", e);
      }
    } else {
      let newHeight = '100vh';
      if (window.innerWidth >= 768) {
        newHeight = 'calc(100vh - 2rem)';
      }
      container.style.height = newHeight;
    }
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        entry.target.classList.remove('is-active');
        return;
      }
      
      const step = entry.target;
      step.classList.add('is-active');
      
      const chartId = step.dataset.chartId;
      const stepIndex = step.dataset.stepIndex;
      
      if (chartId && chartId !== currentChartId) {
        showChart(chartId);
      }
      
      const frame = charts[currentChartId];
      // Y aquí, si el frame es un <a> (iPhone) no intentará enviar el postMessage. Perfecto.
      if (frame && stepIndex != null && frame.tagName === 'IFRAME' && frame.src.includes('datawrapper')) {
        try {
            if (frame.contentWindow) {
              frame.contentWindow.postMessage({ 'datawrapper-viewer-goto-step': stepIndex }, '*');
            }
        } catch (e) {
            console.warn(`No se pudo enviar el mensaje al gráfico ${currentChartId}:`, e);
        }
      }
    });
  }, { 
      threshold: 0.1, 
      rootMargin: '-30% 0px -30% 0px'
  });
  
  steps.forEach(s => observer.observe(s));
  
  showChart(currentChartId);
});
