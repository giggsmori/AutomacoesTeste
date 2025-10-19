function uniqueEmail() {
  const ts = Date.now();
  return `qa.${ts}@mailinator.com`;
}

describe('Cadastro e Login - AutomationExercise', () => {
  const routes = {
    home: '/',
    login: '/login'
  };

  it('Cria conta nova, faz logout e depois login', () => {
    cy.fixture('user').then((data) => {
      const user = { ...data, email: uniqueEmail() };

      // Acessa home
      cy.visit(routes.home);
      cy.url().should('contain', 'automationexercise');

      // Vai para Login/Signup
      cy.contains('a', /Signup \/ Login/i).click();
      cy.contains('h2', /New User Signup!/i).should('be.visible');

      // Inicia cadastro
      cy.get('#form').within(() => {
        cy.get('input[name="name"]').type(user.name);
        cy.get('input[data-qa="signup-email"]').type(user.email);
      });
      cy.contains('button', /Signup/i).click();

      // Completa formulário de cadastro
      cy.get('body').then(($body) => {
        // Title
        if ($body.find('input#id_gender1').length) {
          cy.get('input#id_gender1').check({ force: true });
        }
      });

      cy.get('input#password').type(user.password);

      // Data (opcional)
      cy.get('#days').select('10', { force: true });
      cy.get('#months').select('May', { force: true });
      cy.get('#years').select('1990', { force: true });

      // Newsletters (opcional)
      cy.get('input#newsletter').check({ force: true });
      cy.get('input#optin').check({ force: true });

      // Address info
      cy.get('input#first_name').type(user.name);
      cy.get('input#last_name').type('Tester');
      cy.get('input#address1').type(user.address);
      cy.get('#country').select(user.country, { force: true });
      cy.get('input#state').type(user.state);
      cy.get('input#city').type(user.city);
      cy.get('input#zipcode').type(user.zipcode);
      cy.get('input#mobile_number').type(user.mobile);

      cy.contains('button', /Create Account/i).click();

      // Conta criada
      cy.contains('h2', /Account Created!/i, { timeout: 15000 }).should('be.visible');
      cy.contains('a', /Continue/i).click({ force: true });

      // Confirmar sessão iniciada
      cy.contains('a', /Logged in as/i, { timeout: 15000 }).should('be.visible');

      // Logout
      cy.contains('a', /Logout/i).click();
      cy.contains('a', /Signup \/ Login/i).should('be.visible');

      // Login com a conta criada
      cy.contains('a', /Signup \/ Login/i).click();
      cy.get('input[data-qa="login-email"]').type(user.email);
      cy.get('input[data-qa="login-password"]').type(user.password);
      cy.contains('button', /Login/i).click();

      // Sessão iniciada novamente
      cy.contains('a', /Logged in as/i).should('be.visible');
    });
  });
});
