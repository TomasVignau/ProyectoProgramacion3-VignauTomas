Proyecto Programación 3 – Vignau Tomás

Aplicación web desarrollada con React, TypeScript y Vite, para Programación 3.


Requisitos

Asegúrate de tener instaladas las siguientes herramientas:

Node.js ≥ 18

npm ≥ 9

(Opcional) Yarn o PNPM

Navegador moderno (Chrome, Firefox, Edge…)

Instalación

Cloná el repositorio y luego instalá las dependencias:

git clone <URL_DEL_REPOSITORIO>
cd ProyectoProgramacion3-VignauTomas
npm install

Configuración del Entorno

El proyecto incluye un archivo:

.env.example


Este archivo contiene las claves necesarias para que la aplicación funcione.

Debés copiarlo y renombrarlo a .env:
cp .env.example .env

Luego editá su contenido y dejalo así:
VITE_API_URL=http://localhost:4000
VITE_APP_NAME=ProyectoProgramacion3

🗄️ Migraciones de Base de Datos

Podés ejecutarlas con:

npm run migrate up

Las migraciones dependen de la API/back-end.
Asegurate de tener la base de datos y el servidor configurados.

Ejecutar el Proyecto

Para levantar el servidor de desarrollo:

npm run dev


Luego abrí tu navegador en:

http://localhost:5173


(El puerto puede variar según Vite.)