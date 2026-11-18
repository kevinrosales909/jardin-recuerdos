# 🌸 El Jardín de los Recuerdos

Aplicación web interactiva desarrollada bajo el patrón de arquitectura **MVC (Modelo-Vista-Controlador)** que permite a los usuarios "plantar" recuerdos digitales, filtrarlos por emoción y gestionarlos mediante una base de datos **SQLite** ejecutada directamente en el navegador.

## 🚀 Tecnologías Utilizadas
* **TypeScript:** Lógica tipada y modular.
* **Vite:** Entorno de desarrollo ultrarrápido y empaquetador.
* **SQL.js:** SQLite compilado a WebAssembly para ejecutar consultas SQL reales en el navegador del cliente.
* **HTML5 & CSS3:** Estructura semántica y diseño moderno y responsivo.
* **Git & GitHub:** Control de versiones y colaboración.
* **Vercel:** Plataforma de despliegue continuo (Serverless).

## 🗄️ Funcionalidad de Base de Datos (SQLite)
El proyecto implementa una tabla relacional `recuerdos` con las siguientes operaciones CRUD:
* **CREATE:** Inserción de nuevos recuerdos con contenido, fecha, categoría y emoción.
* **READ / FILTER:** Consulta de todos los registros ordenados cronológicamente o filtrados mediante sentencias SQL preparadas (`SELECT ... WHERE emocion = ?`).
* **DELETE:** Eliminación de registros específicos por ID con persistencia automática en el almacenamiento local del navegador (`localStorage` / WebAssembly state).

## ⚙️ Cómo Ejecutar el Proyecto Localmente

Sigue estos pasos en tu terminal (Git Bash o PowerShell) dentro de tu entorno de Windows:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/kevinrosales909/jardin-recuerdos.git](https://github.com/kevinrosales909/jardin-recuerdos.git)
   cd jardin-recuerdos