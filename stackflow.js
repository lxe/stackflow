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

// TODO: Un-WTF-ify... I don't think this 'algorithm' is optimal.. or even correct
function findStack(word) {

  var combinations = {
    5: 120,
    4: 24
  }

  var stack, found;
  var order, orders = { };

  for (var tried = 0; tried < combinations[word.length]; tried++) {

    do {
      order = shuffle([0, 1, 2, 3, 4]
        .slice(0, word.length)).join('');
    } while(orders[order]);

    found = true;
    stack = [];
    order = order.split('');

    var available = null, softwareUsed = { };
    for (var i = 0; i < order.length; i++) {

      for (var j = 0; j < software.length; j++) {
        if (softwareUsed[j]) continue;
        available = software[j].filter(function eachSoftware(software) {
          return software.toUpperCase()[0] === word[order[i]][0];
        });
        if (available.length) {
          softwareUsed[j] = true;
          break;
        }
      }

      if (!available.length) {
        found = false;
        break;
      }

      stack[order[i]] = available[0 ^ Math.random() * available.length];
    }

    if (found) {
      return {
        name: word,
        stack: stack
      };
    }
  }
}

function makeStack(word) {
  if (word) {
    return findStack(word.toUpperCase());
  }

  shuffle(words);

  while (true) {
    word = words.pop();
    if (!word) return;

    var result = findStack(word.toUpperCase());
    if (result) {
      return result;
    }
  }
}

module.exports = makeStack;
