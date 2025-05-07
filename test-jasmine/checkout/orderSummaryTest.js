import * as cartModule from '../../data/cart.js';
    import {productById} from '../../data/products.js';
    import {deliveryOptions} from '../../data/deliveryOptions.js';
    import * as summary from '../../scripts/checkout/orderSummary.js';

    // Mock cart and product data for testing
    cartModule.cart = [
      {id: '1', quantity: 2, deliveryOptionId: '1'}, // Mock product 1
      {id: '2', quantity: 1, deliveryOptionId: '2'}  // Mock product 2
    ];

    // Mock product data
    productById = {
      '1': {priceCents: 1000, name: 'Athletic Cotton Socks', image: 'path/to/image1.jpg'},
      '2': {priceCents: 2000, name: 'Basketball', image: 'path/to/image2.jpg'}
    };

    // Mock delivery options
    deliveryOptions = [
      {id: '1', priceCents: 0, deliveryDays: 5},
      {id: '2', priceCents: 500, deliveryDays: 3}
    ];

    describe('Order Summary Calculations', () => {
      beforeEach(() => {
        // Clear inner HTML before each test
        document.querySelector('.js-items').innerText = '';
        document.querySelector('.js-payment-summary-money').innerText = '';
        document.querySelector('.js-payment-summary-shipping').innerText = '';
        document.querySelector('.js-payment-summary-before-tax').innerText = '';
        document.querySelector('.js-payment-summary-estimated-tax').innerText = '';
        document.querySelector('.js-payment-summary-order-total').innerText = '';
      });

      it('should update the total items count', () => {
        summary.totalItems();
        expect(document.querySelector('.js-items').innerText).toBe('Items (3)');
      });

      it('should calculate item payment', () => {
        const expectedTotal = 2 * 1000 + 1 * 2000; // 2 socks * 1000 + 1 basketball * 2000
        const paymentSummary = summary.calculateItemPayment();
        expect(paymentSummary).toBe(expectedTotal);
        expect(document.querySelector('.js-payment-summary-money').innerText).toBe('$50.00');
      });

      it('should calculate shipping costs', () => {
        const expectedShipping = 0 + 500; // Free shipping for socks + $5 shipping for basketball
        const shippingCost = summary.calculateShipping();
        expect(shippingCost).toBe(expectedShipping);
        expect(document.querySelector('.js-payment-summary-shipping').innerText).toBe('$5.00');
      });

      it('should calculate total before tax', () => {
        const expectedTotalBeforeTax = 5000 + 500; // Item total + shipping total
        const totalBeforeTax = summary.paymentBeforeTax();
        expect(totalBeforeTax).toBe(expectedTotalBeforeTax);
        expect(document.querySelector('.js-payment-summary-before-tax').innerText).toBe('$55.00');
      });

      it('should calculate estimated tax (10%)', () => {
        const totalBeforeTax = 5500; // From previous test
        const expectedTax = totalBeforeTax * 0.10;
        summary.estimatedTax(totalBeforeTax);
        expect(document.querySelector('.js-payment-summary-estimated-tax').innerText).toBe('$5.50');
      });

      it('should calculate the total cost (including tax)', () => {
        const totalBeforeTax = 5500;
        const expectedTax = totalBeforeTax * 0.10;
        const expectedTotal = totalBeforeTax + expectedTax;
        summary.totalCost(totalBeforeTax, expectedTax);
        expect(document.querySelector('.js-payment-summary-order-total').innerText).toBe('$60.50');
      });
    });