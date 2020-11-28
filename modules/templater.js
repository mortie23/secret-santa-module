'use strict';

const blueTemplate = require('blueimp-tmpl');

var DEFAULT_TEMPLATE = '<div>Your sectret Santa for 2020 is <h3>{%=o.to%}</h3></div>';

module.exports = function templater(options, array) {
  var simpleTemplateFunction = blueTemplate(options.template ? options.template : DEFAULT_TEMPLATE);

  var processArrayToTemplates = array
    .map((object) => {
      return { giver: object[0], to: object[1] };
    }).map((object) => {
      return { giver: object.giver, string: simpleTemplateFunction(object) };
    });

  return new Promise((resolve, reject) => {
    Promise.all(processArrayToTemplates).then(resolve).catch(reject);
  });
};
