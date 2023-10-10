import { Global } from './globalFunc';

const globalFunction = new Global();

export class Admin {
  createNewAdmin(nama, email, phone, password) {
    // Klik tombol Add Admin
    cy.get('a[href="/admin/new/"]').click();
    cy.wait(5000);
    cy.get('h4').contains('Add New Admin').should('be.visible'); // Pastikan berhasil membuka halaman add new admin

    // Input nama
    cy.get('input[id="name"]').type(nama).should('have.value', nama);
    cy.wait(1000);

    // Input email
    cy.get('input[id="email"]').type(email).should('have.value', email);
    cy.wait(1000);

    // Input phone
    cy.get('input[name="phone_number"]').parent().find('input').type(phone).should('have.value', phone);
    cy.wait(1000);

    // Input role
    cy.get('select[id="role_id" ]')
      .parent()
      .find('option')
      .then(($el) => {
        const listOption = $el.slice(1); // Berisikan list dari option di dropdown
        cy.log(listOption);
        // Masukan kedalam function untuk dipilih random value nya
        globalFunction.randomDropdownValue('select[id="role_id" ]', listOption);
      });

    // Input password & confirm password
    cy.get('input[id="password"]').type(password).should('have.value', password);
    cy.wait(1000);
    cy.get('input[id="confirm_password"]').type(password).should('have.value', password);
    cy.wait(1000);

    // Input file image
    cy.get('input[id="dropzone-file"]').selectFile('cypress/fixtures/PicExample.png', { force: true });
    cy.wait(1000);

    // Klik Submit
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
    cy.get('h2').contains('Congratulations!').should('be.visible'); // Pastikan pop up sukses muncul
    cy.wait(2000);
    cy.get('button').contains('OK').click(); // Klik OK di pop up
    cy.wait(5000);
    cy.get('h4').contains('Admin List').should('be.visible'); // Pastikan direct ke halaman list

    // Check data list admin
    cy.wait(5000);
    cy.get('tbody > tr > td').contains(email).should('be.visible');
  }

  editAdminInformation(nama, phone) {
    // Klik tombol Admin List
    cy.get('a[href="/admin/"]').click();
    cy.wait(10000);
    cy.get('h4').contains('Admin List').should('be.visible'); // Pastikan berhasil membuka halaman list admin

    // Cari admin yang emailnya auto dan klik edit
    cy.get('tbody > tr > td').contains('auto').parent().find('div').eq(0).click();
    cy.wait(10000);

    // Edit nama
    cy.get('input[id="name"]').clear().type(nama).should('have.value', nama);
    cy.wait(1000);

    // Edit phone
    cy.get('input[name="phone_number"]').clear().parent().find('input').type(phone).should('have.value', phone);
    cy.wait(1000);

    // Klik tombol submit
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.wait(2000);
    cy.get('h2').contains('ATTENTION!').should('be.visible'); // Assert pop up muncul
    cy.get('button').contains('OK').click(); // Click OK di pop up
    cy.wait(5000);
    cy.get('h2').contains('Congratulations!').should('be.visible'); // Assert pop up sukses muncul
    cy.get('button').contains('OK').click(); // Click OK di pop up

    // Check data list admin
    cy.wait(5000);
    cy.get('tbody > tr > td').contains(nama).should('be.visible');
    cy.get('tbody > tr > td').contains(phone).should('be.visible');
  }

  changeAdminPassword(password) {
    // Klik tombol Admin List
    cy.get('a[href="/admin/"]').click();
    cy.wait(10000);
    cy.get('h4').contains('Admin List').should('be.visible'); // Pastikan berhasil membuka halaman list admin

    // Cari admin yang emailnya auto dan klik edit
    cy.get('tbody > tr > td').contains('auto').parent().find('div').eq(0).click();
    cy.wait(10000);

    // Click change password
    cy.get('button').contains('Change Password').click();
    cy.wait(2000);
    cy.get('h1').contains('Change Password').should('be.visible'); // Assert pop up is shown

    // Fill new pass & confirm pass
    cy.get('input[id="new_password"]').type(password).should('have.value', password);
    cy.wait(1000);
    cy.get('input[id="confirm_new_password"]').type(password).should('have.value', password);
    cy.wait(1000);

    // Click Submit
    cy.get('button[type="submit"]').eq(1).click();
    cy.wait(5000);
    cy.get('h2').contains('Congratulations!').should('be.visible');
  }

  deleteAdmin() {
    // Click Admin List
    cy.get('a[href="/admin/"]').click();
    cy.wait(10000);
    cy.get('h4').contains('Admin List').should('be.visible'); // Ensure to open admin list page

    // Search admin by email keyword and click delete
    cy.get('tbody > tr > td').contains('auto').parent().find('div').eq(1).click();
    cy.wait(5000);
    cy.get('h2').contains('Attention!').should('be.visible');

    // Delete data admin
    cy.get('button').contains('OK').click(); // Click OK di pop up
    cy.wait(5000);
    cy.get('h2').contains('Success!').should('be.visible'); // Assert pop up success delete is shown
    cy.get('button').contains('OK').click();
    cy.wait(5000);
    cy.get('tbody > tr > td').contains('auto').should('not.exist');
  }
}
