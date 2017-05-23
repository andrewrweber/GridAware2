"use strict";

const Promise = require('bluebird');
const redis = require('redis');
const _ = require('lodash');
const Config = require('../config.json');

module.exports = (req, res) => {
    const redisClient = redis.createClient({
        url: Config.redisURI
    });
    
    redisClient.mget = Promise.promisify(redisClient.mget); 
    
    redisClient.mget(['cagenmix:weekaverage', 'cagenmix:weekmin', 'cagenmix:weekmax'])
        .then((result) => {
            res.status(200).json({
                "weekAvgCarbon": result[0],
                "weekMinCarbon": result[1],
                "weekMaxCarbon": result[2]
            });
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            redisClient.quit();
        })
}
