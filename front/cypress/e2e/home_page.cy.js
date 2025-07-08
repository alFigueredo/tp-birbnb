describe("Navigation", () => {
  it("should navigate to the alojamientos page", () => {
    // Start from the index page
    cy.visit("/");

    // Find a link with an href attribute containing "alojamientos" and click it
    cy.get('header a[href*="alojamientos"]').click();

    // The new url should include "/alojamientos"
    cy.url().should("include", "/alojamientos");

    // The new page should contain an h1 with "Alojamientos"
    cy.get("h1").contains("Alojamientos");
  });
});
