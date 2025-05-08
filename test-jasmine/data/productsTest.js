import {Product} from '../../data/products.js';

describe('Test Suite: Product class', ()=>{
    const product1 = new Product({
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
          stars: 4.5,
          count: 87
        },
        priceCents: 1090,
        keywords: [
          "socks",
          "sports",
          "apparel",
        ]
      },);

    it ('Create a product class successfuly', ()=>{

        expect(product1.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(product1.name).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(product1.image).toEqual('images/products/athletic-cotton-socks-6-pairs.jpg');
        expect(product1.rating.stars).toEqual(4.5);
        expect(product1.rating.count).toEqual(87);
        expect(product1.priceCents).toEqual(1090);
    });

    it('Renders star URL to DOM correctly', () => {
        const container = document.querySelector('.js-products');
        container.innerHTML = `${product1.getStarsUrl()}`;
        expect(container.innerHTML).toBe('images/ratings/rating-45.png');
    });
});