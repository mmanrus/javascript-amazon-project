

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(orders, total) {
    const orderWithTotal = {
        items:orders,
        totalCost: total,
    }
    orders.unshift(orderWithTotal);
    console.log(orders);
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