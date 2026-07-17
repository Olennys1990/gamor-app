# Gamor – Plataforma de Streaming de Juegos

Gamor es una aplicación web desarrollada con React que simula una plataforma de streaming y organización de partidas para jugadores. Permite explorar equipos, partidas y streams, con autenticación simulada y cambio de tema oscuro/claro.

Este proyecto fue desarrollado como prueba técnica para un puesto de desarrollador frontend, cumpliendo con los requisitos de maquetación, funcionalidad y buenas prácticas.

## Tecnologías utilizadas

- React: con Hooks: useState, useMemo, useEffect, useContext
- React Router: para navegación entre páginas
- CSS puro: sin librerías UI, cumpliendo con el enunciado de la prueba técnica
- Vite: como empaquetador y entorno de desarrollo
- Context API: para gestión de estado global (autenticación y tema)
- Datos estáticos: sin API externa, simulando contenido real

## Instalación y ejecución

Sigue estos pasos para ejecutar la aplicación en tu entorno local:

Clonar el repositorio:
```bash
git clone https://github.com/Olennys1990/gamor-app.git
cd gamor-app
npm install
npm run dev
npm run build
```
## Funcionalidades principales

    Autenticación simulada: inicia sesión con cualquier nombre de usuario y contraseña y navega como usuario logueado. La sesión persiste en localStorage.

    Búsqueda de juegos: filtra por categorías (Party, Matches, Streams) y busca por nombre de juego.

    Etiquetas rápidas: haz clic en los juegos disponibles (COD Warzone, Fortnite, GTA V, League of Legends, Valorant) para filtrar al instante.

    Panel central dinámico: al seleccionar un resultado de la búsqueda, se actualiza la información del juego, su imagen y los avatares de los participantes.

    Unirse a partidas: si estás logueado, haz clic en el botón + en cualquier resultado para añadirte al equipo o partida.

    Cambio de tema: alterna entre modo oscuro y claro con un toggle en el navbar. La preferencia se guarda en localStorage.

    Datos estáticos: la aplicación utiliza datos simulados (equipos, partidas, streams y categorías) para demostrar funcionalidad sin necesidad de una API real.

    Responsive: Adaptado a móvil, tablet y escritorio con CSS flexible y media queries.

## Estructura de la aplicación

    src/
    ├── assets/ # Imágenes de los juegos (5 archivos .jpg)
    ├── components/ # Componentes reutilizables
    │ ├── Navbar.jsx # Barra de navegación con autenticación y toggle de tema
    │ ├── Navbar.css
    │ ├── ThemeToggle.jsx # Botón de cambio de tema
    │ ├── ThemeToggle.css
    │ ├── PlaceholderPage.jsx # Página genérica para secciones en construcción
    │ └── PlaceholderPage.css
    ├── context/ # Contextos globales
    │ ├── auth/ # Autenticación (AuthContext, AuthProvider)
    │ └── theme/ # Tema (ThemeContext, ThemeProvider)
    ├── data/ # Datos estáticos simulados
    │ ├── games.js # Equipos, partidas, streams y juegos disponibles
    │ └── categories.js # Categorías de la sección "Trending"
    ├── hooks/ # Hooks personalizados
    │ ├── useAuth.js # Acceso al contexto de autenticación
    │ └── useTheme.js # Acceso al contexto de tema
    ├── layouts/ # Layout principal con navegación
    │ ├── Layout.jsx # Contiene Navbar + Outlet de React Router
    │ └── Layout.css
    ├── pages/ # Páginas de la aplicación
    │ ├── Home.jsx # Página principal (Main Board + búsqueda + categorías)
    │ ├── Home.css
    │ ├── Login.jsx # Página de inicio de sesión (diseño propio)
    │ ├── Login.css
    │ ├── Register.jsx # Página de registro (placeholder)
    │ ├── Party.jsx # Página de Party (placeholder)
    │ ├── Premium.jsx # Página de Premium (placeholder)
    │ └── Stream.jsx # Página de Streams (placeholder)
    ├── styles/ # Estilos globales y temas
    │ ├── global.css # Reset, fuentes y estilos base
    │ ├── responsive.css # Media queries para adaptación a dispositivos
    │ └── themes.css # Variables CSS para modo oscuro y claro
    ├── App.jsx # Configuración de rutas y providers
    └── main.jsx # Punto de entrada de la aplicación


## Decisiones técnicas

    CSS sin frameworks: se utilizó CSS puro con variables CSS para cumplir con el requisito de no usar librerías UI. Esto permite un control total sobre el diseño y la coherencia visual.

    Temas oscuro/claro: implementados con data-theme en el body y variables CSS. La preferencia del usuario se guarda en localStorage.

    Autenticación simulada: se utilizó localStorage para persistir la sesión. Es suficiente para el alcance de la prueba y permite probar todas las funcionalidades sin necesidad de una base de datos.

    Datos estáticos: todos los datos (equipos, partidas, streams, categorías) están definidos en archivos .js dentro de src/data/. Esto permite una experiencia completa sin depender de una API externa, cumpliendo con el enunciado.

    Responsive: el diseño se adapta con clamp(), vw/vh y media queries para garantizar una buena experiencia en diferentes dispositivos.

    Estructura modular: separación clara de responsabilidades (componentes, páginas, contextos, hooks, datos) siguiendo las mejores prácticas de React.

## Autor: 
    Olennys Carcasés Durán
    Prueba técnica para proceso de reclutamiento – Desarrollo Frontend con React.

## Licencia: 
    este proyecto es de uso exclusivo para fines de evaluación y demostración técnica. No está autorizado su uso comercial sin permiso explícito del autor.