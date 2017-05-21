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
    redisClient.set = Promise.promisify(redisClient.set);

    redisClient.zrangebyscore('cagenmix', min, max)
        .then((result) => {
            const jsonResult = _.map(result, (element) => {
                return JSON.parse(element);
            });
            const count = jsonResult.length;
            let totalCarbon = 0;

            _.each(jsonResult, (element) => {
            totalCarbon += _.get(element, 'carbon', 0);
            });
            let weeklyAvgCarbon = totalCarbon / count;

            return redisClient.set('cagenmix:weekaverage', weeklyAvgCarbon);
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