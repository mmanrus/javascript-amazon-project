

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);

    saveToStorage()

}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

function remove(){
        
    localStorage.clear();
    localStorage.removeItem('orders');
    localStorage.removeItem('cart');
        localStorage.removeItem('cartItem');
        console.log('removed');
}

remove();