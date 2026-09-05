// 1. BASE DE DATOS SIMULADA
const baseDeDatos = [
    {
        email: "marc@tecnovigilancia.com",
        password: "123",
        empresa: { nombre: "Tecnovigilancia Marc", plan: "Plan Profesional" },
        usuario: { nombre: "Marc Joachin", rol: "Administrador 👑" },
        creditos: { proformas: 87, informes: 42 }
    }
];

// 2. REFERENCIAS HTML
const pantallaLogin = document.getElementById('pantalla-login');
const pantallaRegistro = document.getElementById('pantalla-registro');
const pantallaDashboard = document.getElementById('pantalla-dashboard');

const formularioLogin = document.getElementById('formulario-login');
const formularioRegistro = document.getElementById('formulario-registro');

const btnGoogle = document.getElementById('btn-google');
const btnVolverLogin = document.getElementById('btn-volver-login');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const mensajeError = document.getElementById('mensaje-error');

// 3. LOGIN TRADICIONAL
formularioLogin.addEventListener('submit', function(evento) {
    evento.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usuarioEncontrado = baseDeDatos.find(u => u.email === email && u.password === password);

    if (usuarioEncontrado) {
        mensajeError.classList.add('oculto');
        mostrarPantalla(pantallaDashboard);
        inyectarDatos(usuarioEncontrado);
    } else {
        mensajeError.classList.remove('oculto');
    }
});

// 4. SIMULAR LOGIN CON GOOGLE (Usuario Nuevo)
btnGoogle.addEventListener('click', function() {
    // En la vida real, aquí Supabase abre el popup de Google.
    // Para la maqueta, simulamos que Google ya nos dio el correo y pasamos a crear la empresa.
    document.getElementById('ui-google-nombre').textContent = "Nuevo Administrador";
    mostrarPantalla(pantallaRegistro);
});

// 5. REGISTRAR NUEVA EMPRESA
formularioRegistro.addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    // Capturar datos del formulario
    const nombreEmpresa = document.getElementById('nueva-empresa').value;
    const nombreUsuario = document.getElementById('nuevo-usuario').value;

    // Crear el nuevo perfil de empresa (Estructura Multiempresa)
    const nuevaCuenta = {
        email: "usuario.google@gmail.com", // Simulado
        empresa: { 
            nombre: nombreEmpresa, 
            plan: "Plan Gratuito" // Todas las cuentas nuevas inician gratis
        },
        usuario: { 
            nombre: nombreUsuario, 
            rol: "Administrador 👑" // El creador siempre es el admin
        },
        creditos: { 
            proformas: 10, 
            informes: 10 
        }
    };

    // Guardar en la base de datos simulada
    baseDeDatos.push(nuevaCuenta);

    // Limpiar formulario e ir al dashboard
    formularioRegistro.reset();
    mostrarPantalla(pantallaDashboard);
    inyectarDatos(nuevaCuenta);
});

// 6. NAVEGACIÓN Y UTILIDADES
btnVolverLogin.addEventListener('click', () => mostrarPantalla(pantallaLogin));

btnCerrarSesion.addEventListener('click', function() {
    formularioLogin.reset();
    mostrarPantalla(pantallaLogin);
});

function mostrarPantalla(pantallaVisible) {
    // Oculta todas y muestra solo la solicitada
    pantallaLogin.classList.add('oculto');
    pantallaRegistro.classList.add('oculto');
    pantallaDashboard.classList.add('oculto');
    pantallaVisible.classList.remove('oculto');
}

function inyectarDatos(datos) {
    document.getElementById('ui-nombre-empresa').textContent = datos.empresa.nombre;
    document.getElementById('ui-plan-empresa').textContent = datos.empresa.plan;
    document.getElementById('ui-nombre-usuario').textContent = datos.usuario.nombre;
    document.getElementById('ui-rol-usuario').textContent = datos.usuario.rol;
    document.getElementById('ui-creditos-proformas').textContent = datos.creditos.proformas;
    document.getElementById('ui-creditos-informes').textContent = datos.creditos.informes;
        }
