# Prueba Técnica Ingeniero Desarrollo Master [![wakatime](https://wakatime.com/badge/user/bfe2338b-3c85-4190-b6de-3a23312ee3d5/project/062958f2-47e4-49e7-bc0b-2d38046219e3.svg)](https://wakatime.com/@bfe2338b-3c85-4190-b6de-3a23312ee3d5/projects/xnpctbuizn?start=2023-03-05&end=2023-03-11)

## Requisitos


- [x] Protoc [Instalar](https://developers.google.com/protocol-buffers/docs/downloads)
- [x] Docker
- [x] Docker Compose
- [x] Nodejs
- [x] NestJS-CLI `npm i -g @nestjs/cli`
- [x] Make
- [x] Git
- [ ] Postman
- [ ] Editor de código (VSCode, Atom, Sublime, etc)
- [ ] visualizador de base de datos (DBeaver, pgAdmin, etc)

## Estructura

El sistema se construyo bajo la arquitectura de microservicios, donde cada servicio es independiente y se comunica con
los demás a través de una API REST.

Se utilizo el framework NestJS para el desarrollo de los microservicios, debido a que es un framework que permite la
construcción de aplicaciones escalables, robustas y de alto rendimiento.

Se creo tres microservicios, uno para el manejo de usuarios, otro para el manejo de publicaciones y uno para
notificaciones.

Se utilizo PostgreSQL como base de datos, debido a que es un sistema de gestión de base de datos relacional de código
abierto, que permite la administración de datos en un servidor y que por el tipo de modelo de datos como los comentarios
en estructura de arbol es mas eficiente, ademas por la integridad y seguridad al manejar gran volumen de datos.

### Sistema

#### Microservicio de usuarios

Este esta vinculado al puero 3000, y se encarga de manejar los usuarios, como registrar un usuario, iniciar sesión,
restablecer contraseña.

El codigo fuente se encuentra en la carpeta `backend/apps/accounts`

- http://localhost:3000/users
- http://localhost:3000/swagger

#### Microservicio de publicaciones

Este esta vinculado al puero 3001, y se encarga de manejar las publicaciones, como crear una publicación, listar,
administrar comentarios

El codigo fuente se encuentra en la carpeta `backend/apps/publications`

- http://localhost:3001/publications
- http://localhost:3001/comments
- http://localhost:3001/swagger

#### Aplicacion web

Esta vinculada al puerto 8080, y se encarga de mostrar la información de los usuarios, publicaciones y comentarios.

El codigo fuente se encuentra en la carpeta `frontend`

- http://localhost:8080

## Objectivos

- [x] Aplicación construida bajo Nodejs (Backend) bajo la arquitectura de microservicios
- [x] Base de datos en PostgreSQL
- [x] Arquitetura hexagonal
- [x] Aplicación web construida con ReactJS y Redux (Frontend)

## Comandos

Para inicializar el sistema se debe ejecutar los siguientes comandos:

- `make docker-up` para inicializar todos los contenedores

