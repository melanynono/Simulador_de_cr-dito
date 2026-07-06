// ============================================
// SISTEMA DE VALIDACIONES DEL SIMULADOR DE CRÉDITO
// ============================================

/**
 * Función para limpiar todos los mensajes de error
 */
function limpiarErrores() {
    // Limpiar mensajes de error
    document.getElementById("errorIngresos").textContent = "";
    document.getElementById("errorEgresos").textContent = "";
    document.getElementById("errorMonto").textContent = "";
    document.getElementById("errorPlazo").textContent = "";
    document.getElementById("errorTasaInteres").textContent = "";
    
    // Remover clases de error de los inputs
    document.getElementById("txtIngresos").classList.remove("input-error");
    document.getElementById("txtEgresos").classList.remove("input-error");
    document.getElementById("txtMonto").classList.remove("input-error");
    document.getElementById("txtPlazo").classList.remove("input-error");
    document.getElementById("txtTasaInteres").classList.remove("input-error");
}

/**
 * Función para mostrar un mensaje de error en un campo específico
 */
function mostrarError(idInput, idError, mensaje) {
    document.getElementById(idError).textContent = mensaje;
    document.getElementById(idInput).classList.add("input-error");
}

/**
 * Función para validar si un campo está vacío
 */
function validarCampoVacio(valor, nombreCampo) {
    if (valor === null || valor === undefined || valor.trim() === "") {
        return `El campo ${nombreCampo} es obligatorio`;
    }
    return null;
}

/**
 * Función para validar si un valor es numérico
 */
function validarNumero(valor, nombreCampo) {
    // Verificar si contiene solo números y opcionalmente un punto decimal
    const regex = /^-?\d+(\.\d+)?$/;
    if (!regex.test(valor)) {
        return `${nombreCampo} debe contener solo números`;
    }
    return null;
}

/**
 * Función para validar que un número sea positivo
 */
function validarPositivo(valor, nombreCampo) {
    const numero = parseFloat(valor);
    if (numero <= 0) {
        return `${nombreCampo} debe ser mayor a 0`;
    }
    return null;
}

/**
 * Función para validar que un número no sea negativo
 */
function validarNoNegativo(valor, nombreCampo) {
    const numero = parseFloat(valor);
    if (numero < 0) {
        return `${nombreCampo} no puede ser negativo`;
    }
    return null;
}

/**
 * Función para validar rango de valores
 */
function validarRango(valor, nombreCampo, min, max) {
    const numero = parseFloat(valor);
    if (numero < min || numero > max) {
        return `${nombreCampo} debe estar entre ${min} y ${max}`;
    }
    return null;
}

/**
 * Función para validar número máximo de dígitos
 */
function validarMaxDigitos(valor, nombreCampo, maxDigitos) {
    // Remover punto decimal para contar solo dígitos enteros
    const valorEntero = valor.split('.')[0].replace('-', '');
    if (valorEntero.length > maxDigitos) {
        return `${nombreCampo} no puede tener más de ${maxDigitos} dígitos`;
    }
    return null;
}

/**
 * Función principal de validación de INGRESOS
 */
function validarIngresos(valor) {
    let error = null;
    
    // 1. Validar campo vacío
    error = validarCampoVacio(valor, "Ingresos Mensuales");
    if (error) return error;
    
    // 2. Validar que sea número
    error = validarNumero(valor, "Ingresos Mensuales");
    if (error) return error;
    
    // 3. Validar que sea positivo
    error = validarPositivo(valor, "Ingresos Mensuales");
    if (error) return error;
    
    // 4. Validar rango razonable (entre 1 y 1,000,000)
    error = validarRango(valor, "Ingresos Mensuales", 1, 1000000);
    if (error) return error;
    
    // 5. Validar máximo 9 dígitos
    error = validarMaxDigitos(valor, "Ingresos Mensuales", 9);
    if (error) return error;
    
    return null; // Sin errores
}

/**
 * Función principal de validación de EGRESOS
 */
function validarEgresos(valor) {
    let error = null;
    
    // 1. Validar campo vacío
    error = validarCampoVacio(valor, "Egresos Mensuales");
    if (error) return error;
    
    // 2. Validar que sea número
    error = validarNumero(valor, "Egresos Mensuales");
    if (error) return error;
    
    // 3. Validar que no sea negativo
    error = validarNoNegativo(valor, "Egresos Mensuales");
    if (error) return error;
    
    // 4. Validar rango razonable (entre 0 y 1,000,000)
    error = validarRango(valor, "Egresos Mensuales", 0, 1000000);
    if (error) return error;
    
    // 5. Validar máximo 9 dígitos
    error = validarMaxDigitos(valor, "Egresos Mensuales", 9);
    if (error) return error;
    
    return null; // Sin errores
}

/**
 * Función para validar que egresos no superen ingresos
 */
function validarEgresosVsIngresos(ingresos, egresos) {
    const valorIngresos = parseFloat(ingresos);
    const valorEgresos = parseFloat(egresos);
    
    if (valorEgresos > valorIngresos) {
        return "Los egresos no pueden ser mayores a los ingresos";
    }
    return null;
}

/**
 * Función principal de validación de MONTO
 */
function validarMonto(valor) {
    let error = null;
    
    // 1. Validar campo vacío
    error = validarCampoVacio(valor, "Monto Solicitado");
    if (error) return error;
    
    // 2. Validar que sea número
    error = validarNumero(valor, "Monto Solicitado");
    if (error) return error;
    
    // 3. Validar que sea positivo
    error = validarPositivo(valor, "Monto Solicitado");
    if (error) return error;
    
    // 4. Validar rango (mínimo $1,000 - máximo $10,000,000)
    error = validarRango(valor, "Monto Solicitado", 1000, 10000000);
    if (error) return error;
    
    // 5. Validar máximo 8 dígitos
    error = validarMaxDigitos(valor, "Monto Solicitado", 8);
    if (error) return error;
    
    return null; // Sin errores
}

/**
 * Función principal de validación de PLAZO
 */
function validarPlazo(valor) {
    let error = null;
    
    // 1. Validar campo vacío
    error = validarCampoVacio(valor, "Plazo en años");
    if (error) return error;
    
    // 2. Validar que sea número entero
    const regex = /^\d+$/;
    if (!regex.test(valor)) {
        return "Plazo en años debe ser un número entero";
    }
    
    // 3. Validar que sea positivo
    error = validarPositivo(valor, "Plazo en años");
    if (error) return error;
    
    // 4. Validar rango razonable (entre 1 y 30 años)
    error = validarRango(valor, "Plazo en años", 1, 30);
    if (error) return error;
    
    // 5. Validar máximo 2 dígitos
    error = validarMaxDigitos(valor, "Plazo en años", 2);
    if (error) return error;
    
    return null; // Sin errores
}

/**
 * Función principal de validación de TASA DE INTERÉS
 */
function validarTasaInteres(valor) {
    let error = null;
    
    // 1. Validar campo vacío
    error = validarCampoVacio(valor, "Tasa de Interés");
    if (error) return error;
    
    // 2. Validar que sea número
    error = validarNumero(valor, "Tasa de Interés");
    if (error) return error;
    
    // 3. Validar que sea positivo
    error = validarPositivo(valor, "Tasa de Interés");
    if (error) return error;
    
    // 4. Validar rango razonable (entre 0.1% y 100%)
    error = validarRango(valor, "Tasa de Interés", 0.1, 100);
    if (error) return error;
    
    return null; // Sin errores
}

/**
 * Función principal que valida todos los campos del formulario
 * Retorna true si todos los campos son válidos, false si hay algún error
 */
function validarFormulario() {
    // Limpiar errores previos
    limpiarErrores();
    
    let formularioValido = true;
    
    // Obtener valores de los campos
    const ingresos = document.getElementById("txtIngresos").value;
    const egresos = document.getElementById("txtEgresos").value;
    const monto = document.getElementById("txtMonto").value;
    const plazo = document.getElementById("txtPlazo").value;
    const tasaInteres = document.getElementById("txtTasaInteres").value;
    
    // Validar INGRESOS
    const errorIngresos = validarIngresos(ingresos);
    if (errorIngresos) {
        mostrarError("txtIngresos", "errorIngresos", errorIngresos);
        formularioValido = false;
    }
    
    // Validar EGRESOS
    const errorEgresos = validarEgresos(egresos);
    if (errorEgresos) {
        mostrarError("txtEgresos", "errorEgresos", errorEgresos);
        formularioValido = false;
    }
    
    // Validación adicional: Egresos vs Ingresos (solo si ambos son válidos)
    if (!errorIngresos && !errorEgresos) {
        const errorComparacion = validarEgresosVsIngresos(ingresos, egresos);
        if (errorComparacion) {
            mostrarError("txtEgresos", "errorEgresos", errorComparacion);
            formularioValido = false;
        }
    }
    
    // Validar MONTO
    const errorMonto = validarMonto(monto);
    if (errorMonto) {
        mostrarError("txtMonto", "errorMonto", errorMonto);
        formularioValido = false;
    }
    
    // Validar PLAZO
    const errorPlazo = validarPlazo(plazo);
    if (errorPlazo) {
        mostrarError("txtPlazo", "errorPlazo", errorPlazo);
        formularioValido = false;
    }
    
    // Validar TASA DE INTERÉS
    const errorTasa = validarTasaInteres(tasaInteres);
    if (errorTasa) {
        mostrarError("txtTasaInteres", "errorTasaInteres", errorTasa);
        formularioValido = false;
    }
    
    return formularioValido;
}
