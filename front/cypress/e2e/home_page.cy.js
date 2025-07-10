describe("Navegación", () => {
  it("Debería navegar a la página de alojamientos usando el botón 'Explorar alojamientos'", () => {
    cy.visit("/");

    cy.get('[data-cy="get-alojas"]').click();

    cy.url().should("include", "/alojamientos");

    cy.get("main h1").should("contain.text", "Alojamientos");
  });

  it("Debería navegar a la página de alojamientos desde el Header", () => {
    cy.visit("/");

    cy.get('header a[href*="alojamientos"]').click();

    cy.url().should("include", "/alojamientos");

    cy.get("main h1").should("contain.text", "Alojamientos");
  });

  it("Debería navegar a la página de reservas desde el Header", () => {
    cy.visit("/");

    cy.get('header a[href*="reservas"]').click();

    cy.url().should("include", "/reservas");

    cy.get("main h1").should("contain.text", "Reservas");
  });
});
