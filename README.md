# 📌 Gestión de Empleados

Aplicación **Full Stack** para la gestión de empleados, que incluye:

✅ Backend con **Spring Boot**  
✅ Frontend con **React (Vite)**  
✅ Base de datos **MySQL**  
✅ Seguridad con **Spring Security + JWT/BCrypt**  
✅ Arquitectura modular (controller, service, repository, dto, etc.)

Este proyecto está pensado como un ejemplo realista de un sistema empresarial de **Recursos Humanos**:

- Alta, modificación y deshabilitación de empleados.  
- Gestión de departamentos.  
- Login seguro de administradores.  
- Reportes de empleados filtrados por fechas (ingreso/salida).  

---

## 🚀 Tecnologías utilizadas

### 🔹 Backend
- Spring Boot 3.x  
- Spring Data JPA + Hibernate  
- Spring Web (REST API)  
- Spring Security (con BCrypt para contraseñas)  
- MySQL Connector  
- Lombok  

### 🔹 Frontend
- React 18 + Vite  
- React Router DOM  
- Axios (para consumir la API)  
- TailwindCSS (opcional Bootstrap para estilos)  

### 🔹 Base de datos
- MySQL 8.x  

---

## ⚙️ Requisitos previos
- Java 17+  
- Maven 3+  
- Node.js 18+  
- MySQL Server  

---

## 🗂️ Estructura del proyecto

### 📂 Backend
```
backend/
└── src/main/java/com/tuecommerce/backend
├── config/ → SecurityConfig, DBConfig
├── controller/ → EmpleadoController, AuthController
├── dto/ → EmpleadoDTO, LoginDTO, etc.
├── exception/ → CustomExceptions, GlobalExceptionHandler
├── model/ → Usuario, Empleado, Departamento, Reporte
├── repository/ → UsuarioRepository, EmpleadoRepository
├── service/ → EmpleadoService, UsuarioService
└── BackendApplication.java
```
### 📂 Frontend
```
frontend/
└── src/
├── components/
│ ├── empleados/
│ │ ├── EmpleadoList.jsx
│ │ ├── EmpleadoForm.jsx
│ │ └── EmpleadoDetails.jsx
│ ├── departamentos/
│ │ ├── DepartamentoList.jsx
│ │ ├── DepartamentoForm.jsx
│ │ └── DepartamentoDetails.jsx
│ ├── layout/
│ │ ├── Navbar.jsx
│ │ └── Sidebar.jsx
│ └── ui/
│ ├── Button.jsx
│ ├── Modal.jsx
│ └── Input.jsx
│
├── pages/
│ ├── Dashboard.jsx
│ ├── Login.jsx
│ └── Reportes.jsx
│
├── services/
│ ├── empleadoService.js
│ ├── departamentoService.js
│ └── authService.js
│
├── context/
│ └── AuthContext.jsx
│
├── styles/
│ └── global.css
│
├── App.js
└── index.js
```

---

## 🗄️ Base de Datos (MySQL)

```sql
-- TABLA USUARIOS (Login)
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hasheado con BCrypt
    rol ENUM('ADMIN', 'USER') DEFAULT 'USER',
    estado BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA DEPARTAMENTOS
CREATE TABLE departamentos (
    id_departamento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- TABLA EMPLEADOS
CREATE TABLE empleados (
    id_empleado INT AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    dni VARCHAR(15) NOT NULL UNIQUE,
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE,
    direccion VARCHAR(255),
    fecha_ingreso DATE NOT NULL,
    fecha_salida DATE,
    estado ENUM('ACTIVO','INACTIVO') DEFAULT 'ACTIVO',
    id_departamento INT,
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
);

-- TABLA REPORTES
CREATE TABLE reportes (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_empleado INT,
    id_usuario INT,
    tipo_reporte VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);
```

📊 Funcionalidades

🔑 Login seguro para administradores.

👤 Gestión de empleados (alta, edición, deshabilitar).

🏢 Gestión de departamentos.

📈 Reportes por fecha de ingreso/salida y estado.

🎨 Interfaz amigable con React + TailwindCSS.

🚀 Cómo ejecutar
Backend
```
cd backend
mvn spring-boot:run
```
Frontend
```
cd frontend
npm install
npm run dev
```
