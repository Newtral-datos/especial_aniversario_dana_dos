document.addEventListener('DOMContentLoaded', () => {

  // --- INICIO DE LA MODIFICACIÓN ---
  
  const isIPhone = /iPhone/i.test(navigator.userAgent);
  
  if (isIPhone) {
    
    // Mapeo de IDs de gráficos a sus URLs de imagen estática y URL de enlace específicas para iPhone.
    // **imageUrl**: Es la URL de la imagen que se mostrará.
    // **linkUrl**: Es la URL de destino al hacer clic en la imagen (puedes usar la URL del iframe original si quieres que se abra el interactivo en una nueva pestaña).
    const iPhoneChartReplacements = {
      'chart-3': { 
        imageUrl: 'https://i.imgur.com/MmnIC9V.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/4MT1z/1/' // Ejemplo: Enlace al gráfico Datawrapper original
      },
      'chart-4': { 
        imageUrl: 'https://i.imgur.com/Mh4w7Ls.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/jnaSD/4/' // Puedes cambiarlo por la URL de la fuente (ej. un artículo)
      },
      'chart-5': { 
        imageUrl: 'https://i.imgur.com/MWF95Lu.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/LpQvr/1/' 
      },
      'chart-6': { 
        imageUrl: 'https://i.imgur.com/EPXxiJW.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/y4ls1/1/' 
      },
      'chart-7': { 
        imageUrl: 'https://i.imgur.com/4K22V06.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/806Hm/1/' 
      },
      'chart-8': { 
        imageUrl: 'https://i.imgur.com/qqFVopP.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/6ET8x/1/' 
      },
      'chart-9': { 
        imageUrl: 'https://i.imgur.com/wPk6guY.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/hJHRS/1/' 
      },
      'chart-10': { 
        imageUrl: 'https://i.imgur.com/VCjzjtV.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/cYNND/1/' 
      },
      'chart-11': { 
        imageUrl: 'https://i.imgur.com/dQkF8RU.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/Pf3OS/1/' 
      },
      'chart-12': { 
        imageUrl: 'https://i.imgur.com/WvcVn0h.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/nRDcF/1/' 
      },
      'chart-14': { 
        imageUrl: 'https://i.imgur.com/toq4RFC.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/03jk9/1/' 
      },
      'chart-16': { 
        imageUrl: 'https://i.imgur.com/Q7kmzLn.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/oKdia/1/' 
      },
      'chart-17': { 
        imageUrl: 'https://i.imgur.com/OQcAqpM.png', 
        linkUrl: 'https://datawrapper.dwcdn.net/bPwzX/1/' 
      },
    };

    // Iteramos sobre las entradas del objeto de mapeo
    Object.entries(iPhoneChartReplacements).forEach(([chartId, data]) => {
      const originalChart = document.getElementById(chartId);

      // Verificamos que el elemento exista y sea un iframe
      if (originalChart && originalChart.tagName === 'IFRAME') {
        
        // 1. Creamos el nuevo <a>
        const imageLink = document.createElement('a');
        imageLink.id = originalChart.id; // Mantenemos el ID original
        imageLink.href = data.linkUrl;   // Usamos la URL de enlace (al hacer clic)
        imageLink.target = '_blank';
        imageLink.rel = 'noopener noreferrer';
        
        // 2. Le asignamos 'data-image="1"' para que herede los estilos CSS
        imageLink.dataset.image = '1';
        
        // 3. Copiamos las clases de transición y opacidad del iframe
        imageLink.className = originalChart.className;

        // 4. Creamos la <img> interna
        const image = document.createElement('img');
        image.src = data.imageUrl; // Usamos la URL de la imagen estática (lo que se ve)
        image.alt = `Gráfico estático para iPhone de ${chartId}`;
        
        // 5. Las anidamos
        imageLink.appendChild(image);
        
        // 6. Reemplazamos el <iframe> por el <a> en el DOM
        originalChart.parentNode.replaceChild(imageLink, originalChart);
      }
    });
  }
  // --- FIN DE LA MODIFICACIÓN ---


  const steps = document.querySelectorAll('.step');
  
  const charts = {
    'chart-1': document.getElementById('chart-1'),
    'chart-2': document.getElementById('chart-2'),
    'chart-3': document.getElementById('chart-3'),
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

    if (frame.tagName === 'A' || !frame.src.includes('datawrapper')) {
        let newHeight = '100vh';
        if (window.innerWidth >= 768) { 
            newHeight = 'calc(100vh - 2rem)';
        }
        container.style.height = newHeight;
    }
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
