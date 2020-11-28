'use strict';

const neatCsv = require('neat-csv');
const mail = require('./modules/mail');
const logger = require('./modules/logger');
const templater = require('./modules/templater');
const randomizeArray = require('./modules/shuffler');

const prepeareForTemplater = (originalList, newList) => {
  return newList.map((item) => {
    var santeeMail = item[1];
    var santee = originalList.find((singleSantee) => {
      return singleSantee.email === santeeMail;
    });
    return [item[0], santee.name + ' ' + '(' + santeeMail + ')'];
  });
};

module.exports = function (list, options) {
  return new Promise((resolve, reject) => {
    neatCsv(list, (error, mailingObject) => {
      if (error) {
        reject(error);
        return;
      }
      var prepearedtForTemplater = prepeareForTemplater(mailingObject, randomizeArray(mailingObject));
      var compiledMail = options.debug ? resolve : mail(options);
      templater(options, prepearedtForTemplater).then(compiledMail).then(resolve).catch(logger.error);
    });
  });
};
