describe('Lambda Eats app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza');
    });
    it('Sanity test', () => {
        expect(2 + 2).to.equal(4);
        expect(2 + 2).not.to.equal(5);
    });
    const pizzaInput = () => cy.get('input[name="name"]');
    const pepperoni = () => cy.get('[name="pepperoni"]');
    const tomatoes = () => cy.get('[name="tomatoes"]');
    const form = () => cy.get('form');
    const size = () => cy.get('[name="size"]')


    it('test that you can add text to the box', () => {
        pizzaInput().should('exist')
                    .should('have.value', '')
                    .type('Margherita')
                    .should('have.value', 'Margherita');
    })
    it('test that you can select multiple toppings', () => {
        pepperoni().should('not.be.checked')
                   .check()
                   .should('be.checked');
        tomatoes().should('not.be.checked')
                  .check()
                  .should('be.checked');
    })
    it('test that you can submit the form', () => {
        pizzaInput().type('Margherita');
        size().select('Medium, 12"')
              .should('have.value', 'Medium');
        form().submit();
    })
});