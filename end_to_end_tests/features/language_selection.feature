Feature: 言語を設定する
  ユーザーとして
  自分で言語を設定することができるはず

  Scenario: 言語を日本語に設定する
    Given I am at register page
    When I use the language selector to switch language to Japanese
    Then the application language should be set to Japanese

  Scenario: 言語を英語に設定する
    Given I am at register page
    When I use the language selector to switch language to English
    Then the application language should be set to English
