/* ==========================================================================
   TECNOPRO - Lógica Principal (JavaScript)
   ========================================================================== */

// Base de datos local simulada (se mantendrá mientras navegas)
const DB = {
    usuario: "Marc",
    creditosProformas: 7,
    creditosInformes: 4,
    limiteCreditos: 10,
    clientes: [
        { id: 1, nombre: "Condominio Los Álamos", ruc: "20601234567", telefono: "987654321", email: "admin@losalamos.com" },
        { id: 2, nombre: "Taller Autos Express", ruc: "10456789012", telefono: "912345678", email: "contacto@autosexpress.pe" }
    ],
    productosAlmacen: [
        { id: 101, marca: "Hikvision", producto: "Cámara IP 4MP", modelo: "DS-2CD2T47G2", precio: 380, stock: 12 },
        { id: 102, marca: "Western Digital", producto: "Disco Duro Purple 4TB", modelo: "WD40PURZ", precio: 520, stock: 5 },
        { id: 103, marca: "Generico", producto: "Instalación / Configuración", modelo: "Servicio", precio: 80, stock: 999 }
    ]
};

// Se ejecuta automáticamente cuando el HTML termina de cargar
document.addEventListener('DOMContentLoaded', () => {
    initLogin();
    initProformas();
});

/* ==========================================================================
   1. AUTENTICACIÓN Y NAVEGACIÓN
   ========================================================================== */
function initLogin() {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Detener recarga de página

            const emailInput = document.getElementById('email').value;
            
            // Guardamos el email para mantener la sesión activa de forma simple
            localStorage.setItem('tecnopro_user', emailInput || 'Marc');

            // Redirigir al panel principal
            window.location.href = 'dashboard.html';
        });
    }
}

/* ==========================================================================
   2. CÁLCULO AUTOMÁTICO DE PROFORMAS
   ========================================================================== */
function initProformas() {
    const tablaProforma = document.getElementById('proformaTabla');
    
    if (!tablaProforma) return; // Si no estamos en la vista de proforma, no hace nada

    // Escuchar cambios en las cantidades o precios para recalcular totales automáticamente
    tablaProforma.addEventListener('input', calcularTotalesProforma);
}

function calcularTotalesProforma() {
    const filas = document.querySelectorAll('#proformaTabla tbody tr');
    let subtotal = 0;

    filas.forEach(fila => {
        const cantidadInput = fila.querySelector('.cant-input');
        const precioInput = fila.querySelector('.precio-input');
        const totalCelda = fila.querySelector('.total-celda');

        if (cantidadInput && precioInput && totalCelda) {
            const cant = parseFloat(cantidadInput.value) || 0;
            const precio = parseFloat(precioInput.value) || 0;
            const totalFila = cant * precio;

            totalCelda.textContent = `S/ ${totalFila.toFixed(2)}`;
            subtotal += totalFila;
        }
    });

    // Cálculos globales (IGV 18% en Perú)
    const igv = subtotal * 0.18;
    const totalGeneral = subtotal + igv;

    // Actualizar elementos en pantalla si existen
    const elSubtotal = document.getElementById('resSubtotal');
    const elIgv = document.getElementById('resIgv');
    const elTotal = document.getElementById('resTotal');

    if (elSubtotal) elSubtotal.textContent = `S/ ${subtotal.toFixed(2)}`;
    if (elIgv) elIgv.textContent = `S/ ${igv.toFixed(2)}`;
    if (elTotal) elTotal.textContent = `S/ ${totalGeneral.toFixed(2)}`;
}

/* ==========================================================================
   3. FUNCIONES AUXILIARES (Para botones rápidos)
   ========================================================================== */
function irA(pagina) {
    window.location.href = pagina;
        }
                                         
