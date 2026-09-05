// 1. SIMULACIÓN DE LA BASE DE DATOS
// Imagina que el usuario acaba de iniciar sesión y el servidor nos devuelve esto:
const sesionActual = {
    empresa: {
        nombre: "Tecnovigilancia Marc",
        plan: "Plan Profesional"
    },
    usuario: {
        nombre: "Marc Joachin",
        rol: "Administrador 👑"
    },
    creditos: {
        proformas: 87,
        informes: 42
    }
};

// 2. FUNCIÓN PARA CARGAR LA INTERFAZ
// Esta función busca los 'id' en el HTML y reemplaza el texto con los datos de arriba.
function inyectarDatosMultiempresa() {
    // Inyectar datos de la empresa
    document.getElementById('ui-nombre-empresa').textContent = sesionActual.empresa.nombre;
    document.getElementById('ui-plan-empresa').textContent = sesionActual.empresa.plan;
    
    // Inyectar datos del usuario
    document.getElementById('ui-nombre-usuario').textContent = sesionActual.usuario.nombre;
    document.getElementById('ui-rol-usuario').textContent = sesionActual.usuario.rol;
    
    // Inyectar métricas
    document.getElementById('ui-creditos-proformas').textContent = sesionActual.creditos.proformas;
    document.getElementById('ui-creditos-informes').textContent = sesionActual.creditos.informes;
}

// 3. EJECUTAR AL CARGAR LA PÁGINA
// Le decimos al navegador: "Cuando termines de leer el HTML, ejecuta la función"
document.addEventListener('DOMContentLoaded', inyectarDatosMultiempresa);
