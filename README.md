EventFlow

EventFlow es una aplicación web desarrollada con React que permite la gestión y reserva de eventos mediante un sistema de autenticación con control de roles (usuario y administrador).

El proyecto aplica los conceptos fundamentales trabajados durante el curso: uso de rutas en React, consumo de API REST, control de acceso por roles, diseño responsive y organización profesional del código.

La aplicación utiliza una API simulada con JSON Server y está desplegada en GitHub Pages.

Descripción del proyecto

EventFlow permite a los usuarios registrarse, iniciar sesión y reservar eventos disponibles. Cada reserva reduce automáticamente la capacidad del evento y el sistema impide que un mismo usuario reserve el mismo evento más de una vez.

El administrador dispone de un panel independiente desde el cual puede crear, editar y eliminar eventos, además de visualizar estadísticas mediante gráficos.

El proyecto está organizado siguiendo una estructura modular, separando claramente:

 - Componentes reutilizables

 - Páginas principales

 - Servicios de acceso a la API

 - Contexto global de autenticación

 - Rutas protegidas

Funcionalidades: 

 - Usuario

 - Registro de cuenta

 - Inicio de sesión

 - Visualización de eventos disponibles

 - Reserva de eventos

 - Prevención de reservas duplicadas

 - Cancelación de reservas

 - Actualización automática de capacidad

 - Panel personal con listado de reservas activas

Administrador: 

 - Crear eventos

 - Editar eventos

 - Eliminar eventos

 - Visualización de estadísticas mediante gráfico de capacidades

Tecnologías utilizadas

Framework principal:

 - React 19

 - Vite 7

Librerías utilizadas: 

 - react-router-dom 7 – Gestión de rutas

 - react-hook-form 7 – Gestión y validación de formularios

 - sweetalert2 – Alertas y notificaciones

 - chart.js y react-chartjs-2 – Visualización de datos

 - bootstrap 5 – Diseño responsive

 - json-server – Simulación de API REST

Requisitos del ejercicio cumplidos:

 - Uso de rutas en React

 - Consumo de API con métodos GET, POST, PUT y DELETE

 - Implementación de login con control de roles (usuario y administrador)

 - Diseño responsive adaptado a diferentes tamaños de pantalla

 - Uso de más de tres librerías externas

 - Estructura profesional separando responsabilidades

 - Repositorio público con historial de commits

 - Despliegue en servicio de hosting gratuito

 Instalación y ejecución

 - Clonar el repositorio: git clone https://github.com/MarioJoyfe/ProyectoSegundoTrimestreAndres.git

 - Acceder al proyecto: cd ProyectoSegundoTrimestreAndres

 - Instalar dependencias: npm install

 - Iniciar la API simulada: npm run server

 - Iniciar la aplicación: npm run dev


Usuarios de prueba

Administrador

 - Email: admin@eventflow.com

 - Contraseña: 1234

Usuario

 - Email: user@eventflow.com

 - Contraseña: 1234

Estructura del proyecto: 

 src/
 ├── components/
 ├── pages/
 ├── services/
 ├── context/
 ├── routes/