import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

import { createProfile, getProfile } from '../../actions/profileAction';

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
    errors: {}
  };

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');
      profile.company = _.isEmpty(profile.company) ? '' : profile.company;
      profile.website = _.isEmpty(profile.website) ? '' : profile.website;
      profile.location = _.isEmpty(profile.location) ? '' : profile.location;
      profile.githubusername = _.isEmpty(profile.githubusername)
        ? ''
        : profile.githubusername;
      profile.bio = _.isEmpty(profile.bio) ? '' : profile.bio;
      profile.social = _.isEmpty(profile.social) ? {} : profile.social;
      profile.twitter = _.isEmpty(profile.social.twitter)
        ? ''
        : profile.social.twitter;
      profile.facebook = _.isEmpty(profile.social.facebook)
        ? ''
        : profile.social.facebook;
      profile.linkedin = _.isEmpty(profile.social.linkedin)
        ? ''
        : profile.social.linkedin;
      profile.youtube = _.isEmpty(profile.social.youtube)
        ? ''
        : profile.social.youtube;
      profile.instagram = _.isEmpty(profile.social.instagram)
        ? ''
        : profile.social.instagram;

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = e => {
    e.preventDefault();
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };
    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-blocck pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one your work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() =>
                      this.setState(prev => ({
                        displaySocialInputs: !prev.displaySocialInputs
                      }))
                    }
                  >
                    Add Social Network Links
                  </button>
                  <span style={{ marginLeft: '10px' }} className="text-muted">
                    Optional
                  </span>
                </div>
                {displaySocialInputs && (
                  <div>
                    <InputGroup
                      placeholder="Twitter Profile URL"
                      name="twitter"
                      icon="fab fa-twitter"
                      value={this.state.twitter}
                      onChange={this.onChange}
                      error={errors.twitter}
                    />

                    <InputGroup
                      placeholder="Facebook Profile URL"
                      name="facebook"
                      icon="fab fa-facebook"
                      value={this.state.facebook}
                      onChange={this.onChange}
                      error={errors.facebook}
                    />

                    <InputGroup
                      placeholder="Youtube Profile URL"
                      name="youtube"
                      icon="fab fa-youtube"
                      value={this.state.youtube}
                      onChange={this.onChange}
                      error={errors.youtube}
                    />

                    <InputGroup
                      placeholder="Linkedin Profile URL"
                      name="linkedin"
                      icon="fab fa-linkedin"
                      value={this.state.linkedin}
                      onChange={this.onChange}
                      error={errors.linkedin}
                    />

                    <InputGroup
                      placeholder="Instagram Profile URL"
                      name="instagram"
                      icon="fab fa-instagram"
                      value={this.state.instagram}
                      onChange={this.onChange}
                      error={errors.instagram}
                    />
                  </div>
                )}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProp = ({ profile, errors }) => ({
  errors,
  profile
});

export default connect(mapStateToProp, { createProfile, getProfile })(
  EditProfile
);
