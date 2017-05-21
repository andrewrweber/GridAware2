"use strict";

const Promise = require('bluebird');
const redis = require('redis');
const _ = require('lodash');
const Config = require('../config.json');

module.exports = (req, res) => {
    const redisClient = redis.createClient({
        url: Config.redisURI
    });
    
    redisClient.get = Promise.promisify(redisClient.get); 
    
    redisClient.get('cagenmix:weekaverage')
        .then((result) => {
            res.status(200).json({"weekAvgCarbon": result});
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            redisClient.quit();
        })
}