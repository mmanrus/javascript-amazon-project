export const cart = [];
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
     productId: productId,
     quantity: 1,
     });
     }
}