import axios from 'axios';

const apiUrl = 'http://localhost:3000/api'; 

/**
 * Fonction centrale pour effectuer des appels API
 * @param {string} endpoint 
 * @param {string} method 
 * @param {object} data 
 * @returns {Promise} 
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
