const pushGenInfoToRedis = require('./cloudFunctions/pushGenInfoToRedis');
const SetWeekAvgCarbon = require('./cloudFunctions/setWeekAvgCarbon');
const RetrieveGenMix = require('./api/retrieveGenMix');
const GetWeekAvgCarbon = require('./api/getWeekAvgCarbon');

module.exports = {
    pubGenInfoToRedis: pushGenInfoToRedis,
    RetrieveGenMix: RetrieveGenMix,
    SetWeekAvgCarbon: SetWeekAvgCarbon,
    GetWeekAvgCarbon: GetWeekAvgCarbon
}

