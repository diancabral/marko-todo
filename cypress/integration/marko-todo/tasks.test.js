describe('Create', () => {

    it('First load with 10 fake tasks', () => {

        cy.visit('/')

        const list = cy.get('.app__list__title')

        list.should('have.length', 10)
        list.then(items => {

            items.each((index, item) => {

                expect(item.innerText).to.equal('Tarefa de teste ' + (10 - index))

            })

        })

        cy.get('.app__actions__trigger').first().should('have.text', '10 items left')

    })

    it('Create 3 tasks', () => {

        const list = '.app__list__title'
        const tasks = [

            'Comprar salgadinhos para a festa de fim de ano',
            'Mandar cartão de natal para os amigos',
            'Gravar CD de músicas natalinas'
        ]

        cy.visit('/')

        tasks.forEach(task => {

            cy.get('.input')
            .type(task, { delay: 1 })
            .type('{enter}')

            cy.get(list).eq(0).should('have.text', task)

        })

        cy.get(list).should('have.length', 13)

        cy.get('.app__actions__trigger').first().should('have.text', '13 items left')

    })

    it('Create a task and try create again with same data', () => {

        const list = '.app__list__title'

        cy.visit('/')

        cy.get('.input')
        .type('Enviar planilha financeira por e-mail')
        .type('{enter}')

        cy.get(list).first().should('have.text', 'Enviar planilha financeira por e-mail')

        cy.get(list).should('have.length', 11)
        cy.get('.app__actions__trigger').first().should('have.text', '11 items left')

        cy.get('.input')
        .type('Enviar planilha financeira por e-mail')
        .type('{enter}')

        cy.get(list).should('have.length', 11)
        cy.get('.app__actions__trigger').first().should('have.text', '11 items left')

    })

    it('Create a task with less than 3 chars should do nothing', () => {

        const list = '.app__list__title'

        cy.visit('/')

        cy.get('.input')
        .type('foo')
        .type('{enter}')

        cy.get(list).should('have.length', 10)
        cy.get('.app__actions__trigger').first().should('have.text', '10 items left')

    })

    it('Create a task with longer than 3 chars should add the task', () => {

        const list = '.app__list__title'

        cy.visit('/')

        cy.get('.input')
        .type('café')
        .type('{enter}')

        cy.get(list).first().should('have.text', 'café')

        cy.get(list).should('have.length', 11)
        cy.get('.app__actions__trigger').first().should('have.text', '11 items left')

    })

})
