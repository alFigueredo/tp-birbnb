describe("Navegación y error al reservar", () => {
  it("Debería navegar al primer alojamiento y forzar errores al reservar", () => {
    cy.visit("/alojamientos");
    cy.url().should("include", "/alojamientos");
    cy.get(
      '[data-cy="aloja-cards-container"] div:first-child [data-cy="aloja-info-link"]',
    ).click();
    cy.url().should("include", "/alojamientos");

    cy.get("main button").should("have.text", "Reservar");
    cy.get("main button").click();
    cy.get("main form button").should("have.text", "Realizar reserva");

    cy.get("#cantHuespedes").type(3);
    cy.get("#fechaInicio").type("2025-04-03");
    cy.get("#fechaFin").type("2025-04-07");
    cy.get("#cantHuespedes").should("have.value", 3);
    cy.get("#fechaInicio").should("have.value", "2025-04-03");
    cy.get("#fechaFin").should("have.value", "2025-04-07");
    cy.get("main form button").click();
    cy.get('[data-cy="mensaje-reserva"]').should(
      "contain.text",
      "La fecha de inicio del alojamiento ya pasó",
    );

    cy.get("#fechaFin").type("2025-04-02");
    cy.get("#fechaFin").should("have.value", "2025-04-02");
    cy.get("main form button").click();
    cy.get('[data-cy="mensaje-reserva"]').should(
      "contain.text",
      "Rango de fechas incorrecto",
    );
  });
});
