
const storedCart = localStorage.getItem('cart');
export var cart = storedCart ? JSON.parse(storedCart): [ {id: "bc2847e9-5323-403f-b7cf-57fde044a955", quantity: 3,}];
function saveToStorage(){
     localStorage.setItem('cart', JSON.stringify(cart));
     console.log(`Saved to cart: ${cart}`);
}
export function addToCart (productId){
     let found = false;
          cart.forEach((item)=>{
          if (productId === item.productId){
          item.quantity++;
          found = true;
     }
     });
     if (!found){
          cart.push({
          id: productId,
          quantity: 1,
          });
     };
     console.log(cart);
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
     console.log(cart);
     saveToStorage(cart);
}