# Taller de Aplicaciones Móviles - Proyecto Final

Este repositorio contiene una aplicación móvil desarrollada con React Native y Expo, que integra un catálogo de contenidos audiovisuales y un juego de "Ahorcado" con funcionalidades en tiempo real.

## Características Principales

- **Catálogo de Contenidos**: Listado de series, películas y anime con detalles dinámicos.
- **Sistema de Autenticación**: Gestión de usuarios mediante Supabase Auth.
- **Juego del Ahorcado**: Desafío interactivo con búsqueda por letra o título completo.
- **Dificultad Visual**: Implementación de desenfoque dinámico y overlays retro para aumentar la dificultad del juego.
- **Leaderboard en Tiempo Real**: Tabla de puntuaciones que se actualiza automáticamente mediante Supabase Real-time.
- **Modo Offline/Resiliencia**: Sistema de fallback a datos locales en caso de fallos en la conexión con la base de datos externa.

## Tecnologías Utilizadas

- **Frontend**: React Native, Expo, TypeScript.
- **Estilos**: Vanilla CSS (StyleSheet) con temática Retro Arcade centralizada.
- **Base de Datos y Auth**: Supabase.
- **Navegación**: Expo Router.

## Instrucciones para Puesta en Marcha

Para ejecutar este proyecto localmente, siga estos pasos:

### 1. Requisitos Previos

- Tener instalado [Node.js](https://nodejs.org/).
- Tener instalado el CLI de Expo: `npm install -g expo-cli`.
- Una cuenta en [Supabase](https://supabase.com/).

### 2. Clonar y Configurar Dependencias

```bash
git clone [URL_DEL_REPOSITORIO]
cd my-app
npm install
```

### 3. Configuración de Variables de Entorno

Cree un archivo `.env` en la raíz del proyecto basándose en `.env.sample`. Deberá completar las siguientes claves obtenidas desde su proyecto en Supabase (Settings > API):

```env
EXPO_PUBLIC_SUPABASE_URL=TU_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_KEY=TU_SUPABASE_KEY
```

### 4. Configuración de la Base de Datos

En el panel **SQL Editor** de Supabase, ejecute el contenido del archivo `my-app/supabase_setup.sql`. Este script automatiza la creación de todas las tablas necesarias (`tipos`, `generos`, `contenidos`, `contenido_generos`, `puntuaciones_ahorcado`), las políticas de seguridad (RLS), la configuración de tiempo real y la carga de datos iniciales.

Asegúrese de ejecutar el script completo para garantizar que la aplicación funcione correctamente desde el primer inicio.

### 5. Ejecución

Para iniciar el servidor de desarrollo:

```bash
npx expo start
```
