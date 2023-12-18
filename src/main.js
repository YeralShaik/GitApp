



async function fetchGiphyData() {
    const url = 'https://api.giphy.com/v1/gifs/trending?api_key=Qug3JB0t3KgWNGCEDnYRN46dUxHAlL0e&limit=25&offset=0&rating=g&bundle=messaging_non_clips';
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error en la solicitud. Estado: ' + response.status);
      }
  
      const data = await response.json();
      // Manejar la respuesta exitosa
      console.log(data);
  
      const gifContainer = document.getElementById('gifContainer');
      const subTitle = document.getElementById('header-Sub');
    
      
      // Limpiar el contenedor antes de agregar nuevas imágenes
      gifContainer.innerHTML = '';
  
      // Crear elementos de imagen y agregarlos al contenedor
      data.data.forEach(gif => {
        const gifImg = document.createElement('img');
        gifImg.src = gif.images.original.url;
        gifContainer.appendChild(gifImg);
      });
  
    } catch (error) {
      // Manejar errores de red o del servidor
      console.error('Error: ', error);
    }
  }
  
  // Llamar a la función
  fetchGiphyData();
  
  
let tiempoEspera;
const tiempoEsperaDelay = 300;

function realizarBusqueda() {
    clearTimeout(tiempoEspera);

    // Obtener el valor de búsqueda
    const searchTerm = document.getElementById('search-Gif').value;
    const searchBtn = document.getElementById('btn')
    
    searchBtn.addEventListener('click', () => {
      realizarBusqueda()
    })

    // Verificar si hay al menos 2 caracteres
    if (searchTerm.length >= 2) {
        tiempoEspera = setTimeout(function () {
            // Realizar la búsqueda utilizando la API de Giphy
            const apiKey = 'Qug3JB0t3KgWNGCEDnYRN46dUxHAlL0e';
            const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
            

            fetch(endpoint)
                .then(response => response.json())
                .then(data => mostrarResultados(data.data))
                .catch(error => console.error('Error:', error));
        }, tiempoEsperaDelay);
    } else {
        limpiarResultados();
    }
}
function mostrarResultados(resultados) {
  const resultadoDiv = document.getElementById('resultadoBusqueda');

  // Verificar si el elemento existe antes de intentar acceder a sus propiedades
  if (resultadoDiv) {
      resultadoDiv.innerHTML = '';
      
      if (resultados.length === 0) {
          resultadoDiv.innerHTML = 'No se encontraron resultados 😢';
          resultadoDiv.style.color = '#ffff';
          resultadoDiv.style.alignContent = 'center';
          resultadoDiv.style.fontSize = '48px';
          resultadoDiv.style.marginTop = '50px';
          resultadoDiv.style.display = 'flex';
          return;
      }

      resultados.forEach(resultado => {
          const gifUrl = resultado.images.fixed_height.url;
          const img = document.createElement('img');
          img.src = gifUrl;
          resultadoDiv.appendChild(img);
      });
  } else {
      console.error('Elemento #resultadoBusqueda no encontrado.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let tiempoEspera;
  const tiempoEsperaDelay = 300;

  async function fetchGiphyData() {
      const url = 'https://api.giphy.com/v1/gifs/trending?api_key=Qug3JB0t3KgWNGCEDnYRN46dUxHAlL0e&limit=25&offset=0&rating=g&bundle=messaging_non_clips';

      try {
          const response = await fetch(url);

          if (!response.ok) {
              throw new Error('Error en la solicitud. Estado: ' + response.status);
          }

          const data = await response.json();

          const gifContainer = document.getElementById('gifContainer');
          gifContainer.innerHTML = '';

          data.data.forEach(gif => {
              const gifImg = document.createElement('img');
              gifImg.src = gif.images.original.url;
              gifContainer.appendChild(gifImg);
          });
      } catch (error) {
          console.error('Error: ', error);
      }
  }

  function realizarBusqueda() {
      clearTimeout(tiempoEspera);
      const searchTerm = document.getElementById('search-Gif').value;

      if (searchTerm.length >= 2) {
          tiempoEspera = setTimeout(function () {
              const apiKey = 'Qug3JB0t3KgWNGCEDnYRN46dUxHAlL0e';
              const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

              fetch(endpoint)
                  .then(response => response.json())
                  .then(data => mostrarResultados(data.data))
                  .catch(error => console.error('Error:', error));
          }, tiempoEsperaDelay);
      } else {
          limpiarResultados();
      }
  }

  function mostrarResultados(resultados) {
      const resultadoDiv = document.getElementById('resultadoBusqueda');
    

      if (resultadoDiv) {
          resultadoDiv.innerHTML = '';

          if (resultados.length === 0) {
              resultadoDiv.innerHTML = 'No se encontraron resultados 😢';
              resultadoDiv.style.color = '#ffff';
              resultadoDiv.style.alignContent = 'center';
              resultadoDiv.style.fontSize = '48px';
              resultadoDiv.style.marginTop = '50px';
           
              return;
              
            

          }

          resultados.forEach(resultado => {
              const gifUrl = resultado.images.fixed_height.url;
              const img = document.createElement('img');
              img.src = gifUrl;
              resultadoDiv.appendChild(img);
          });
      } else {
          console.error('Elemento #resultadoBusqueda no encontrado.');
      }
  }

  function limpiarResultados() {
      const resultadoDiv = document.getElementById('resultadoBusqueda');

      if (resultadoDiv) {
          resultadoDiv.innerHTML = '';
      }
  }

  // Llamar a la función fetchGiphyData
  fetchGiphyData();

  // Agregar evento oninput al input de búsqueda
  document.getElementById('search-Gif').addEventListener('input', realizarBusqueda);
  // Agregar evento click al botón de búsqueda
document.getElementById('searchBtn').addEventListener('click', realizarBusqueda);

});
