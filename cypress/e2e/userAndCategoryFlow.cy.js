describe('Qubika Sports Club - User & Category flow (API + UI)', () => {
    let newUser = {
      email: '',
      password: 'Test1234!'
    };
    let accessToken = '';
    let parentCategoryId = '';
  
    before(() => {
      const randomId = Date.now();
      newUser.email = `test.user.${randomId}@mail.com`;
  
      cy.request({
        method: 'POST',
        url: 'https://api.club-administration.qa.qubika.com/api/auth/register',
        body: {
          email: newUser.email,
          password: newUser.password,
          roles: ['ROLE_USER']
        },
        failOnStatusCode: false
      }).then((res) => {
        expect([200, 201]).to.include(res.status);
      });
  
      cy.request({
        method: 'POST',
        url: 'https://api.club-administration.qa.qubika.com/api/auth/login',
        body: {
          email: newUser.email,
          password: newUser.password
        }
      }).then((res) => {
        expect(res.status).to.eq(200);
        accessToken = res.body.token;
      });
    });
  
    it('Logs in via UI, creates categories via API and validates them in UI', () => {
        const parentCategoryName = `JMP ${Date.now()}`;
        const subCategoryName = `JMP Subcategory ${Date.now()}`;
      
        cy.visit('https://club-administration.qa.qubika.com/#/auth/login');
        cy.get('input[type="email"]').type(newUser.email);
        cy.get('input[type="password"]').type(newUser.password);
        cy.get('button[type="submit"]').click();
        cy.url().should('not.include', '/login');
        cy.contains('Dashboard').should('exist');
      
        cy.request({
          method: 'POST',
          url: 'https://api.club-administration.qa.qubika.com/api/category-type/create',
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          body: {
            name: parentCategoryName,
            root: true
          }
        }).then((res) => {
          expect([200, 201]).to.include(res.status);
          const parentCategoryId = res.body.id;
      
          cy.request({
            method: 'POST',
            url: 'https://api.club-administration.qa.qubika.com/api/category-type/create',
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            body: {
              name: subCategoryName,
              parentId: parentCategoryId,
              root: false
            }
          }).then((res2) => {
            expect([200, 201]).to.include(res2.status);
            cy.contains('Tipos de Categorias').click();
            cy.wait(1000)
            cy.get('.page-link').contains('324').click({force: true});
            cy.contains(parentCategoryName).should('exist');
            cy.contains(subCategoryName).should('exist');
          });
        });
      });
  });
  