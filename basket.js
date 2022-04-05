'use strict';


// Переменные, константы
const basketEl = document.querySelector('.basket');
const basketCounterIcon = document.querySelector('.cartIconWrap span');
const basketTotal = basketEl.querySelector('.basketTotalValue');
const basketRowEls = basketEl.querySelector('.basketItems');
const basket = {};
let total = 0;
let count = 0;

// Обработчик нажатия на иконку корзины
document
    .querySelector('.cartIconWrap').addEventListener('click', ({target}) => {
        basketEl.classList.toggle('hidden');
});

// Обработчик нажатия на кнопку Add to cart
document
    .querySelector('.featuredItems').addEventListener('click', ({target}) => {
        if (!target.closest('.addToCart')) {
            return;
        }
        const productEl = target.closest('.featuredItem');
        const id = +productEl.dataset.id;
        const name = productEl.dataset.name;
        const price = +productEl.dataset.price;

        addToCart(id, name, price)

});

// Функция добавляет продукт в корзину
function addToCart(id, name, price) {

    if (!(id in basket)) {
        basket[id] = {name, price, count : 0 };
    }
    
    basket[id].count++;
    total += price;
    count++;
    updateBasket(basket);
}

// Обновить разметку корзины
function updateBasket(basket) {
    basketRowEls.innerHTML = Object.keys(basket)
        .map(key => getProductMarkup(basket[key])).join('');

    basketTotal.textContent = `${total}`;
    basketCounterIcon.textContent = count.toString();
}

// Получает разметку из информации о товаре
function getProductMarkup(product) {
    return `
        <div>${product.name}</div>
        <div>${product.count} шт.</div>
        <div>$${product.price}</div>
        <div>$${product.price * product.count}</div>
    `;
}
ё
