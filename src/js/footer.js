import { YourEnergyAPI } from "./api.js";
import { showToast } from "./toast.js";

const api = new YourEnergyAPI();
const form = document.getElementById("subscribe-form");

export function initFooter() {
  if (form) {
    form.addEventListener("submit", handleSubscribe);
  }
}

async function handleSubscribe(event) {
  event.preventDefault();

  const emailInput = form.elements.email;
  const email = emailInput.value.trim();

  // Regex check (duplicating HTML pattern for JS validation)
  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!emailPattern.test(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }

  try {
    await api.createSubscription(email);
    showToast("We're excited to have you on board!", "success");
    form.reset();
  } catch (error) {
    console.error("Subscription failed:", error);
    if (error.message.includes("409")) {
      showToast("Subscription already exists.", "info");
    }
    else {
      showToast("Something went wrong. Please try again.", "error");
    }
  }
}
