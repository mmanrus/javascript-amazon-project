class Cart {
     cartItems = undefined;
     localStorageKey = undefined;
     
     constructor(localStorageKey) {
          this.localStorageKey = localStorageKey;
          // Load cart immediately when the module runs
          this.loadFromStorage();
          
     }

     loadFromStorage() {
          const storedCart = localStorage.getItem(this.localStorageKey);
          this.cartItems = storedCart
          ? JSON.parse(storedCart)
          : [{
               id: "bc2847e9-5323-403f-b7cf-57fde044a955",
               quantity: 3,
               deliveryOptionId: '1'
          }];
     }

     saveToStorage() {
          localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
     }
     addToCart (productId){
          let found = false;
               this.cartItems.forEach((item)=>{
               if (productId === item.id){
               item.quantity++;
               found = true;
          }
          });
          if (!found){
               this.cartItems.push({
               id: productId,
               quantity: 1,
               deliveryOptionId: '1',
               });
          };
          this.saveToStorage();
     }
     removeFromCart (productId){
          const newCart =[];
          this.cartItems.forEach(cartItem => {
               if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
               }
          });
          this.cartItems = newCart;
          this.saveToStorage();
     }
     updateDeliveryOption(productId, deliveryOptionId){
          let matching;
     
          this.cartItems.forEach((item)=>{
               if (productId === item.id){
                    matching = item;
               
               }
          });
          matching.deliveryOptionId = deliveryOptionId;
          saveToStorage();
     }
}

const businessCart = new Cart('cart-oop');

const cart = new Cart('cart-');


cart.addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
console.log(cart);
console.log(businessCart instanceof Cart)
console.log(businessCart);



