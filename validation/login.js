const Validator = require('validator');
const _ = require('lodash');

module.exports = ({ email, password }) => {
  const errors = {};

  email = _.isEmpty(email) ? '' : email;
  password = _.isEmpty(password) ? '' : password;

  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  return { errors, isValid: _.isEmpty(errors) };
};
