# Obligatorio Final -  Grupo 03

Repositorio del prototipo de sistema de votación electrónica desarrollado por el Grupo 03 para la materia Bases de Datos II.

## 📝 Descripción

Este proyecto incluye:

* **Base de datos PostgreSQL** con el modelo entidad‑relación implementado.
* **Backend** (Node.js/Express) para exponer API REST sobre la base de datos.
* **Frontend** en Angular como interfaz de usuario para registro, votación y consulta de resultados.
* Todas las piezas orquestadas con **Docker** y **Docker Compose** para facilitar la instalación y despliegue.

---

## Requisitos previos

1. **Docker**

   * Instala Docker siguiendo la guía oficial para tu sistema operativo:
     [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

2. **Docker Compose**

   * Usualmente ya viene incluido con Docker Desktop. Si no, instálalo desde:
     [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

3. **Git**

   * Para clonar el repositorio:
     [https://git-scm.com/downloads](https://git-scm.com/downloads)

---

## Instalación y puesta en marcha

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/emi2k3/BDTFUGrupo4.git
   cd BDTFUGrupo4
   ```

2. **Configurar variables de entorno**

   Dentro de la carpeta raíz encontrarás un archivo de ejemplo `.env.example`. Cópialo a `.env` y ajusta las credenciales si lo deseas:

   ```bash
   cp .env.example .env
   # Luego edita .env con tu editor preferido
   ```

3. **Construir y levantar todos los servicios**

   En la raíz del proyecto está el archivo `docker-compose.yml` que describe los servicios:

   * **db**: contenedor de PostgreSQL con el esquema y datos de ejemplo.
   * **backend**: aplicación de servidor que expone la API REST.
   * **frontend**: aplicación Angular que consume la API.

   Para arrancar todo, ejecuta:

   ```bash
   docker-compose up --build -d
   ```

   Esto descargará las imágenes necesarias, construirá las que se definan localmente y levantará los contenedores en segundo plano.

4. **Verificar que los servicios estén en marcha**

   ```bash
   docker-compose ps
   ```

   Deberías ver al menos tres contenedores con estado `Up`.

---

## 🌐 Acceso a la aplicación

* **Frontend (Angular)**
  Abre tu navegador en:

  ```
  http://localhost:4200
  ```

* **API REST (Backend)**
  Punto base de la API en:

  ```
  http://localhost:3000/api
  ```

  Puedes probar endpoints con `curl`, Postman o tu cliente favorito.

* **Base de datos (PostgreSQL)**
  Conéctate en:

  * Host: `localhost`
  * Puerto: el que definas en `.env` (por defecto `5432`)
  * Usuario / Contraseña según `.env`
  * Base de datos: el nombre configurado en `.env`

---

## 🛠 Comandos útiles

* **Ver logs de un servicio en concreto**

  ```bash
  docker-compose logs -f backend
  ```

* **Detener y borrar contenedores**

  ```bash
  docker-compose down
  ```

* **Reconstruir una sola imagen**

  ```bash
  docker-compose build frontend
  ```

* **Ejecutar una migración o script SQL**

  ```bash
  docker-compose exec db psql -U $DB_USER -d $DB_NAME -f /sql/migrations/001_init.sql
  ```
