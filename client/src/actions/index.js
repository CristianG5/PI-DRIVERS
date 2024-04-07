import axios from "axios";

export function getDrivers() {
    return async function(dispatch) {
        try {
            const response = await axios.get("http://localhost:3001/drivers");
            dispatch({
                type: "GET_DRIVERS",
                payload: response.data
            });
        } catch (error) {
            // Manejo de errores: puedes enviar un tipo de acción adicional para manejar errores
            dispatch({
                type: "GET_DRIVERS_ERROR",
                payload: error.message // Puedes proporcionar un mensaje de error o información adicional si lo deseas
            });
        }
    };
}
