
require("mocha-as-promised")();

global.sinon = require("sinon");

var chai = global.chai = require("chai");
chai.use(require("chai-as-promised"));
chai.use(require("sinon-chai"));
chai.should();

global._              = require('underscore');
global.whenResolve    = require('when').resolve;
global.expect         = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion      = chai.Assertion;
global.assert         = chai.assert;

// Unit tests
describe('Unit Tests', function() {
  require('./unit/knex');
  require('./unit/common');
  require('./unit/builder');
  require('./unit/builder/joinclause');
  require('./unit/raw');
  require('./unit/transaction');
  require('./unit/clients/base');
  require('./unit/clients/base/grammar');
  require('./unit/clients/base/schemagrammar');
  require('./unit/clients/server/base');
  require('./unit/clients/server/mysql');
  require('./unit/clients/server/postgres');
  require('./unit/clients/server/sqlite3');
});

// Integration Tests
describe('Integration Tests', function() {
  var Common        = require('../lib/common').Common;
  var Builder       = require('../lib/builder').Builder;
  var SchemaBuilder = require('../lib/schemabuilder').SchemaBuilder;

  // This is where all of the info from the query calls goes...
  var output = {};

  before(function() {
    var context = this;

    SchemaBuilder.prototype.logMe = Builder.prototype.logMe = function(logWhat) {
      this.isLogging = logWhat || true;
      return this;
    };

    SchemaBuilder.prototype.then = Builder.prototype.then = function() {

      if (this.isLogging) {

        // If we're not only logging the sql for this query...
        if (this.isLogging !== 'result') {
          console.log(this.toString());
        }

      }

      return Common.then.apply(this, arguments).tap(function() {

      });
    };

  });

  require('./integration/knex');
});

// Benchmarks
describe('Benchmarks', function() {


});
