import { getToken } from './users-service';
import '../utilities/send-request'
// Define a constant 'BASE_URL' for the user-related API endpoints
const BASE_URL = '/api/users';

// Define a function 'signUp' that takes 'userData' as a parameter
export function signUp(userData) {
   // Call the 'sendRequest' function with the 'BASE_URL' and HTTP method 'POST'
  // to send a request to sign up a user using the provided 'userData'
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  // Call the 'sendRequest' function with the login endpoint and HTTP method 'POST'
  // to send a request to log in a user using the provided 'credentials'
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  // Call the 'sendRequest' function with the check-token endpoint
  // to send a request to check the validity of a user's token
  return sendRequest(`${BASE_URL}/check-token`);
}

/*--- Helper Functions ---*/

// Define an asynchronous function 'sendRequest' that takes three parameters:
// - 'url' (the API endpoint)
// - 'method' (HTTP method, defaults to 'GET')
// - 'payload' (data to be sent in the request, defaults to null)
async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc.
  // Create an 'options' object to configure the fetch request
  const options = { method };
  // Check if a 'payload' is provided
  if (payload) {
    // If a payload exists, set the 'Content-Type' header to 'application/json'
    options.headers = { 'Content-Type': 'application/json' };
    // and include the 'payload' as the request body in JSON format
    options.body = JSON.stringify(payload);
  }

  // Get the authentication token using the getToken() function
  const token = getToken();
  // Check if a token exists (user is authenticated)
  if (token) {
    // Ensure the headers object exists
    options.headers = options.headers || {};
    // Add token to an Authorization header
    // Prefacing with 'Bearer' is recommended in the HTTP specification
    options.headers.Authorization = `Bearer ${token}`;
  }
  // Perform a fetch request using the provided 'url' and 'options'
  const res = await fetch(url, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}
