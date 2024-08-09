const puppeteer = require('puppeteer');

describe('Ghibli API Tests', () => {
  let browser;
  let page;
  let movies=[]

  const fetchData = async()=>{
    const response = await fetch('https://ghibliapi.vercel.app/films/d868e6ec-c44a-405b-8fa6-f7f0f8cfb500');
    movies = await response.json(); // Depurar la cantidad de películas
  }

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('http://localhost:5173/detail/d868e6ec-c44a-405b-8fa6-f7f0f8cfb500'); // Asegurarse de que la aplicación esté corriendo en este puerto
    await page.waitForSelector('.container-detalle'); 
    await fetchData();
  });

  afterAll(async () => {
    await browser.close();
  });
// CP5 - Validación de la información detallada de la pelicula seleccionada.  

//Título
  test('Validar el título', async () => {
    const title = movies.title;

    const movieTitle = await page.evaluate(() => {
      return document.querySelector('.detalle-texto p').innerText.split(':')[1].trim();
    });
    expect(movieTitle).toEqual(title)
  });
  

//Título original
  test('Validar el título original', async () => {
    // Ejecutar fetch en el contexto de la página
    const original_title = movies.original_title;

    const movieTitle = await page.evaluate(() => {
      return document.querySelectorAll('.detalle-texto p')[1].innerText.split(':')[1].trim();
    });

    expect(movieTitle).toEqual(original_title)
  });


//Director
test('Validar director', async () => {
  // Ejecutar fetch en el contexto de la página
  const director = movies.director;

  const movieTitle = await page.evaluate(() => {
    return document.querySelectorAll('.detalle-texto p')[2].innerText.split(':')[1].trim();
  });

  expect(movieTitle).toEqual(director)
});


//Productor
test('Validar productor', async () => {
  // Ejecutar fetch en el contexto de la página
  const producer = movies.producer;

  const movieTitle = await page.evaluate(() => {
    return document.querySelectorAll('.detalle-texto p')[3].innerText.split(':')[1].trim();
  });

  expect(movieTitle).toEqual(producer)
});

//Año
test('Validar año', async () => {
  const release_date = movies.release_date;

  const movieTitle = await page.evaluate(() => {
    return document.querySelectorAll('.detalle-texto p')[4].innerText.split(':')[1].trim();
  });
  expect(movieTitle).toEqual(release_date)
});


//Duración
test('Validar duración', async () => {
  const running_time = movies.running_time;

  const movieTitle = await page.evaluate(() => {
    return document.querySelectorAll('.detalle-texto p')[5].innerText.split(':')[1].trim();
  });
  expect(movieTitle).toEqual(running_time)
});

//Descripción
test('Validar descripción', async () => {
  const description = movies.description;

  const movieTitle = await page.evaluate(() => {
    return document.querySelectorAll('.detalle-texto p')[6].innerText.split(':')[1].trim();
  });
  expect(movieTitle).toEqual(description)
});

});