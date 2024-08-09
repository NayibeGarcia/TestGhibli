const puppeteer = require('puppeteer');

describe('Ghibli API Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:5173'); //Asegurarse de que la aplicación esté corriendo en este puerto
    await page.waitForSelector('.container');
  });

  afterAll(async () => {
    await browser.close();
  });

// #CP1 - Valida las últimas 3 películas y compara por el campo original_title_romanised
  test('should name film with original_title_romanised', async () => {
    const response = await fetch('https://ghibliapi.vercel.app/films');
    const films = await response.json();
    
    films.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    
    const latestFilms = films.slice(0, 3);
    const movieTitlesApi = latestFilms.map(value => value.original_title_romanised)

    const movieTitles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.card-info h2')).map(el => {
        const textContent = el.innerText;
        const firstBrIndex = textContent.indexOf('\n');
        const title = firstBrIndex !== -1 ? textContent.substring(0, firstBrIndex).trim() : textContent.trim();
        return title;
      });
    });
    expect(movieTitles).toEqual(movieTitlesApi);
  });


  //CP1 - Caso fallido, valida las últimas 3 películas y compara por el campo title
  test('Validar las últimas películas agregadas', async () => {
    
    const response = await fetch('https://ghibliapi.vercel.app/films');
    const films = await response.json();

    films.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    const latestFilms = films.slice(0, 3);
    const movieTitlesApi = latestFilms.map(value => value.title)

    const movieTitles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.card-info h2')).map(el => {
        const textContent = el.innerText;
        const firstBrIndex = textContent.indexOf('\n');
        const title = firstBrIndex !== -1 ? textContent.substring(0, firstBrIndex).trim() : textContent.trim();
        return title;
      });
    });
    expect(movieTitles).toEqual(movieTitlesApi);
  });


});