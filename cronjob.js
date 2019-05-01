var schedule = require('node-schedule');

let startTime = new Date(Date.now());
let endTime = new Date(startTime.getTime() + 60000);
var j = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/10 * * * * *' }, function () {
  console.log(`Time for tea! ${Date.now().toLocaleString()}`);
});