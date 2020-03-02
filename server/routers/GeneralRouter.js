const express = require('express');
const GeneralRouter = express.Router();
const GeneralSchema = require('../models/general.model');

GeneralRouter.get('/get', function (req, res) {
    GeneralSchema.find({})
        .exec(function (err, general) {
            if (err) {
                res.send(404, 'Error has occurred!')
            } else {
                console.log(general);
                res.json(general);
            }
        });
});

module.exports = GeneralRouter;
