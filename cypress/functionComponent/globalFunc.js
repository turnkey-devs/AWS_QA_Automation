export class Global {
  loginAffiliate(email, password) {
    // Input email
    cy.get('input[id="email"]').type(email).should('have.value', email);
    cy.wait(1000);

    // Input password
    cy.get('input[id="password"]').type(password).should('have.value', password);
    cy.wait(1000);

    // Klik tombol login
    cy.get('button[type="submit"]').click();
    cy.wait(10000);
    cy.get('h4').contains('Overview').should('be.visible'); // Pastikan berhasil login kehalaman dashboard
  }

  randomChar() {
    const randChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let empySpace = '';
    for (let i = 0; i < 3; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `Autoname_${empySpace}`;
  }

  randomEmail() {
    const randChar = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let empySpace = '';
    for (let i = 0; i < 5; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `auto_${empySpace}@gmail.com`;
  }

  randomNumberPhone() {
    const randChar = '0123456789';
    let empySpace = '';
    for (let i = 0; i < 10; i++) {
      empySpace += randChar[Math.floor(Math.random() * randChar.length)];
    }

    return `08${empySpace}`;
  }

  randomDropdownValue(selectPath, element) {
    // Logika untuk random value dropdown
    const randNumber = Math.floor(Math.random() * element.length);

    // Pilih items dropdown
    const valueDrop = element[randNumber].text;
    cy.get(selectPath).select(valueDrop);
    cy.wait(1000);
  }

  randomPass() {
    const charUpperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charLowerCase = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';

    let empySpace = ''; // Deklarasi empty variabel

    // Input uppercase
    for (let i = 0; i < 2; i++) {
      empySpace += charUpperCase[Math.floor(Math.random() * charUpperCase.length)];
    }

    // Input lowercase
    for (let i = 0; i < 4; i++) {
      empySpace += charLowerCase[Math.floor(Math.random() * charLowerCase.length)];
    }

    // Input number
    for (let i = 0; i < 2; i++) {
      empySpace += number[Math.floor(Math.random() * number.length)];
    }

    return `${empySpace}`;
  }
}
