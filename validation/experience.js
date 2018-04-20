const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = ({ title, company, from }) => {
  const errors = {};

  title = isEmpty(title) ? '' : title;
  company = isEmpty(company) ? '' : company;
  from = isEmpty(from) ? '' : from;

  if (Validator.isEmpty(title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'From field is required';
  }

  return { errors, isValid: isEmpty(errors) };
};
