var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var authenticate = require('../modules/authenticate');

/**
 * @api {get} /chat/authenticate/guest Autheticate New Guest User
 * @apiName authenticateGuest
 * @apiGroup Chat
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *   {
 *      "token": [
 *
 *      ]
 *  }
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 Not Found
 *     {
 *       "error": {
 *          "message": "",
 *            "error": ""
 *       }
 *     }
 */
router.get('/chat/authenticate/guest', function(req, res) {
  authenticate.guest()
  .then(function(result){
    res.json(result);
  })
  .catch(function(err){
    res.send(err);
  });
});


module.exports = router;
