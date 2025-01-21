// Capturar el formulario y el contenedor de resultados
const form = document.querySelector('#formCredito');
const resultadoDiv = document.querySelector('#resultado');
const historialDiv = document.querySelector('#historial');

// Array para almacenar los datos de los clientes
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

// Función para calcular monto disponible
function calcularMontoDisponible(sueldo, otrosIngresos, gastos, tarjetaCredito) {
    return (sueldo + otrosIngresos) - (gastos + tarjetaCredito);
}

// Función para calcular crédito máximo
function calcularCreditoMaximo(montoDisponible, aniosCredito) {
    return montoDisponible * aniosCredito;
}

// Función para simular la aprobación del crédito
function simularCredito(cliente) {
    const { sueldo, otrosIngresos, montoDisponibleValor, creditoMaximoValor, aniosCredito, nombreCliente } = cliente;
    const ingresoTotal = sueldo + otrosIngresos;

    if (montoDisponibleValor > 600000 && ingresoTotal > 1000000) {
        return `Cliente: ${nombreCliente} ha sido APROBADO para un crédito de ${creditoMaximoValor} por un plazo de ${aniosCredito} años.`;
    } else {
        return `Cliente: ${nombreCliente} NO ha sido aprobado para un crédito.`;
    }
}

// Función para guardar en localStorage
function guardarClientesEnStorage() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
}

// Función para actualizar el historial de simulaciones
function actualizarHistorial() {
    historialDiv.innerHTML = '';
    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.textContent = `Cliente: ${cliente.nombreCliente}, Monto Disponible: ${cliente.montoDisponibleValor}`;
        historialDiv.appendChild(li);
    });
}

// Función para manejar el evento de envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Capturar los valores del formulario
    const nombreCliente = document.getElementById('nombre').value;
    const sueldo = parseFloat(document.getElementById('sueldo').value);
    const otrosIngresos = parseFloat(document.getElementById('otrosIngresos').value);
    const gastos = parseFloat(document.getElementById('gastos').value);
    const tarjetaCredito = parseFloat(document.getElementById('tarjetaCredito').value);
    const aniosCredito = parseFloat(document.getElementById('aniosCredito').value);

    // Calcular los valores esenciales
    const montoDisponibleValor = calcularMontoDisponible(sueldo, otrosIngresos, gastos, tarjetaCredito);
    const creditoMaximoValor = calcularCreditoMaximo(montoDisponibleValor, aniosCredito);

    // Crear el objeto del cliente
    const cliente = {
        nombreCliente,
        sueldo,
        otrosIngresos,
        gastos,
        tarjetaCredito,
        aniosCredito,
        montoDisponibleValor,
        creditoMaximoValor
    };

    // Agregar el cliente al array
    clientes.push(cliente);

    // Guardar en localStorage
    guardarClientesEnStorage();

    // Mostrar el resultado de la simulación en el DOM
    const resultado = simularCredito(cliente);
    resultadoDiv.textContent = resultado;

    // Actualizar el historial en el DOM
    actualizarHistorial();

    // Resetear el formulario
    form.reset();
});

// Cargar el historial al cargar la página
document.addEventListener('DOMContentLoaded', actualizarHistorial);
