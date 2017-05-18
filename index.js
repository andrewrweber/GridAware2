const pushGenInfoToRedis = require('./cloudFunctions/pushGenInfoToRedis');
const RetrieveGenMix = require('./api/RetrieveGenMix');

module.exports = {
    pubGenInfoToRedis: pushGenInfoToRedis,
    RetrieveGenMix: RetrieveGenMix
}

