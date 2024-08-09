const puppeteer = require('puppeteer');

describe('Ghibli API Tests', () => {
  let browser;
  let page;

  let movies=[]

  const fetchData = async()=>{
    const response = await fetch('https://ghibliapi.vercel.app/films');
    movies = await response.json(); // Depurar la cantidad de películas
  }

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/allfilms'); // Asegurarse de que la aplicación esté corriendo en este puerto
    await page.waitForSelector('.card-info'); 
    await fetchData();
    // Redirigir logs del navegador a la consola de Node.js
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  });

  afterAll(async () => {
    await browser.close();
  });


// #CP2 - Validación del número de películas que debe cargar en Allfilms.  
  test('Validar número de películas', async () => {

    const movieTitles = await page.evaluate(() => {
      return document.querySelectorAll('.card-info h2').length;
      
    });
    expect(movies.length).toBe(movieTitles)
  });

  //CP3 - Validación de las películas que debe cargar en Allfilms.
  //aquí comparamos todas las pelis de la API contra todas las pelis de la página
  test('should display a list of movies', async () => {

    const movieTitlesApi= movies.map(value=>value.title)
    expect(movies).toBeDefined();
    expect(movies.length).toBeGreaterThan(0);
    
    // Comprueba que los títulos de las películas están en la página
    const movieTitles = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('.card-info h2')).map(el => {
          const textContent = el.innerText;
          const firstBrIndex = textContent.indexOf('\n');
          const title = firstBrIndex !== -1 ? textContent.substring(0, firstBrIndex).trim() : textContent.trim();
          return title;
        });
    });
    expect(movieTitlesApi).toEqual(movieTitles);
  });

  //CP4 - Validación de resultados coincidentes con la búsqueda.
  test('should filter movies based on search input', async () => {
    await page.type('.buscar', 'castle');

    const movieTitles = await page.evaluate(() => 
      Array.from(document.querySelectorAll('.card-info h2')).map(el => el.textContent)
    );
    movieTitles.forEach((title)=>{
      expect(title.toLowerCase()).toContain('castle');
    })
    
  }); 


});
