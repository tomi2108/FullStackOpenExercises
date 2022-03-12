Cypress.Commands.add("createNote", ({ content, important }) => {
  cy.request({
    url: "http://localhost:3001/api/notes",
    method: "POST",
    body: { content, important },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem("loggedNoteAppUser")).token}`,
    },
  });

  cy.visit("http://localhost:3000");
});
