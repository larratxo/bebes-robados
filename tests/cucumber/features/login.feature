Feature: Allow users to login and logout

  As a user
  I want to login and logout
  So that I can prove my identity and see personalized data

  Background:
    Given I have an account
    Given I am signed out

    @watch
  Scenario: A user can login with username
    Given I am on the home page
    When I click on sign in link
    And I enter my name and password
    Then I should be logged in
    And I can edit my profile

  Scenario: A user can login with email
    Given I am on the home page
    When I click on sign in link
    And I enter my email and password
    Then I should be logged in
    And I can edit my profile

  Scenario: A user cannot login with bad information
    Given I am on the home page
    When I click on sign in link
    And I enter incorrect authentication information
    Then I should see a user not found error
