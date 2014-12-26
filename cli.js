#!/usr/bin/env node

'use strict';

var gimmeSoftware = require('./stackflow.js');
var argv = require('minimist')(process.argv.slice(2));
var clipboard = require('copy-paste');

var green = '\u001b[32m';
var red   = '\u001b[31m';
var reset = '\u001b[39m';

var input = typeof argv.c === 'string' ? argv.c : argv._[0];

var myAwesomeStack = gimmeSoftware(input);

if (!myAwesomeStack) {
  return console.error('No suitable software stacks found. Try again.');
}

console.log(green + myAwesomeStack.name + reset +
  ': ' + myAwesomeStack.stack.join(', '));

if (argv.c) {
  clipboard.copy(myAwesomeStack.name + ': ' +
    myAwesomeStack.stack.join(', '), function (error) {
      if (error) console.log(error);
      else console.log('Copied to clipboard!');
    }
  );
}
