describe("Rulebook", function () {
  beforeEach(function () {
    cy.visit("http://localhost:8080")
  })

  it("front page can be opened", function () {
    cy.contains("On this site one can find well-formatted rules for Magic the Gathering")
  })

  it("first chapter can be opened", function () {
    cy.get("#chapter-1").click()
    cy.contains("1. Game Concepts")
    cy.contains("Always try to attack.")
  })

  describe("chapter", function () {
    beforeEach(function () {
      cy.get("#chapter-2").click()
    })

    it("reference is linked correctly", function () {
      cy.get("#ref-101\\.2a").click()
      cy.url().should("include", "/chapter/1#101.2a")
    })

    it("line break is parsed correctly", function () {
      cy.get("#200\\.2a")
      cy.contains(/Nor less than 0\.\sExample: 232 fairies\./)
    })
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

    it("correct error message on no results", function () {
      cy.get("#search-box").type("qwerty")
      cy.contains("No results.")
    })

    it("correct error message when less than 3 characters", function () {
      cy.get("#search-box").type("aa")
      cy.contains("At least 3 characters.")
    })

    it("rule 101.2a is found", function () {
      cy.get("#search-box").type("101.2a")
      cy.contains("It has to be more than 0%.")
    })

    it("2 rules and 1 chapter about dragons are found", function () {
      cy.get("#search-box").type("dragon")
      cy.get("#search-results").find(".MuiPaper-root").should("have.length", 3)
      cy.contains("Dragons are good at defence.")
      cy.contains("One cannot command more than 100 dragons at the same time.")
    })
  })

  it("replace can be opened", function () {
    cy.get("#replace-btn").click()
    cy.contains("Enter a direct URL to a correctly formatted text file to replace the rulebook on the site.")
  })

  describe("replace", function () {
    beforeEach(function () {
      cy.get("#replace-btn").click()
    })

    it("correct error message on invalid url", function () {
      cy.get("#url-input").type("qwerty")
      cy.contains("Not a valid URL.")
    })

    it("correct message on valid url", function () {
      cy.get("#url-input").type("https://example.com")
      cy.contains("✔️ Valid URL.")
    })

    it("correct error message on valid url but invalid content", function () {
      cy.get("#url-input").type("https://example.com")
      cy.get("#submit-url-btn").click()
      cy.contains("There was a problem trying to parse the given file.")
    })
  })
})
