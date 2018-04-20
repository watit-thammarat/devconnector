const express = require('express');
const passport = require('passport');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

const router = express.Router();

router.get('/test', (req, res, next) => res.json({ msg: 'Posts Works' }));

router.get('/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(400).json({ nopostfound: 'No post found with that ID' })
    );
});

router.get('/', (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(er));
});

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        if (post.user.toString() !== req.user.id.toString()) {
          return res.status(401).json({ notauthorized: 'User not authorized' });
        }
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnofound: 'No post found' }));
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { text, name, avatar } = req.body;
    const post = new Post({
      text,
      name,
      avatar,
      user: req.user.id
    });
    post
      .save()
      .then(entry => res.json(entry))
      .catch(err => res.status(400).json(err));
  }
);

router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        const like = post.likes.find(
          l => l.user.toString() === req.user.id.toString()
        );
        if (like) {
          res.status(400).json({ alreadyliked: 'You already liked this post' });
        } else {
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        const like = post.likes.find(
          l => l.user.toString() === req.user.id.toString()
        );
        if (!like) {
          res
            .status(400)
            .json({ alreadyliked: 'You have not yet liked this post' });
        } else {
          post.likes = post.likes.filter(
            l => l.user.toString() !== req.user.id.toString()
          );
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const { text, name, avatar } = req.body;
        const comment = { text, name, avatar, user: req.user.id };
        post.comments.unshift(comment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const comment = post.comments.find(
          c => c._id.toString() === req.params.comment_id
        );
        if (!comment) {
          res.status(404).json({ commentnotexists: 'Comment does not exist' });
        } else {
          post.comments = post.comments.filter(
            c => c._id.toString() !== req.params.comment_id
          );
          post.save().then(post => res.json(post));
        }
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
