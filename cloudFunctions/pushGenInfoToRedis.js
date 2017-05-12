"use strict";

const Promise = require('bluebird');
const request = require('request-promise');
const moment = require('moment');
const redis = require('redis');
const _ = require('lodash');
const Config = require('../config.json');

const TOKEN = Config.wattTimeToken;

exports.pubGenInfoToRedis = function subscribe(event, callback) {
    const redisClient = redis.createClient({
        url: Config.redisURI
    });

    redisClient.zadd = Promise.promisify(redisClient.zadd);

    let options = {
        uri: `https://api.watttime.org/api/v1/datapoints/${Config.wattTimeQS}`,
        headers: {
            Authorization: `Token ${TOKEN}`
        }
    };

    request(options)
        .then((response) => {
            const jsonResponse = JSON.parse(response).results;

            const args = ['cagenmix', 'nx'];
            _.forEach(jsonResponse, (item) => {
                const score = moment(item.timestamp).unix();
                const data = JSON.stringify(item);

                args.push(score);
                args.push(data);
            });

            return redisClient.zadd(args)
        })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.error(err);
        })
        .finally(() => {
            redisClient.quit();
            callback();
        })    
};