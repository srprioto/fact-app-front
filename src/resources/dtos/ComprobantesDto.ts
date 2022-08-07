export const classEstado = (estado_sunat:any) => {
    if (estado_sunat === "Aceptado") {
        return "success-i"
    } else if (estado_sunat === "Observado") {
        return "primary-i"
    } else if (estado_sunat === "Rechazado") {
        return "warning-i"
    } else if (estado_sunat === "Excepcion") {
        return "secundary-i"
    } else if (estado_sunat === "Error_anulacion" || estado_sunat === "Error_envio") {
        return "danger-i"
    } else if (estado_sunat === "No") {
        return "danger-i"
    } else if (estado_sunat === "Anulado") {
        return "secundary-i opacity"
    }
}


// Aceptado
// Observado
// Rechazado
// Excepcion
// No
// Anulado

// Error_anulacion
// Error_envio