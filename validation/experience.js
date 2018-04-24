const Validator = require('validator');
const _ = require('lodash');

module.exports = ({ title, company, from }) => {
  const errors = {};

  title = _.isEmpty(title) ? '' : title;
  company = _.isEmpty(company) ? '' : company;
  from = _.isEmpty(from) ? '' : from;

  if (Validator.isEmpty(title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'From field is required';
  }

  return { errors, isValid: _.isEmpty(errors) };
};
