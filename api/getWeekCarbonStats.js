"use strict";

const Promise = require('bluebird');
const redis = require('redis');
const _ = require('lodash');
const Config = require('../config.json');

module.exports = (req, res) => {
    const redisClient = redis.createClient({
        url: Config.redisURI
    });
    
    res.header('Content-Type','application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    redisClient.mget = Promise.promisify(redisClient.mget); 
    
    redisClient.mget(['cagenmix:weekaverage', 'cagenmix:weekmin', 'cagenmix:weekmax', 'cagenmix:current'])
        .then((result) => {
            res.status(200).json({
                "weekAvgCarbon": result[0],
                "weekMinCarbon": result[1],
                "weekMaxCarbon": result[2],
                "currentCarbon": result[3]
            });
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            redisClient.quit();
        })
}
