import React from 'react';
import Validation from 'react-validation';
import validator from 'validator';
import i18n from 'meteor/universe:i18n';

let style = {
  validationText: {
    color: "red",
    fontSize: "12px",
    marginTop: 3,
    width: "250px",
    position: "absolute",
  },
};

Object.assign(Validation.rules, {
  required: {
    rule: value => {
      return value.toString().trim();
    },
    hint: () => {
      return <p className='form-error is-visible' style={style.validationText}>{i18n.getTranslation('validator', 'required')}</p>;
    },
  },

  email: {
    rule: value => {
      return validator.isEmail(value);
    },
    hint: value => {
      return <p className='form-error is-visible' style={style.validationText}>{value} {i18n.getTranslation('validator', 'email')}</p>;
    },
  },

  password: {
    rule: value => {
      return validator.isLength(value, 8, 16);
    },
    hint: () => {
      return <p className='form-error is-visible' style={style.validationText}>{i18n.getTranslation('validator', 'password')}</p>;
    },
  },

  confirmPassword: {
    rule: (value, components) => {
      const password        = components.password.state;
      const confirmPassword = components.confirmPassword.state;
      const isBothUsed      = password && confirmPassword && password.isUsed && confirmPassword.isUsed;
      const isBothChanged   = isBothUsed && password.isChanged && confirmPassword.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return password.value === confirmPassword.value;
    },
    hint: () => {
      return <p className="form-error is-visible" style={style.validationText}>{i18n.getTranslation('validator', 'confirmPassword')}</p>;
    },
  },
  confirmEmail: {
    rule: (value, components) => {
      const email        = components.registerEmail.state;
      const confirmEmail  = components.confirmEmail.state;
      const isBothUsed      = email && confirmEmail && email.isUsed && confirmEmail.isUsed;
      const isBothChanged   = isBothUsed && email.isChanged && confirmEmail.isChanged;

      if (!isBothUsed || !isBothChanged) {
        return true;
      }

      return email.value === confirmEmail.value;
    },
    hint: () => {
      return <p className="form-error is-visible" style={style.validationText}>{i18n.getTranslation('validator', 'confirmEmail')}</p>;
    },
  },
  deviceId: {
    rule: value => {
      return validator.isLength(value, 24, 24);
    },
    hint: () => {
      return <p className='form-error is-visible' style={style.validationText}>{i18n.getTranslation('validator', 'deviceId')}</p>;
    },
  },
  accessToken: {
    rule: value => {
      return validator.isLength(value, 40, 40);
    },
    hint: () => {
      return <p className='form-error is-visible' style={style.validationText}>{i18n.getTranslation('validator', 'accessToken')}</p>;
    },
  },
  buttonTitle: {
    rule: value => {
      return validator.isLength(value, 1, 20);
    },
    hint: () => {
      return <p className='form-error is-visible' style={style.validationText}>{i18n.getTranslation('validator', 'buttonTitle')}</p>;
    },
  },
  city: {
    rule: value => {
      return validator.isLength(value, 1, 60);
    },
    hint: () => {
      return <p className='form-error is-visible' style={style.validationText}>{i18n.getTranslation('validator', 'region')}</p>;
    },
  },
});
