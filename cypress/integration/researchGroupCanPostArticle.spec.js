describe("RG can post article", () => {
  beforeEach(function() {
    cy.server();
  });

  it("successfuly", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v0/articles",
      response: "fixture:successful_saving_article_response.json"
    });
    cy.login("harvard@mail.com", "password");
    // make sure that #create-article button cant be seen before login in
    // and that users with the role of "rg_user" can see the button
    cy.get("#create-article").click();
    cy.get("#post-article-form").within(() => {
      cy.get("#author").type("John Doe");
      cy.get("#title").type("To be or not to be");
      cy.get("#body").type(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      );
      cy.get("#submit-button").click();
    });
    cy.contains("Post successfully created");
  });

  it("unsuccessfuly", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v0/articles",
      response: "fixture:unsuccessful_saving_article_response.json",
      status: 404
    });
    cy.login("harvard@mail.com", "password");

    cy.get("#create-article").click();
    cy.get("#post-article-form").within(() => {
      cy.get("#author").type("John Doe");
      cy.get("#body").type(
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      );
      cy.get("#submit-button").click();
    });
    cy.contains("Title cant be blank");
  })

  // make sad path where user role is something different then "rg_user" 
  // and make sure that user cant see the #create-article button
});
