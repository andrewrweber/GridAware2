"use strict";

const Promise = require('bluebird');
const moment = require('moment');
const redis = require('redis');
const _ = require('lodash');
const Config = require('../config.json');

module.exports = (req, res) => {
    if (!req.body.min || !req.body.max) {
        res.status(400).send('No message defined!');
    }
    
    const min = req.body.min;
    const max = req.body.max;

    const redisClient = redis.createClient({
        url: Config.redisURI
    });
    
    redisClient.zrangebyscore = Promise.promisify(redisClient.zrangebyscore); 
    
    redisClient.zrangebyscore('cagenmix', min, max)
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            redisClient.quit();
        })
}
