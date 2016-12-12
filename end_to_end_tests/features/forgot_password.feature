Feature: Email送信ページ
  Emailの形式をチェックする

  Scenario: Emailの形式が正しくない
    Given I am at resetPassword page
    When reset Email error
    Then reset Email error message

  Scenario: Emailの形式が正しい
    Given I am at resetPassword page
    When reset Email success
    Then reset Email success message
