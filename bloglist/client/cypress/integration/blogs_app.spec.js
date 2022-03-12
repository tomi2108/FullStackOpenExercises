describe("Blog app", function () {
  it("front page can be opened", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Log in to app");
  });
  describe("when front page is loaded", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/tests/reset");
      const newUser = {
        username: "admin",
        password: "admin",
        name: "admin",
      };
      cy.request("POST", "http://localhost:3003/api/users", newUser);
      cy.visit("http://localhost:3000/");
      cy.contains("Show login").click();
    });
    describe("login", function () {
      it("succeeds with correct credentials", () => {
        cy.get("[placeholder=Username]").type("admin");
        cy.get("[placeholder=Password]").type("admin");
        cy.contains("Login").click();
        cy.contains("admin logged in");
      });
      it("fails with wrong credentials", () => {
        cy.get("[placeholder=Username]").type("admin");
        cy.get("[placeholder=Password]").type("wrong");
        cy.contains("Login").click();
        cy.contains("wrong username or password");
      });
    });
    describe("when logged in", () => {
      beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/login", { username: "admin", password: "admin" }).then((resp) => {
          window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(resp.body));
          cy.visit("http://localhost:3000/");
        });
      });
      it("user can create a blog", () => {
        cy.contains("Add blog").click();
        cy.get("[placeholder=title]").type("This is a new blog");
        cy.get("[placeholder=author]").type("Cypress");
        cy.get("[placeholder=url]").type("CypressBlogs.com");
        cy.contains("Save").click();
      });
      describe("and there is as blog", () => {
        beforeEach(function () {
          cy.createBlog({ title: "this blog was here", author: "cypress", url: "cypress.com" });
        });
        it("user can like it", () => {
          cy.contains("View").click();
          cy.contains("likes").contains("0");
          cy.contains("like").click();
          cy.contains("likes").contains("1");
        });
        it("user can delete it", () => {
          cy.contains("View").click();
          cy.contains("delete").click();
          cy.get("html").should("not.contain", "this blog was here");
        });
      });
      describe("and there are many blogs", () => {
        beforeEach(function () {
          cy.createBlog({ title: "this blog will be liked once", author: "cypress", url: "cypress.com", likes: 1 });
          cy.createBlog({ title: "this blog will be liked twice", author: "cypress", url: "cypress.com", likes: 2 });
          cy.createBlog({ title: "this blog will be liked thrice", author: "cypress", url: "cypress.com", likes: 3 });
        });
        it("they are ordered by likes", () => {
          cy.get("#blog0").contains("this blog will be liked thrice").parent().contains("View").click().parent().contains("likes").contains("3");
          cy.get("#blog1").contains("this blog will be liked twice").parent().contains("View").click().parent().contains("likes").contains("2");
          cy.get("#blog2").contains("this blog will be liked once").parent().contains("View").click().parent().contains("likes").contains("1");
        });
      });
    });
  });
});
