@E2E @Search @Flipkart
Feature: Search Functionality on Flipkart

  As a Flipkart user
  I want to search for Samsung mobile phones
  So that I can view relevant products and their specifications

  Background:
    Given the user opens the browser
    And navigates to the Flipkart homepage
    And closes any login popup if displayed

  @Smoke @Regression @mobile
  Scenario Outline: Search for various Samsung mobile models and verify search results
    When the user enters "<search_keyword>" into the search bar
    And clicks on the search button
    Then the page title should contain "<expected_title>"
    And the search results header should display "<search_keyword>"
   
    Examples:
      | search_keyword        | expected_title  | expected_brand |
      | Samsung Galaxy S24    | Samsung         | Samsung        |
      | Samsung Galaxy M34    | Samsung         | Samsung        |
