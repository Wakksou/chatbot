import axios from 'axios';

const apiUrl = 'http://localhost:3000/api'; // URL de base de votre API

/**
 * Fonction centrale pour effectuer des appels API
 * @param {string} endpoint - Le point de terminaison de l'API (e.g., '/chat' ou '/scores')
 * @param {string} method - La méthode HTTP à utiliser (e.g., 'POST', 'GET')
 * @param {object} data - Les données à envoyer avec la requête (le cas échéant)
 * @returns {Promise} - Une promesse contenant la réponse de l'API
 */
export const apiCall = async (endpoint, method, data = null) => {
  try {
    const response = await axios({
      url: `${apiUrl}${endpoint}`,
      method: method,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);
    throw error;
  }
};
