const Joi = require('joi');

const postsService = require('../../services/posts');
const { abort } = require('../../../helpers/error');
const postTypeEnum = require('../../../enums/postType');
const { request } = require('express');

async function validation(postInfo) {
  try {
    const schema = Joi.object().keys({
      userId: Joi.number().integer().min(1).required(),
      content: Joi.string().required(),
      type: Joi.valid(postTypeEnum.getValues()).required(),
    });

    return await Joi.validate(postInfo, schema);
  } catch (error) {
      console.log(error);
    return abort(400, 'Params error');
  }
}

async function addPost(req, res) {
  const postInfo = {
    userId: parseInt(req.user.id),
    content: req.body.content,
    type: parseInt(req.body.type),
  };
  
  await validation(postInfo);

  var post = await postsService.addPost(postInfo);
  
  if(req.files){
    var file = req.files.image;
    var file_url = 'images/post_'+post.id+'.jpg';
    await file.mv('./public/'+file_url, function(err){
      if(err){
        abort(400, "Upload post'image faild");
      }
    })
    await postsService.updatePost(post.id, file_url);
  }
  return res.status(200).send();
}

module.exports = addPost;
