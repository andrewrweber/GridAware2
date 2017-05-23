"use strict";

const Promise = require('bluebird');
const redis = require('redis');
const _ = require('lodash');
const Moment = require('moment');
const Config = require('../config.json');


module.exports = (event, callback) => {
    const max = Moment().unix();
    const min = max - (60 * 60 * 24 * 7);

    const redisClient = redis.createClient({
        url: Config.redisURI
    });

    redisClient.zrangebyscore = Promise.promisify(redisClient.zrangebyscore); 
    redisClient.mset = Promise.promisify(redisClient.mset);

    redisClient.zrangebyscore('cagenmix', min, max)
        .then((result) => {
            const jsonResult = _.map(result, (element) => {
                return JSON.parse(element);
            });
            const count = jsonResult.length;
            let totalCarbon = 0;
            let maxCarbon = 0;
            let minCarbon = Number.POSITIVE_INFINITY;

            _.each(jsonResult, (element) => {
                const carbonVal = _.get(element, 'carbon', null);
                if(carbonVal) {
                    totalCarbon += carbonVal;
                    if(carbonVal > maxCarbon) { maxCarbon = carbonVal; }
                    if(carbonVal < minCarbon) { minCarbon = carbonVal; }                    
                }

            });
            let weeklyAvgCarbon = totalCarbon / count;

            return redisClient.mset(['cagenmix:weekaverage', weeklyAvgCarbon, 'cagenmix:weekmin', minCarbon, 'cagenmix:weekmax', maxCarbon]);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            redisClient.quit();
            if(callback) {
                callback()            
            }
        })
}

