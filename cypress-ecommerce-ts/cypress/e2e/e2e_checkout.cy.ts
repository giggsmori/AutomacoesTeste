function uniqueEmail() {
  const ts = Date.now();
  return `qa.${ts}@mailinator.com`;
}

describe('Fluxo completo de compra', () => {
  it('Cadastro -> Login -> Produto -> Carrinho -> Checkout -> Pagamento -> Sucesso', () => {
    const user = {
      name: 'QA User',
      email: uniqueEmail(),
      password: 'P@ssw0rd123',
      address: '123 Test Street',
      country: 'Canada',
      state: 'Alberta',
      city: 'Calgary',
      zipcode: 'T1X 1X1',
      mobile: '+14035550123'
    };

    cy.visit('/');
    cy.url().should('contain', 'automationexercise');

    cy.contains('a', /Signup \/ Login/i).click();
    cy.contains('h2', /New User Signup!/i).should('be.visible');

    cy.get('#form input[name="name"]').type(user.name);
    cy.get('#form input[data-qa="signup-email"]').type(user.email);
    cy.contains('button', /Signup/i).click();

    cy.get('body').then(($b) => {
      if ($b.find('input#id_gender1').length) cy.get('input#id_gender1').check({ force: true });
    });

    cy.get('input#password').type(user.password);
    cy.get('#days').select('10', { force: true });
    cy.get('#months').select('May', { force: true });
    cy.get('#years').select('1990', { force: true });
    cy.get('#newsletter').check({ force: true });
    cy.get('#optin').check({ force: true });

    cy.get('#first_name').type(user.name);
    cy.get('#last_name').type('Tester');
    cy.get('#address1').type(user.address);
    cy.get('#country').select(user.country, { force: true });
    cy.get('#state').type(user.state);
    cy.get('#city').type(user.city);
    cy.get('#zipcode').type(user.zipcode);
    cy.get('#mobile_number').type(user.mobile);

    cy.contains('button', /Create Account/i).click();
    cy.contains('h2', /Account Created!/i, { timeout: 20000 }).should('be.visible');
    cy.contains('a', /Continue/i).click({ force: true });
    cy.contains('a', /Logged in as/i, { timeout: 15000 }).should('be.visible');

    // Products
    cy.contains('a', /Products/i).click();
    cy.url().should('contain', '/products');

    cy.get('.product-image-wrapper').first().trigger('mouseover', { force: true });
    cy.get('a.add-to-cart').first().click({ force: true });

    cy.get('#cartModal', { timeout: 15000 }).should('be.visible');
    cy.get('#cartModal').within(() => {
      if (Cypress.$('a:contains("View Cart")').length) {
        cy.contains('a', /View Cart/i).click();
      } else {
        cy.contains('button', /Continue Shopping/i).click({ force: true });
        cy.contains('a', /Cart/i).click();
      }
    });

    cy.contains('a', /Proceed To Checkout/i).click({ force: true });

    cy.contains('a,button', /Place Order/i).click({ force: true });

    cy.get('input[name="name_on_card"]').type('QA Tester', { force: true });
    cy.get('input[name="card_number"]').type('4111111111111111', { force: true });
    cy.get('input[name="cvc"]').type('123', { force: true });
    cy.get('input[name="expiry_month"]').type('12', { force: true });
    cy.get('input[name="expiry_year"]').type('2030', { force: true });

    cy.contains('button', /Pay and Confirm Order/i).click({ force: true });

    cy.contains(/Order Placed|success/i, { timeout: 20000 }).should('be.visible');
  });
});
