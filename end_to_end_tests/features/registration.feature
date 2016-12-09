Feature: Email送信ページ
  Emailの形式をチェックする

  Scenario: 言語を日本語に設定する
    Given I am at register page
    When I use the language selector to switch language to Japanese
    Then the application language should be set to Japanese

  Scenario: 言語を英語に設定する
    Given I am at register page
    When I use the language selector to switch language to English
    Then the application language should be set to English

  Scenario: Emailの形式が正しくない
    Given I am at register page
    When Email error
    Then Email error message

  Scenario: Emailの形式が正しい
    Given I am at register page
    When Email success
    Then Email success message

  Scenario: Confirm Emailが正しくない
    Given I am at register page
    When Confirm email error
    Then Confirm email error message

  Scenario: Confirm Emailが正しい
    Given I am at register page
    When Confirm email success
    Then Confirm email success message
