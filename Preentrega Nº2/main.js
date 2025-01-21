// Función para solicitar un valor y verificar si es un número
function solicitarNumero(mensaje, campo) {
    let valor;
    do {
        valor = prompt(mensaje);
        if (isNaN(parseFloat(valor))) {
            alert("Por favor, ingrese un valor numérico válido para " + campo + ".");
        } else {
            valor = parseFloat(valor); // Convierte el valor a número después de validar
        }
    } while (isNaN(valor)); // Repite el prompt si el valor no es numérico
    return valor;
}

// Función para solicitar el nombre y validar que no sea un número
function solicitarNombre(mensaje, campo) {
    let nombre;
    do {
        nombre = prompt(mensaje);
        if (!nombre || (!isNaN(nombre))) {
            alert("Por favor ingrese un texto válido para " + campo + ".");
        }
    } while (!nombre || (!isNaN(nombre)));
    return nombre;
}

// Array para almacenar los datos de los clientes a ingresar en la pagina
let clientes = [];
let continuar = true;

while (continuar) {
    // Crea un objeto con las propiedades clave-valor
    let usuario = {
        nombreCliente: solicitarNombre("Ingrese aquí su nombre", "nombre"),
        sueldo: solicitarNumero("Ingrese aquí su sueldo líquido:", "el sueldo"),
        otroIngreso: solicitarNumero("Si percibe otros ingresos, ingréselos aquí:", "otros ingresos"),
        gastos: solicitarNumero("Ingrese su promedio de gastos mensuales (alimentación, arriendo, servicios, estudios, etc.):", "los gastos"),
        tarjetaCredito: solicitarNumero("Ingrese aquí sus gastos en tarjeta de crédito:", "los gastos en tarjeta de crédito"),
        aniosCredito: solicitarNumero("Ingrese aquí a cuántos años desea solicitar su crédito hipotecario", "años crédito"),

        // Define las funciones dentro del mismo objeto
        montoDisponible: function () {
            let ingresoTotal = this.sueldo + this.otroIngreso;
            let gastosTotales = this.gastos + this.tarjetaCredito;
            return ingresoTotal - gastosTotales;
        },

        creditoMaximo: function () {
            return this.montoDisponible() * this.aniosCredito;
        }
    };

    // Calcula y almacena los valores de montoDisponible y creditoMaximo como propiedades
    usuario.montoDisponibleValor = usuario.montoDisponible();
    usuario.creditoMaximoValor = usuario.creditoMaximo();

    // Agrega el objeto 'usuario' al array 'clientes'
    clientes.push(usuario);

    // Pregunta si desea continuar ingresando usuarios a la pagina, si se cancela termina la iteracion
    continuar = confirm("¿Desea ingresar otro usuario?");
}

// Función para simular la evaluación de créditos
function simularCreditos(clientes) {
    console.log("Simulación de Créditos para los clientes:");

    clientes.forEach(cliente => {
        let creditoMaximo = cliente.creditoMaximoValor; // Valor calculado previamente
        let montoDisponible = cliente.montoDisponibleValor; // Valor calculado previamente
        let ingresoTotal = cliente.sueldo + cliente.otroIngreso; // Calcular el ingreso total

        // Simular condiciones para la aprobación
        if (montoDisponible > 600000 && ingresoTotal > 1000000) {
            console.log(`Cliente: ${cliente.nombreCliente} ha sido APROBADO para un crédito de ${creditoMaximo} por un plazo de ${cliente.aniosCredito} años`);
        } else {
            console.log(`Cliente: ${cliente.nombreCliente} NO ha sido aprobado para un crédito.`);
        }
    });
}

// Llama a la función de simulación de créditos
simularCreditos(clientes);
