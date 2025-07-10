describe("Error al modificar reserva", () => {
  it("Debería forzar errores al modificar una reserva", () => {
    cy.visit("/reservas");
    cy.url().should("include", "/reservas");
    cy.get(
      '[data-cy="reservas-cards-container"] div:first-child [data-cy="editar-reserva-button"]',
    ).should("have.text", "Editar");

    cy.get(
      '[data-cy="reservas-cards-container"] div:first-child [data-cy="editar-reserva-button"]',
    ).click();
    cy.get("main form button").should("have.text", "Editar reserva");

    cy.get("main form button").click();
    cy.get('[data-cy="mensaje-editar-reserva"]').should(
      "contain.text",
      "Ningún dato ha sido modificado",
    );

    cy.get("#cantHuespedes").clear();
    cy.get("#cantHuespedes").should("have.value", "");
    cy.get("#cantHuespedes").type(49);
    cy.get("#cantHuespedes").should("have.value", 49);
    cy.get("main form button").click();
    cy.get('[data-cy="mensaje-editar-reserva"]').should(
      "contain.text",
      "Cantidad de huéspedes no permitida",
    );
    cy.get("#cantHuespedes").clear();
    cy.get("#cantHuespedes").should("have.value", "");
    cy.get("#cantHuespedes").type(3);
    cy.get("#cantHuespedes").should("have.value", 3);

    cy.get("#fechaInicio").clear();
    cy.get("#fechaInicio").should("have.value", "");
    cy.get("#fechaInicio").type("2025-04-03");
    cy.get("#fechaInicio").should("have.value", "2025-04-03");
    cy.get("main form button").click();
    cy.get('[data-cy="mensaje-editar-reserva"]').should(
      "contain.text",
      "La fecha de inicio del alojamiento ya pasó",
    );
    cy.get("#fechaInicio").clear();
    cy.get("#fechaInicio").should("have.value", "");
  });
});
