import { YourEnergyAPI } from './api.js';
import { showToast } from './toast.js';

const api = new YourEnergyAPI();
const form = document.getElementById('subscribe-form');

export function initFooter() {
  if (form) {
    form.addEventListener('submit', handleSubscribe);
  }
}

async function handleSubscribe(event) {
  event.preventDefault();

  const emailInput = form.elements.email;
  const email = emailInput.value.trim();

  // Standard email regex pattern matching the HTML pattern
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  try {
    await api.createSubscription(email);
    showToast("We're excited to have you on board!", 'success');
    form.reset();
  } catch (error) {
    // Handle specific API error codes
    if (error.status === 409) {
      showToast('You are already subscribed to our updates!', 'info');
    } else if (error.status === 400) {
      showToast('Invalid email format. Please check and try again.', 'error');
    } else {
      showToast('Something went wrong. Please try again later.', 'error');
    }
  }
}
