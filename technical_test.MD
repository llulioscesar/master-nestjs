# Prueba Técnica Ingeniero Desarrollo Master

Para el desarrollo de esta prueba usted cuenta con 48 horas.

Dentro de esta prueba usted encontrará diferentes ítems que deberá desarrollar para que la prueba
se dé por completada.

Se requiere construir una aplicación web que permita la interacción entre usuarios por medio de comentarios hacia sus publicaciones (Similar a Facebook), un usuario debe poder crear, editar y eliminar sus propias publicaciones, los demás usuarios podrán crear comentarios sobre esas publicaciones y se podrá responder sobre comentarios ya desarrollados. Se debe notificar al usuario que creó la publicación cuando alguien agregue un comentario.

Se sugiere que la aplicación esté construida bajo Nodejs (Backend) y React (Frontend).

## Requisitos

- Elaborar el diagrama de arquitectura de la aplicación.
  - Se debe construir la aplicación bajo la arquitectura de microservicios y/o aplicando
    arquitectura hexagonal.
- El sistema debe contar con un módulo de autenticación (Login, Registro, Recuperación de contraseña)
  - Autenticaciónportoken(JWT)
- Usted debe proponer el tipo de BD (SQL o NoSQL) a utilizar que permita gestionar la
  información en referencia.
  - Debe justificar el por qué la utilización de una y no la otra.
  - Debe elaborar el diagrama de base de datos correspondiente
  - Debe proponer la información que crea es necesaria para que el sistema cumpla
    con lo que se requiere
- Construya el backend teniendo en cuenta los siguientes ítems
  - Middlewares (Ej: autenticación, validación de data, etc...)
  - Framework Nestjs (Node, TS)
  - Envio de notificaciones por correo electrónico
  - Uso de ORM u ODM dependiendo el tipo de base de datos que haya elegido
  - Migraciones y/o Modelos
  - Es un plus si se implementa Docker
  - Testing
    - Unitario
    - Integración
  - Documentacion de la API
- Construya el frontend teniendo en cuenta los siguientes ítems
  - Ruteo
  - Gestor de estado global (Ej: Redux, MobX, etc...)
  - Preprocesador CSS SASS
  - Librerías UI (Ej: Material UI, Ant Design, etc...)
  - Validación de formularios
  - Testing
  - Documentación
- Debe aplicar en gran medida la filosofía de CleanCode y principios SOLID
- Se debe construir un archivo README, que contenga manual de despliegue, los scripts de creación y configuración de la base de datos, credenciales y comentarios adicionales que ayuden al despliegue del código fuente.
- Dentro del repositorio de código fuente debe implementar la estrategia de ramificación GitFlow, donde se evidencie el respectivo flujo que este maneja.

