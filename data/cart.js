
const storedCart = localStorage.getItem('cart');
export var cart = storedCart ? JSON.parse(storedCart): 
[{id: "bc2847e9-5323-403f-b7cf-57fde044a955", quantity: 3, deliveryOptionId: '1'}];
console.log(cart);
function saveToStorage(){
     localStorage.setItem('cart', JSON.stringify(cart));
}
export function addToCart (productId){
     let found = false;
          cart.forEach((item)=>{
          if (productId === item.id){
          item.quantity++;
          found = true;
     }
     });
     if (!found){
          cart.push({
          id: productId,
          quantity: 1,
          deliveryOptionId: '1',
          });
     };
     saveToStorage();
}

export function removeFromCart (productId){
     const newCart =[];
     cart.forEach(cartItem => {
          if (cartItem.productId !== productId) {
               newCart.push(cartItem);
          }
     });
     cart = newCart;
     saveToStorage(cart);
}

export function updateDeliveryOption(productId, deliveryOptionId){
     let matching;

     cart.forEach((item)=>{
          if (productId === item.id){
          matching = item;
          
          }
     });
     matching.deliveryOptionId = deliveryOptionId;
     saveToStorage();
}