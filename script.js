// Replace with your Bot Token and Admin Chat ID
const TELEGRAM_BOT_TOKEN = '8643030729:AAEgMw4EiNydJ9eUjjpkmWDKlqkorDAyFjw';
const TELEGRAM_CHAT_ID = '1949334561';

// Fetch menu from menu.json and render on page load
document.addEventListener("DOMContentLoaded", () => {
  fetch('menu.json')
    .then(response => response.json())
    .then(data => {
      renderMenu(data.hot_drinks, 'hot-drinks');
      renderMenu(data.cold_drinks, 'cold-drinks');
    })
    .catch(error => console.error("Error loading menu:", error));
});

function renderMenu(items, containerId) {
  const container = document.getElementById(containerId);
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.price}</p>
      <button onclick="sendOrder('${item.name}', '${item.price}')">Order Now</button>
    `;
    container.appendChild(card);
  });
}

// Function to send order message directly to Telegram
function sendOrder(itemName, itemPrice) {
  const message = `🚨 *NEW WEB ORDER* 🚨\n\n🥤 *Item:* ${itemName}\n💰 *Price:* ${itemPrice}\n⏰ *Time:* ${new Date().toLocaleTimeString()}`;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      alert(`Order sent! We are preparing your ${itemName}.`);
    } else {
      alert("Failed to send order. Please try again.");
    }
  })
  .catch(err => {
    console.error("Error:", err);
    alert("An error occurred while sending your order.");
  });
}
