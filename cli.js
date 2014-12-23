#!/usr/bin/env node

'use strict';

var gimmeSoftware = require('./stackflow.js');

var green = '\u001b[32m';
var red   = '\u001b[31m';
var reset = '\u001b[39m';

var myAwesomeStack = gimmeSoftware(process.argv[2]);

if (!myAwesomeStack) {
  return console.error('No suitable software stacks found. Try again.');
}

console.log(green + myAwesomeStack.name + reset +
  ': ' + myAwesomeStack.stack.join(', '));
