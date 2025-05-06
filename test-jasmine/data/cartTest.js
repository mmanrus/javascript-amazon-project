import {addToCart, cart, loadFromStorage} from '../../data/cart.js';


describe('Test Suite: addToCart', ()=>{
    it('adds an existing product to the cart', ()=>{
        spyOn(localStorage, 'setItem').and.callFake(()=>{
            return JSON.stringify();
        });
 
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });

        console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        console.log(cart[0].id);
    });

    it('adds a new product to the cart', ()=>{
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id: 'bc2847e9-5323-403f-b7cf-57fde044a955',
                quantity: 3,
                deliveryOptionId: '1'
            }]);
        });

        console.log(localStorage.getItem('cart'));
        loadFromStorage();
        addToCart('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].id).toEqual('bc2847e9-5323-403f-b7cf-57fde044a955');
        expect(cart[0].quantity).toEqual(4);
        expect(cart[0].deliveryOptionId).toEqual('1');
        console.log(cart[0].id);
    });
});