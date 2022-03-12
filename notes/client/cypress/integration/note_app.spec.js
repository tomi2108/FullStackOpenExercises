describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/tests/reset");
    const user = {
      name: "tomi",
      username: "tomi123",
      password: "tomi123",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });
  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, Department of Computer Science, University of Helsinki 2022");
  });
  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("tomi123");
    cy.get("#password").type("wrong");
    cy.get("#login-btn").click();

    cy.get(".error").contains("Invalid username or password");
    cy.get("html").should("not.contain", "tomi logged in");
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("tomi123");
    cy.get("#password").type("tomi123");
    cy.get("#login-btn").click();
    cy.contains("tomi logged-in");
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3001/api/login", {
        username: "tomi123",
        password: "tomi123",
      }).then((response) => {
        localStorage.setItem("loggedNoteAppUser", JSON.stringify(response.body));
        cy.visit("http://localhost:3000");
      });
    });
    it("a new note can be created", function () {
      cy.contains("Add note").click();
      cy.get("#note-input").type("a note created by cypress");
      cy.contains("Save").click();
      cy.contains("a note created by cypress");
    });
    describe("and a note exists", function () {
      let note;
      beforeEach(function () {
        note = { content: "created by cypress", important: false };
        cy.createNote(note);
      });

      it("it can be made important", function () {
        cy.contains(`${note.content}`).parent().contains("make important").click();
        cy.contains(`${note.content}`).parent().contains("make not important");
      });
    });
    describe("and several notes exist", function () {
      let firstNote;
      let secondNote;
      let thirdNote;
      beforeEach(function () {
        firstNote = { content: "first note", important: false };
        secondNote = { content: "second note", important: false };
        thirdNote = { content: "third note", important: false };
        cy.createNote(firstNote);
        cy.createNote(secondNote);
        cy.createNote(thirdNote);
      });

      it("one of those can be made important", function () {
        cy.contains(`${secondNote.content}`).parent().contains("make important").click();
        cy.contains(`${secondNote.content}`).parent().contains("make not important");
      });
    });
  });
});
