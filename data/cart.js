export const cart = [
     {
          id: "bc2847e9-5323-403f-b7cf-57fde044a955",
          quantity: 3,
     }
];
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