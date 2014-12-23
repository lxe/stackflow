#!/usr/bin/env node

'use strict';

var fs = require('fs');
var wordListPath = require('word-list');

// TODO: Make funnier
var words = fs.readFileSync(wordListPath, {
    encoding: 'utf8'
  })
  .split('\n')
  .filter(function filterWords(word) {
    return (word.length === 4 || word.length === 5)
  });

// TODO: Add more
var software = fs.readdirSync(__dirname + '/data')
  .map(function eachFile(file) {
    return fs.readFileSync(__dirname + '/data/' + file)
      .toString()
      .split('\n')
      .filter(Boolean);
  });

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i;
      j = Math.floor(Math.random() * i),
      x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

// TODO: Un-WTF-ify... I don't think this 'algorithm' is optimal
function makeStack() {

  shuffle(words);

  var word, stack, found;
  var order, orders = { }, ordersTried = 0;
  var result;

  var factorials = {
    5: 120,
    4: 24
  }

  while (!result) {
    word = words.pop();

    if (!word) return;

    ordersTried = 0;

    do {
      if (ordersTried === factorials[word.length] - 1) {
        break;
      }

      do {
        order = shuffle([0, 1, 2, 3, 4].slice(0, word.length)).join('');
      } while(orders[order]);
      ordersTried++;

      found  = true;
      stack = [];
      order = order.split('');

      for (var i = 0; i < order.length; i++) {
        var available = software[i].filter(function eachSoftware(software) {
          return software.toUpperCase()[0] === word[order[i]].toUpperCase()[0];
        });
        if (!available.length) {
          found = false;
          break;
        }
        stack[order[i]] = available[0 ^ Math.random() * available.length];
      }

      if (found) {
        return {
          name: word.toUpperCase(),
          stack: stack
        };
      }

    } while(!found);

  }
}

module.exports = makeStack;

if (require.main === module) {
  console.log(makeStack());
}
