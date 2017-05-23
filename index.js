const pushGenInfoToRedis = require('./cloudFunctions/pushGenInfoToRedis');
const SetWeekCarbonStats = require('./cloudFunctions/setWeekCarbonStats');
const RetrieveGenMix = require('./api/retrieveGenMix');
const GetWeekCarbonStats = require('./api/GetWeekCarbonStats');

module.exports = {
    pubGenInfoToRedis: pushGenInfoToRedis,
    RetrieveGenMix: RetrieveGenMix,
    SetWeekCarbonStats: SetWeekCarbonStats,
    GetWeekCarbonStats: GetWeekCarbonStats
}

