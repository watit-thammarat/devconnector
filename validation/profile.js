const Validator = require('validator');
const _ = require('lodash');

module.exports = ({
  handle,
  status,
  skills,
  website,
  youtube,
  twitter,
  facebook,
  linkedin,
  instagram
}) => {
  const errors = {};

  handle = _.isEmpty(handle) ? '' : handle;
  status = _.isEmpty(status) ? '' : status;
  skills = _.isEmpty(skills) ? '' : skills;

  if (!Validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 3 and 40 characters';
  }

  if (Validator.isEmpty(handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (Validator.isEmpty(status)) {
    errors.status = 'Status field is required';
  }

  if (Validator.isEmpty(skills)) {
    errors.skills = 'Skills field is required';
  }

  if (!_.isEmpty(website)) {
    if (!Validator.isURL(website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!_.isEmpty(youtube)) {
    if (!Validator.isURL(youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!_.isEmpty(twitter)) {
    if (!Validator.isURL(twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!_.isEmpty(facebook)) {
    if (!Validator.isURL(facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!_.isEmpty(linkedin)) {
    if (!Validator.isURL(linkedin)) {
      errors.linkedin = 'Not a valid URL';
    }
  }

  if (!_.isEmpty(instagram)) {
    if (!Validator.isURL(instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return { errors, isValid: _.isEmpty(errors) };
};
