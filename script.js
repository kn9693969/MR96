let total = 0;

fetch('menu.json')
  .then(res => res.json())
  .then(data => {
    const menuDiv = document.getElementById('menu-list');
    data.forEach(item => {
      menuDiv.innerHTML += `
        <div class="item-card">
          <span>${item.name} - ${item.price} Ks</span>
          <button onclick="addToCart('${item.name}', ${item.price})">Add</button>
        </div>`;
    });
  });

function addToCart(name, price) {
  const cart = document.getElementById('cart');
  const li = document.createElement('li');
  li.textContent = `${name} - ${price} Ks`;
  cart.appendChild(li);

  total += price;
  document.getElementById('total').textContent = total;
}
