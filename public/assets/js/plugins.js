// Select elements with specific attributes
const elements = document.querySelectorAll("[toast-list], [data-choices], [data-provider]");

// Check if elements are found
if (elements.length > 0) {
  // Dynamically create script elements and set their source
  const toastifyScript = document.createElement('script');
  toastifyScript.src = 'https://cdn.jsdelivr.net/npm/toastify-js';

  const choicesScript = document.createElement('script');
  choicesScript.src = '/assets/js/choices.min.js';

  const flatpickrScript = document.createElement('script');
  flatpickrScript.src = '/assets/js/flatpickr.min.js';

  // Append the script elements to the document
  document.body.appendChild(toastifyScript);
  document.body.appendChild(choicesScript);
  document.body.appendChild(flatpickrScript);
}
