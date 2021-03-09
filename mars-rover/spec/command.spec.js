const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });

it("constructor sets command type",function(){
     let cmd = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    let msg = new Message('Test message with 2 commands', cmd);
    assert.strictEqual( msg.name, 'Test message with 2 commands');
});

it("constructor sets a value passed in as the 2nd argument", function(){
     let cmd = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
     let msg = new Message('Test message with 2 commands', cmd);
     assert.strictEqual(msg.commands, cmd);
});

});