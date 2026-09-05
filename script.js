/* ==========================================================================
   TECNOPRO - Sistema Multirrubro & Control de Planes
   ========================================================================== */

// Configuración Global de la Cuenta
const CONFIG_USUARIO = {
    nombre: "Marc",
    plan: "FREE", // Opciones: 'FREE' o 'PREMIUM'
    limiteFree: 10
};

// Datos Simulados
const DB = {
    proformasCreadas: 7,
    informesCreados: 4,
    clientesTotales: 32,
    almacenTotales: 185
};

document.addEventListener('DOMContentLoaded', () => {
    initLogin();
    renderDashboard();
    initProformas();
});

/* --- 1. AUTENTICACIÓN --- */
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email').value;
            localStorage.setItem('tecnopro_user', emailInput || CONFIG_USUARIO.nombre);
            window.location.href = './dashboard.html';
        });
    }
}

/* --- 2. RENDERIZADO DEL DASHBOARD Y LÍMITES --- */
function renderDashboard() {
    const elProformas = document.getElementById('valProformas');
    const elInformes = document.getElementById('valInformes');
    const badgePlan = document.getElementById('badgePlan');

    if (!elProformas || !elInformes) return;

    // Actualizar Badge del Plan
    if (badgePlan) {
        badgePlan.textContent = CONFIG_USUARIO.plan;
        if (CONFIG_USUARIO.plan === 'PREMIUM') {
            badgePlan.classList.add('premium');
        }
    }

    // Renderizar según el Plan
    if (CONFIG_USUARIO.plan === 'PREMIUM') {
        elProformas.innerHTML = `${DB.proformasCreadas} <small>/ ∞</small>`;
        elInformes.innerHTML = `${DB.informesCreados} <small>/ ∞</small>`;
    } else {
        elProformas.innerHTML = `${DB.proformasCreadas} <small>/ ${CONFIG_USUARIO.limiteFree}</small>`;
        elInformes.innerHTML = `${DB.informesCreados} <small>/ ${CONFIG_USUARIO.limiteFree}</small>`;
    }
}

/* --- 3. VALIDACIÓN AL CREAR DOCUMENTOS --- */
function validarAcceso(tipo) {
    if (CONFIG_USUARIO.plan === 'PREMIUM') {
        window.location.href = `./${tipo}.html`;
        return;
    }

    const cantidadActual = tipo === 'proformas' ? DB.proformasCreadas : DB.informesCreados;

    if (cantidadActual >= CONFIG_USUARIO.limiteFree) {
        alert(`Has alcanzado el límite de ${CONFIG_USUARIO.limiteFree} ${tipo} del Plan Gratuito. Pásate a Premium para crear documentos ilimitados.`);
    } else {
        window.location.href = `./${tipo}.html`;
    }
}

/* --- 4. CÁLCULO DE PROFORMAS --- */
function initProformas() {
    const tabla = document.getElementById('proformaTabla');
    if (!tabla) return;

    tabla.addEventListener('input', calcularTotales);
}

function calcularTotales() {
    const filas = document.querySelectorAll('#proformaTabla tbody tr');
    let subtotal = 0;

    filas.forEach(fila => {
        const cant = parseFloat(fila.querySelector('.cant-input')?.value) || 0;
        const precio = parseFloat(fila.querySelector('.precio-input')?.value) || 0;
        const totalFila = cant * precio;
        
        const celdaTotal = fila.querySelector('.total-celda');
        if (celdaTotal) celdaTotal.textContent = `S/ ${totalFila.toFixed(2)}`;
        
        subtotal += totalFila;
    });

    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    if (document.getElementById('resSubtotal')) document.getElementById('resSubtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
    if (document.getElementById('resIgv')) document.getElementById('resIgv').textContent = `S/ ${igv.toFixed(2)}`;
    if (document.getElementById('resTotal')) document.getElementById('resTotal').textContent = `S/ ${total.toFixed(2)}`;
}
