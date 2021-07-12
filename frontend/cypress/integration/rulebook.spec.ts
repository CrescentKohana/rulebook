describe("Rulebook", function () {
  beforeEach(function () {
    cy.visit("http://localhost:8080")
  })

  it("front page can be opened", function () {
    cy.contains("On this site one can find well-formatted rules for Magic the Gathering.")
  })

  it("first chapter can be opened", function () {
    cy.get("#chapter-1").click()
    cy.contains("1. Game Concepts")
    cy.contains("Always try to attack.")
  })

  it("search can be opened", function () {
    cy.get("#search-btn").click()
    cy.contains("Search for rules")
    cy.contains("Format for finding an exact rule: 100.1a")
  })

  describe("search", function () {
    beforeEach(function () {
      cy.get("#search-btn").click()
    })

    it("rule 101.2a is found", function () {
      cy.get("#search-box").type("101.2a")
      cy.contains("It has to be more than 0%.")
    })

    it("2 rules and 1 chapter about dragons are found", function () {
      cy.get("#search-box").type("dragon")
      cy.get("#search-results").find("li").should("have.length", 3)
      cy.contains("Dragons are good at defence.")
      cy.contains("One cannot command more than 100 dragons at the same time.")
    })
  })
})
