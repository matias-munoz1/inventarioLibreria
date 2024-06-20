

# Backend Project

## Descripción

Este proyecto es un backend para la gestión de tareas. Incluye endpoints para crear, leer, actualizar y eliminar tareas (CRUD). El proyecto está configurado con ESLint, Prettier, Husky, y pruebas unitarias con Jest.

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Mysql

## Instalación

1. Clona el repositorio:

```
git clone https://github.com/matias-munoz1/backend.git
```
2. Navega a la carpeta del proyecto:
```
cd backend
```

3. Instala las dependencias
```
npm install
```
## Instalación de MySQL

Para que este proyecto funcione correctamente, necesitas tener MySQL instalado en tu sistema.

Archivo .env en repositorio tiene la configuracion correcta 
```
DB_HOST=localhost
DB_USER=todo_user
DB_PASS=secure_password
DB_NAME=project_database
DB_DIALECT=mysql
```
>**La configuracion de la base de datos es la siguiente:**

- Inicia sesión en MySQL como usuario root en la terminal:
```
mysql -u root -p
```
- Crea la base de datos y el usuario ya generado en el .env:
```
CREATE DATABASE project_database;
CREATE USER 'todo_user'@'localhost' IDENTIFIED BY 'secure_password';
GRANT ALL PRIVILEGES ON project_database.* TO 'todo_user'@'localhost';
FLUSH PRIVILEGES;
```
4. Por ultimo se inicia el servidor :
```
npm start
```
## Pruebas
**Ejecución de Pruebas Unitarias**
Las pruebas unitarias se han implementado utilizando Jest. Para ejecutar las pruebas, usa el siguiente comando:
```
npm test
```

**Descripción de las Pruebas Unitarias:**
Se han implementado pruebas unitarias para las siguientes funcionalidades:

- **createTask:**
Verifica que se crea una nueva tarea correctamente.
Maneja errores de creación de tareas.

- **updateTask:**
Verifica que se actualiza una tarea existente correctamente.
Maneja el caso en que la tarea no se encuentra.
Maneja errores durante la actualización de tareas.

**Cobertura de las Pruebas**
Se ha utilizado Jest para asegurar una alta cobertura de código en las pruebas unitarias. Los resultados de la cobertura se pueden visualizar al ejecutar el comando de pruebas.

## Estructura del Proyecto
- controllers/: Contiene los controladores de las rutas.
- models/: Contiene los modelos de la base de datos.
- routes/: Contiene las rutas de la API.
- middlewares/: Contiene los middlewares de la aplicación.
- config/: Contiene la configuración de la base de datos.
- __tests__/: Contiene las pruebas unitarias.

## Contribuciones
Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio.

## Autor 
Matias Muñoz Programador
