const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = ({ school, degree, from, fieldofstudy }) => {
  const errors = {};

  school = isEmpty(school) ? '' : school;
  degree = isEmpty(degree) ? '' : degree;
  fieldofstudy = isEmpty(fieldofstudy) ? '' : fieldofstudy;
  from = isEmpty(from) ? '' : from;

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

  return { errors, isValid: isEmpty(errors) };
};
