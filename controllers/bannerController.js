const axios = require('axios');
const mongoose = require('mongoose');
const Banner = mongoose.model('Banner');

exports.create = (req, res) => {
  new Banner({
    id: req.body.id,
    name: req.body.name,
    target: req.body.target instanceof Array ? req.body.target : [req.body.target]
  }).save()
    .then(banner => res.status(200).json({
      id: banner.id,
      name: banner.name,
      target: banner.target,
    }))
    .catch(error => res.status(400).json(error));
};

exports.getBanners = async (req, res) => {
  let query = {};

  // query based on user ID if it's being passed in
  if (req.query.user_id) {
    try {
      let response = await axios.get(process.env.USER_APP_API + `/user/${req.query.user_id}/segment`);
      query = {target: response.data.segment[0]}
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  const fields = {
    __v: false,
    _id: false,
    target: false,
  };
  Banner.find(query, fields, (err, banners) => {
    res.send({banners});
  });
};

