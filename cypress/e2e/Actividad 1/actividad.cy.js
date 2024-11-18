describe('Actividad 1', {testIsolation:false},()=> {

    it('Visitar página',()=> {
        cy.visit('https://automationintesting.online/')
    })

    it('Verificar que la información del hotel esté presente en la página',()=> {
        cy.contains('Shady Meadows B&B').should('be.visible')
        cy.contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S').should('be.visible')
        cy.contains('012345678901').should('be.visible')
        cy.contains('fake@fakeemail.com').should('be.visible')
    })

    it('Asegurar que haya al menos una imagen visible', ()=> {
        cy.get('img').should('be.visible').and('have.length.greaterThan', 0)
    })

    it('Confirmar que el texto de la descripción del hotel sea el esperado',()=> {
        cy.get('.hotel-description').should('have.text', 'Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.')
    })
})

describe('Enviar mensaje',{testIsolation:false},() =>{

    it('Validar envío de form vacío', () => {
        cy.visit('https://automationintesting.online/')
        cy.log('Envío de form de contacto en blanco...')
        cy.get('#submitContact').click()
        cy.get('.alert').should('be.visible')
        cy.verifyErrorMessages([
            'Subject must be between 5 and 100 characters.',
            'Subject may not be blank',
            'Name may not be blank',
            'Message must be between 20 and 2000 characters.',
            'Message may not be blank',
            'Email may not be blank',
            'Phone may not be blank',
            'Phone must be between 11 and 21 characters.'
        ])
    })

    it('Validar envío de form con data incorrecta',()=>{
        cy.log('Set de datos incorrectos...')
        cy.fillContactForm('asd', 'asdasd', 'asdasd', 'asdasd', 'asdasd')
        cy.get('#submitContact').click()

        cy.get('.alert').should('be.visible')
        cy.verifyErrorMessages([
            'Phone must be between 11 and 21 characters.',
            'debe ser una dirección de correo electrónico con formato correcto',
            'Message must be between 20 and 2000 characters.'
        ])
    })


    it('Validar envío de form con data correcta',()=>{
        cy.log('Set de datos correctos...')
        cy.fillContactForm('Juan Pérez', 'juan@gmail.com', '35123696457', 'Reserva de habitación para fecha X', 'loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo')
        cy.get('#submitContact').click()
    })
})