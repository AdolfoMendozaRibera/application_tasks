📝 Task Manager Multilenguaje

Aplicación web para gestionar tareas de forma sencilla, con soporte para múltiples idiomas y almacenamiento local.
Desarrollada con React + TypeScript + Vite y CSS nativo.

🚀 Características principales

✅ Crear, editar y eliminar tareas fácilmente.

⏰ Fechas de vencimiento opcionales y detección automática de tareas vencidas.

🎯 Indicadores de progreso y estadísticas generales.

🔍 Filtros por estado, prioridad y categoría.

💾 Persistencia local (usa localStorage para guardar tus tareas).

🌍 Multilenguaje: Español, Inglés, Alemán, Francés, Portugués, Ruso y Chino.

🎨 Diseño limpio y adaptable con CSS nativo.

🧠 Tecnologías utilizadas

⚛️ React 18

🟦 TypeScript

⚡ Vite

🌐 i18next + react-i18next (para traducciones)

💽 LocalStorage (persistencia de datos)

🎨 CSS nativo

📦 Instalación y uso

Clona este repositorio

git clone https://github.com/tuusuario/task-manager-i18n.git
cd task-manager-i18n


Instala las dependencias

npm install


Ejecuta el entorno de desarrollo

npm run dev


Abre la aplicación

Abre tu navegador y visita:
👉 http://localhost:5173

🌍 Idiomas disponibles
Código	Idioma
es	Español 🇪🇸
en	English 🇬🇧
de	Deutsch 🇩🇪
fr	Français 🇫🇷
pt	Português 🇧🇷
ru	Русский 🇷🇺
zh	中文 🇨🇳

El idioma se detecta automáticamente según la configuración del navegador,
y también se puede cambiar manualmente desde el selector de idioma.

🧩 Estructura del proyecto
src/
├── components/
│   ├── ListaDeTareas.tsx
│   ├── Tarea.tsx
│   ├── TareaFormulario.tsx
│   ├── Filtros.tsx
│   ├── Estadisticas.tsx
│
├── locals/
│   ├── en/translation.json
│   ├── es/translation.json
│   ├── de/translation.json
│   ├── fr/translation.json
│   ├── pt/translation.json
│   ├── ru/translation.json
│   ├── zh/translation.json
│
├── i18n.ts
├── App.tsx
├── main.tsx
├── App.css
└── types.ts

📸 Capturas (opcional)

(Agrega imágenes aquí de tu interfaz, por ejemplo con tareas creadas, selector de idioma o estadísticas.)

🔧 Mejoras futuras

 Integración con base de datos (Firebase o MongoDB).

 Tema oscuro / claro.

 Recordatorios con notificaciones.

 Sincronización en la nube.
