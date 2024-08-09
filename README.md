# StudioGhibli

Este proyecto es una aplicación web desarrollada en VueJS que consume la API REST pública de los estudios Ghibli para mostrar sus películas.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/AndresGomezDiaz/StudioGhibli.git
   cd StudioGhibli
2. Instala las dependencias:
    ```bash
    npm install

## Ejecución en Localhost
1. Inicia el servidor de desarrollo
    ```bash
    npm run serve

2. Abre tu navegador y navega a http://localhost:5173 para ver la aplicación en funcionamiento.

## Ejecutar Tests

Los tests están hechos con Puppeteer y Jest. Para ejecutarlos, sigue estos pasos:

1. Instala Puppeteer y Jest como dependencias de desarrollo:
    ```bash
    npm install puppeteer jest --save-dev

2. Asegúrate de que el servidor de desarrollo esté corriendo y que el puerto del localhost del proyecto principal sea el mismo que el de los 3 tests que están en el repositorio.

3. Ejecuta los tests con el siguiente comando
    ```bash
    npx jest

## Mantenimiento
Para mantener la aplicación ejecutándose y poder correr los tests, asegúrate de que el servidor de desarrollo esté activo. Puedes abrir una nueva terminal y ejecutar los comandos de test mientras el servidor está en funcionamiento.