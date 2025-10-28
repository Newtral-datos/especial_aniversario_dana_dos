document.addEventListener('DOMContentLoaded', () => {
  
  const steps = document.querySelectorAll('.step');
  
  // Registro de los gráficos laterales (derecha)
  const sideCharts = {
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
  
  // Eliminamos el mapeo 'bottomContainers'
  
  let currentSideChartId = 'chart-1'; // El gráfico 1 es visible por defecto
  // Eliminamos 'currentVisibleBottomContainer'
  
  const observer = new IntersectionObserver(
      (entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  // El paso está entrando en la vista
                  const stepElement = entry.target;
                  stepElement.classList.add('is-active');
                  const chartId = stepElement.dataset.chartId; // ej: 'chart-3'
                  const stepIndex = stepElement.dataset.stepIndex;
                  
                  // 1. GESTIONAR GRÁFICO LATERAL (Fade)
                  if (chartId && chartId !== currentSideChartId) {
                      
                      // Ocultar el gráfico lateral antiguo
                      if (sideCharts[currentSideChartId]) {
                          sideCharts[currentSideChartId].classList.remove('opacity-100', 'z-10');
                          sideCharts[currentSideChartId].classList.add('opacity-0', 'z-0');
                      }
                      
                      // Mostrar el gráfico lateral nuevo
                      if (sideCharts[chartId]) {
                          sideCharts[chartId].classList.add('opacity-100', 'z-10');
                          sideCharts[chartId].classList.remove('opacity-0', 'z-0');
                      }
                      currentSideChartId = chartId;
                  }
                  
                  // 2. ELIMINAMOS GESTIÓN DE GRÁFICOS INFERIORES
                  
                  // 3. Enviar el mensaje 'goto-step' al gráfico lateral activo
                  const chartFrame = sideCharts[currentSideChartId];
                  if (chartId && chartFrame) {
                      console.log(`Enviando paso ${stepIndex} a gráfico ${currentSideChartId}`);
                      try {
                          chartFrame.contentWindow.postMessage({
                              'datawrapper-viewer-goto-step': stepIndex
                          }, '*');
                      } catch (e) {
                          console.warn("No se pudo enviar el mensaje a Datawrapper (puede estar cargando):", e);
                      }
                  }
              } else {
                  // El paso está saliendo de la vista
                  entry.target.classList.remove('is-active');
              }
          });
      },
      {
          // El área de activación es el 40% central de la pantalla
          threshold: 0.1,
          rootMargin: '-30% 0px -30% 0px' 
      }
  );
  // Observar todos los steps
  steps.forEach(step => {
      observer.observe(step);
  });
  
});