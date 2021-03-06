const Validator = require('validator');
const _ = require('lodash');

module.exports = ({ name, email, password, password2 }) => {
  const errors = {};

  name = _.isEmpty(name) ? '' : name;
  email = _.isEmpty(email) ? '' : email;
  password = _.isEmpty(password) ? '' : password;
  password2 = _.isEmpty(password2) ? '' : password2;

  if (Validator.isEmpty(name)) {
    errors.name = 'Name field is required';
  }

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

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

  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Comfirm password field is required';
  }

  if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match';
  }

  return { errors, isValid: _.isEmpty(errors) };
};
