const Joi = require('joi');

const userService = require('../../services/user');
const { abort } = require('../../../helpers/error');

async function updateAvatar(req, res) {
  if(req.files){
    var file = req.files.mainAvatar;
    var file_url = 'images/avatar_'+req.user.id+'.jpg';
    await file.mv('./public/'+file_url, function(err){
    if(!err){
        console.log('add store ok');
    }else{
        return abort(400, 'add file error');
    }
    });
    await userService.updateAvatar(req.user.id, file_url );
    return res.status(204).send();
  }
  return res.status(400).send({'msg': 'file not exists'});
}

module.exports = updateAvatar;
