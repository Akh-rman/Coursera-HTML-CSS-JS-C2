var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Verify = require('./verify');

var Promotions = require('../models/promotions');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Promotions.find({}, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Promotions.create(req.body, function(err, promotion) {
            if (err) throw err;
            console.log('Promotion created!');
            var id = promotion._id;
            
            res.writeHead(200, {
               'Content-Type': 'text/plain' 
            });
            res.end('Added the promotion with id: ' + id);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Promotions.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

promoRouter.route('/:promoId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next) {
        Promotions.findById(req.params.promotionId, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Promotions.findByIdAndUpdate(res.params.promitionId, {
            $set: req.body
        }, {
           new: true 
        }, function(err, promotion) {
            if (err) throw err;
            res.json(promotion);
        });
    })

    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
        Promotions.findByIdAndRemove(req.params.promotionId, function(err, promotion) {
            if (err) throw err;
            res.json(resp);
        })
    });

module.exports = promoRouter;