const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Message class", function() {

  
it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });

  it("constructor sets name", function(){
 let testName = new Message('Test', 'MOVE')
    assert.strictEqual( testName.name,'Test')
  });

it("contains a commands array passed into the constructor as 2nd argument",function(){
     let commandsArr = ['MOVE', 'STATUS_CHECK','MODE_CHANGE'];
     let = testCommands = new Message('Test',commandsArr)
    assert.strictEqual( testCommands.commands, commandsArr)
});

});