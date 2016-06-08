'use strict';
const moment = require('moment-timezone');
const _ = require('lodash');

/* eslint-disable no-param-reassign */
module.exports = () => {
  const helpers = {};

  helpers.moment = (context, block) => {
    if (context && context.hash) {
      block = _.cloneDeep(context);
      context = undefined;
    }
    let hasFormat = false;
    let date = moment(context);

    // Reset the language back to default before doing anything else
    date.locale('en');

    let i;
    for (i in block.hash) {
      if (i === 'format') {
        hasFormat = true;
      } else if (i === 'tz') {
        date.tz(block.hash[i]);
      } else if (date[i]) {
        date = date[i](block.hash[i]);
      } else {
        throw new Error('moment.js does not support "' + i + '"');
      }
    }
    if (hasFormat) {
      date = date.format(block.hash.format);
    }
    return date;
  };

  helpers.duration = (context, block) => {
    if (context && context.hash) {
      block = _.cloneDeep(context);
      context = 0;
    }
    let duration = moment.duration(context);

    // Reset the language back to default before doing anything else
    duration = duration.locale('en');
    let i;
    for (i in block.hash) {
      if (duration[i]) {
        duration = duration[i](block.hash[i]);
      } else {
        throw new Error('moment.js duration does not support "' + i + '"');
      }
    }
    return duration;
  };

  return helpers;
};
