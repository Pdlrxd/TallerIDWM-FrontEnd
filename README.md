# Taller 2: E-Commerce

El siguiente código corresponde al taller número 2 el cual busca implementar un Front-End el cual cumpla la función de un comercio digital

integrates:
- Pedro Soto Ticona 24.161.653-3
pedro.soto02@alumnos.ucn.cl

## Requerimientos

- Node.js (versión 18 o superior recomendada)
- npm (viene con Node.js) o yarn como gestor de paquetes
- Next.js (viene en las dependencias, solo debes instalar con npm/yarn)
- Un archivo .env configurado para las variables de entorno necesarias (puedes usar .env.example como plantilla)
- Tener acceso al backend funcionando

## Clonar Repositorio

Clona el repositorio **Front-End** con el siguiente comando:
```bash
git clone https://github.com/Pdlrxd/TallerIDWM-FrontEnd.git
```

Clona el repositorio **Back-End** con el siguiente comando:
```bash
git clone https://github.com/Pdlrxd/TallerIDWM.git
```
- Advertencia:
	- Revisa el documento README.md Para levantar correctamente el Back-End


## Configurar el Proyecto

Después de clonar el repositorio, navega a la carpeta del proyecto:

```bash
cd TallerIDWM-FrontEnd/
```
Despues de acceder al directorio, instalamos **npm** con el siguiente comando:

```bash
npm install
```

Crea el archivo `.env` en la raiz del proyect para configurar la conexión a el Back-End, ingresamos lo que tiene `.env.example` en .env e ingresamos nuestros respectivos direcciones para el Back-End
```bash
NEXT_PUBLIC_API_URL=URL-API
DOMAIN=localhost
```
Donde URL-API es la direccion de la API

Direccion de la api:
```bash
https://localhost:7194/api/
```

## Ejecución del proyecto

Para la correcta ejecución del proyecto debemos ejecutar el siguiente comando:

```bash
npm run dev
```

Este se ejecutará en la siguiente url: http://localhost:3000