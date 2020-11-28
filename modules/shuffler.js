'use strict';

const _ = require('lodash');

const secretSantaShuffle = (mailingObject) => {
  var people = mailingObject.map((singleObject) => {
    return singleObject.email;
  });
  var picks = {};
  var convertToNumberIfNotString = (item) => {
    var integ = parseInt(item);
    return _.isNaN(integ) ? item : integ;
  };

  do {
    var receivers = _.clone(people);
    for (var i in people) {
      var s = people[i];
      // get senders partner
      var partner = () => {
        var partnerObject = mailingObject.filter((singleObject) => {
          if (singleObject.email == s && typeof singleObject.partner !== "undefined") {
            return singleObject
          }
        });
        if (typeof partnerObject[0] == 'object') {
          return partnerObject[0].partner
        }
      };
      var r = null;

      do {
        // if list is only one email then break
        if (receivers.length === 1 && receivers[0] === s) {
          break;
        }

        var j = _.random(0, receivers.length - 1);
        if (s !== receivers[j] && receivers[j] != partner()) {
          r = receivers[j];
          receivers.splice(j, 1);
        }
      } while (r === null);

      // we have a match
      if (r !== null) {
        picks[s] = r;
      }
    }

  } while (_.keys(picks).length < people.length);
  var outputArray = [];
  // output the answers
  for (var sender in picks) {
    outputArray.push([convertToNumberIfNotString(sender), picks[sender]]);
  }
  return outputArray;
};

module.exports = secretSantaShuffle;
