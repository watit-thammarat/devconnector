const express = require('express');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const router = express.Router();

router.get('/test', (req, res, next) => res.json({ msg: 'Profile Works' }));

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;

    const {
      handle,
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    if (handle) {
      profileFields.handle = handle;
    }

    if (company) {
      profileFields.company = company;
    }

    if (website) {
      profileFields.website = website;
    }

    if (location) {
      profileFields.location = location;
    }

    if (bio) {
      profileFields.bio = bio;
    }

    if (status) {
      profileFields.status = status;
    }

    if (githubusername) {
      profileFields.githubusername = githubusername;
    }

    if (typeof skills !== undefined) {
      profileFields.skills = skills.split(',');
    }

    profileFields.social = {};

    if (youtube) {
      profileFields.social.youtube = youtube;
    }

    if (twitter) {
      profileFields.social.twitter = twitter;
    }

    if (facebook) {
      profileFields.social.facebook = facebook;
    }

    if (linkedin) {
      profileFields.social.linkedin = linkedin;
    }

    if (instagram) {
      profileFields.social.instagram = instagram;
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            return res.status(400).json(errors);
          }
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

router.get('/handle/:handle', (req, res, next) => {
  const errros = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id', (req, res, next) => {
  const errros = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: 'There is no profile for this user' })
    );
});

router.get('/all', (req, res, next) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles || profiles.length === 0) {
        errors.noprofile = 'There are no profiles';
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
});

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
      };
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile));
    });
  }
);

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile));
    });
  }
);

router.delete(
  '/experience/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.experience = profile.experience.filter(
          e => e.id !== req.params.id
        );
        return profile.save();
      })
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  '/education/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        profile.education = profile.education.filter(
          e => e.id !== req.params.id
        );
        return profile.save();
      })
      .then(profile => res.json(profile))
      .catch(err => res.status(404).json(err));
  }
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
