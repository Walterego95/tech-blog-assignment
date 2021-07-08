const router = require('express').Router();
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

//get all posts for dashboard..
router.get('/', withAuth, (req, res) => {
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        model: Comments,
        attributes: ['id', 'comments_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    //render all posts to the dashboard related to user...
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//edit user post...
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        model: Comments,
        attributes: ['id', 'comments_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        //render handlebars edit post page
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      } else {
        console.log('here');
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//render the create post page...
router.get('/create-posts', withAuth, (req, res) => {
    res.render('create-posts');
});

//get a user comments...
router.get('/user-comments', withAuth, (req, res) => {
  console.log(req.session.user_id)
  console.log('======================');
  Comments.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'comments_text',
      'post_id',
      'user_id',
      'created_at'
    ],
    include: [
      {
        model: Post,
        attributes: ['id', 'post_content', 'title', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const comments = dbPostData.map(post => post.get({ plain: true }));
      //render handlebars user-comments...
      res.render('user-comments', {
        comments,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//get a user's comment to edit/delete...
router.get('/single-comment/:id', withAuth, (req, res) => {
  Comments.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'comments_text',
      'post_id',
      'user_id',
      'created_at'
    ],
    include: [
      {

        model: Post,
        attributes: [
          'id',
          'title',
          'post_content',
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }

      const comment = dbPostData.get({ plain: true });
      //render single-comment handlebars to edit or delete comment...
      res.render('single-comment', {
        comment,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
