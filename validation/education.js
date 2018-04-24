const Validator = require('validator');
const _ = require('lodash');

module.exports = ({ school, degree, from, fieldofstudy }) => {
  const errors = {};

  school = _.isEmpty(school) ? '' : school;
  degree = _.isEmpty(degree) ? '' : degree;
  fieldofstudy = _.isEmpty(fieldofstudy) ? '' : fieldofstudy;
  from = _.isEmpty(from) ? '' : from;

  if (Validator.isEmpty(school)) {
    errors.school = 'School field is required';
  }

  if (Validator.isEmpty(degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(from)) {
    errors.from = 'From field is required';
  }

  if (Validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Fieldofstudy field is required';
  }

  return { errors, isValid: _.isEmpty(errors) };
};
