import * as cartModule from '../../data/cart.js';
import {productById} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import * as summary from './orderSummary.js';
import '../../data/cart-class.js';
import '../../data/backedn-practice.js';


function renderOrderSummary(){
  let cartHTML = '';
  cartModule.cart.forEach((cartItem)=>{
        const productId = cartItem.id;
        const itemInstance = productById[productId];

        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOption;
        deliveryOptions.forEach(option => {
          if (option.id === deliveryOptionId){
            deliveryOption = option;
          }
        });
        let now = dayjs();
        const delivery = now.add(deliveryOption.deliveryDays, 'days');
        const dateString = delivery.format('dddd, MMMM D');
        cartHTML += `
                <div class="cart-item-container js-cart-item js-cart-item-container-${itemInstance.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${itemInstance.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${itemInstance.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(itemInstance.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${itemInstance.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(itemInstance.id, cartItem)}

                </div>
              </div>
            </div>
      `;
      
  });

  function deliveryOptionsHTML(id, cartItem) {
    let html = ''
    deliveryOptions.forEach(deliveryOption => {
      let now = dayjs();
      const delivery = now.add(deliveryOption.deliveryDays, 'days');
      const dateString = delivery.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `<div class="delivery-option js-delivery-option" data-product-id="${id}" data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked': ''}
                      class="delivery-option-input"
                      name="delivery-option-${id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </div>
                  </div>`
    });
    return html;
  }

  const cartItemClass = document.querySelector('.order-summary');
  if (cartItemClass) {
    cartItemClass.innerHTML = cartHTML;
  }
  console.log(cartItemClass);
  document.querySelectorAll('.js-delete-link')
      .forEach((link) => {
        link.addEventListener('click', ()=>{
            const productId = link.dataset.productId;
            cartModule.removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`);

            container.remove();
      });
  });

  document.querySelectorAll('.js-delivery-option').forEach(element=> {
    element.addEventListener('click', ()=>{
      const {productId, deliveryOptionId} = element.dataset;
      cartModule.updateDeliveryOption(productId, deliveryOptionId);
      summary.calculateShipping();
      summary.paymentBeforeTax();
      renderOrderSummary();
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
});
