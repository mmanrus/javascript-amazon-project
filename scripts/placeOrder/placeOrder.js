import * as cartModule from '../../data/cart.js';
import * as orderData from '../../data/orders.js';
import * as summary from '../../scripts/checkout/orderSummary.js';

export function placeOrder(total){
    document.querySelector('.js-place-order-button')
    .addEventListener('click', async ()=>{  
  
        console.log('Total:', total); // numeric
        try{
            /*
            const response = await fetch('https://supersimplebackend.dev/orders', {method:'POST', headers: {
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cartModule.cart
                })
            });
            const order = await response.json();
            console.log(order)
            //orderData.addOrder(order);
            */
        }catch(error){
            console.log(error);
        }
        orderData.addOrder(cartModule.cart, total);
        window.location.href = 'orders.html';

    });
}

