const axios = require('axios');

/**
 * Fonction centrale pour effectuer des appels API
 * @param {string} endpoint - Le point de terminaison de l'API (URL complète ou relative)
 * @param {string} method - La méthode HTTP à utiliser (e.g., 'POST', 'GET')
 * @param {object} data - Les données à envoyer avec la requête (le cas échéant)
 * @param {object} headers - Les en-têtes à envoyer avec la requête (le cas échéant)
 * @returns {Promise} - Une promesse contenant la réponse de l'API
 */
const apiCall = async (endpoint, method, data = null, headers = {}) => {
  try {
    const response = await axios({
      url: endpoint,
      method: method,
      data: data,
      headers: headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Error in API call to ${endpoint}:`, error);
    throw error;
  }
};

module.exports = { apiCall };
