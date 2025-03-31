import axios from "axios";

export const fetchCharacter = async (name, count = 20) => {
  // Validación básica del parámetro name
  if (typeof name !== 'string' || name.trim() === '') {
    const error = new Error('Search term cannot be empty');
    error.status = 400;
    throw error;
  }

  // Validación del parámetro count
  if (isNaN(count) || count < 1 || count > 100) {
    count = 20;
  }

  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(name)}`,
      { timeout: 10000 } // Timeout de 10 segundos
    );

    // Si no hay resultados
    if (!response.data.results || response.data.results.length === 0) {
      const error = new Error(`No characters found with name "${name}"`);
      error.status = 404;
      throw error;
    }

    // Limitar resultados según count
    return response.data.results.slice(0, count);
  } catch (error) {
    // Manejo estructurado de errores
    if (error.response) {
      // Error de la API (404, 500, etc.)
      const apiError = new Error(
        error.response.data?.error || `API Error: ${error.response.status}`
      );
      apiError.status = error.response.status;
      throw apiError;
    } else if (error.request) {
      // No se recibió respuesta
      const networkError = new Error('Network Error - No response from server');
      networkError.status = 0;
      throw networkError;
    } else {
      // Error en la configuración de la solicitud
      error.status = error.status || 500;
      throw error;
    }
  }
};