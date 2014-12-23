# stackflow

Generate your next-gen software stack for your world-changing startup!

Each generated software stack will not only attract 100x programmers, but also roll off the tongue (so you can use it in a rap jingle)!

#### Example

```javascript
var giveMeSoftware = require('stackflow');
var myNewSoftwareStack = giveMeSoftware();
// { name: 'BARF',
//   stack: [ 'Backbone', 'Algol', 'Redis', 'Flat Files' ] }
```

**NEW!** Pick your own stack name!

```javascript
var giveMeSoftware = require('stackflow');
var myNewSoftwareStack = giveMeSoftware('BEST');
// { name: 'BEST',
//   stack: [ 'Backbone', 'Express', 'SmartDB', 'Typescript' ] }
```

You can even use it as a command line tool!

```bash
$ npm install -g stackflow
$ stackflow
YAWN: YUI, Apache, Windows, Node.JS
````

Or, with your own name!

```bash
$ stackflow money
MONEY: MemCached, Oracle, Node.JS, Express, YUI
````

#### License

MIT