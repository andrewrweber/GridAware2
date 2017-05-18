const pushGenInfoToRedis = require('./cloudFunctions/pushGenInfoToRedis');
const RetrieveGenMix = require('./api/retrieveGenMix');

module.exports = {
    pubGenInfoToRedis: pushGenInfoToRedis,
    RetrieveGenMix: RetrieveGenMix
}

