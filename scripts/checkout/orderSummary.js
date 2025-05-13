import * as cartModule from '../../data/cart.js';
import {productById, loadProductsFetch} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {deliveryOptions} from '../../data/deliveryOptions.js';
import * as order from '../placeOrder/placeOrder.js';
// render
document.querySelector('.js-payment-summary');

export function totalItems(){
    let quantity = 0;
    cartModule.cart.forEach(cartItem => {
        quantity += cartItem.quantity;
    });
    document.querySelector('.js-items').innerText = `Items (${quantity})`;
}
export function calculateItemPayment(){
    let paymentSummaryCents = 0; 

    cartModule.cart.forEach((cartItem)=>{
        const productId = cartItem.id;
        const itemInstance = productById[productId];
        paymentSummaryCents += cartItem.quantity * itemInstance.priceCents;
    
    });
    console.log
    document.querySelector('.js-payment-summary-money').innerText = `$${formatCurrency(paymentSummaryCents)}`;

    return paymentSummaryCents;
}

export function calculateShipping(){
    let totalShippingCents = 0;
    cartModule.cart.forEach(item => {
        deliveryOptions.forEach(option=>{
            if (option.id === item.deliveryOptionId){
                totalShippingCents += option.priceCents;
            }
        });
    });
    document.querySelector('.js-payment-summary-shipping').innerText = `$${formatCurrency(totalShippingCents)}`;

    return totalShippingCents;
}
export function paymentBeforeTax(){
    let totalShippingCents = calculateShipping();
    let paymentSummaryCents = calculateItemPayment();
    
    document.querySelector('.js-payment-summary-before-tax').innerText = `$${formatCurrency(totalShippingCents + paymentSummaryCents)}`;
    estimatedTax(totalShippingCents + paymentSummaryCents);
    return totalShippingCents + paymentSummaryCents;
}

export function estimatedTax(paymentBeforeTax){
    let estimatedTax = paymentBeforeTax * .10;
    
    document.querySelector('.js-payment-summary-estimated-tax').innerText = `$${formatCurrency(estimatedTax)}`;
    return totalCost(paymentBeforeTax, estimatedTax);
}

export function totalCost(paymentBeforeTax, estimatedTax){
    let total = paymentBeforeTax + estimatedTax;
    total = formatCurrency(total);
    document.querySelector('.js-payment-summary-order-total').innerText = `$${total}`;
    order.placeOrder(total);
    return total;
}

document.addEventListener('DOMContentLoaded', () => {
    loadProductsFetch().then(() => {
        totalItems();
        paymentBeforeTax();
    });
  });
  