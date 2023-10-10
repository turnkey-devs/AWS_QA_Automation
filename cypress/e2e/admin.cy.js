import { Global } from './../functionComponent/globalFunc';
import { Admin } from './../functionComponent/adminFunc';

const globalFunction = new Global();
const adminFunction = new Admin();

describe('AWS - Admin Feature ', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(Cypress.env('AWS_BASE_URL'));
    cy.wait(10000);
  });

  it('Create New Admin', () => {
    const emailLogin = Cypress.env('EMAIL');
    const passwordLogin = Cypress.env('PASSWORD');

    // Login
    globalFunction.loginAffiliate(emailLogin, passwordLogin);

    // Klik tombol Admin di sidebar
    cy.get('button').contains('Admin').click();
    cy.wait(2000);
    cy.get('a[href="/admin/new/"]').should('be.visible');

    // Generate nama, email, phone, dan password untuk create admin baru
    const nama = globalFunction.randomChar();
    const email = globalFunction.randomEmail();
    const phone = globalFunction.randomNumberPhone();
    const password = globalFunction.randomPass();

    // Membuat admin baru
    adminFunction.createNewAdmin(nama, email, phone, password);
  });

  it('Edit Selected Admin', () => {
    const emailLogin = Cypress.env('EMAIL');
    const passwordLogin = Cypress.env('PASSWORD');

    // Login
    globalFunction.loginAffiliate(emailLogin, passwordLogin);

    // Klik tombol Admin di sidebar
    cy.get('button').contains('Admin').click();
    cy.wait(2000);
    cy.get('a[href="/admin/new/"]').should('be.visible');

    // Generate nama, phone untuk edit admin
    const nama = globalFunction.randomChar();
    const phone = globalFunction.randomNumberPhone();

    // Edit admin yang ada
    adminFunction.editAdminInformation(nama, phone);
  });

  it('Change Password Selected Admin', () => {
    const emailLogin = Cypress.env('EMAIL');
    const passwordLogin = Cypress.env('PASSWORD');

    // Login
    globalFunction.loginAffiliate(emailLogin, passwordLogin);

    // Klik tombol Admin di sidebar
    cy.get('button').contains('Admin').click();
    cy.wait(2000);
    cy.get('a[href="/admin/new/"]').should('be.visible');

    // Generate password
    const password = globalFunction.randomPass();

    // Ganti password user
    adminFunction.changeAdminPassword(password);
  });

  it('Delete Selected Admin', () => {
    const emailLogin = Cypress.env('EMAIL');
    const passwordLogin = Cypress.env('PASSWORD');

    // Login
    globalFunction.loginAffiliate(emailLogin, passwordLogin);

    // Klik tombol Admin di sidebar
    cy.get('button').contains('Admin').click();
    cy.wait(2000);
    cy.get('a[href="/admin/new/"]').should('be.visible');

    // Edit selected admin
    adminFunction.deleteAdmin();
  });
});
