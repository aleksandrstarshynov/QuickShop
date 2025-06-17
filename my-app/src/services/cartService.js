// // используем axios, но можно и fetch
// import axios from 'axios';

// const API_BASE = process.env.REACT_APP_API_BASE_URL; // http://localhost:4000

// export const addToCart = async (userId, productId, quantity = 1) => {
//   const response = await axios.post(
//     `${API_BASE}/cart`,
//     { userId, productId, quantity },
//     { headers: { 'Content-Type': 'application/json' } }
//   );
//   return response.data;
// };
