const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function() {

it("constructor sets position and default values for mode and generatorWatts",function(){
    assert.deepStrictEqual( new Rover(7), new Rover(7, 'NORMAL', 110));
});

it("response returned by receiveMessage contains name of message", function(){
    let rvr = new Rover(2);
    let cmds = [new Command('STATUS_CHECK')];
    let msg = new Message('STATUS_CHECK', cmds);
    let test = rvr.receiveMessage(msg);
    assert.strictEqual(test.message, msg.name);
});

it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let rvr = new Rover(2);
    let cmds = [new Command('MOVE', 6), new Command('STATUS_CHECK')];
    let msg = new Message ('Test', cmds);
    let test = rvr.receiveMessage(msg);
    assert.strictEqual(test.results.length, 2);
  });

it("responds correctly to status check command", function(){
   let rvr= new Rover(2);
   let cmds = [new Command('STATUS_CHECK')];
   let msg = new Message('STATUS_CHECK', cmds);
   let test = rvr.receiveMessage(msg);
   let results = [{
          completed: true,
          roverStatus: {
            mode: 'NORMAL',
            generatorWatts: 110,
            position: 2
          }
   }];
   assert.deepStrictEqual(test.results, results)
  });

  it("responds correctly to mode change command", function(){
   let rvr= new Rover(2);
   let cmds = [new Command('MODE_CHANGE', 'NORMAL')];
   let msg = new Message('MODE_CHANGE', cmds);
   let test = rvr.receiveMessage(msg);
   let results = [{
          completed: true,
      }];
   assert.deepStrictEqual(test.results, results)
  });

it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
   let rvr= new Rover(2, "LOW_POWER");
   let cmds = [new Command('MOVE', 6)];
   let msg = new Message('MOVE', cmds);
   let test = rvr.receiveMessage(msg);
   let results = [{
          completed: false,
      }];
   assert.deepStrictEqual(test.results, results)
  });

it("responds with position for move command", function(){
   let rvr= new Rover(2);
   let cmds = [new Command('MOVE', 6)];
   let msg = new Message('MOVE', cmds);
   let test = rvr.receiveMessage(msg);
     assert.strictEqual(rvr.position, 6)
  });

it("completed false and a message for an unknown command", function(){
  let rvr= new Rover(2);
   let cmds = [new Command('non', 6)];
   let msg = new Message('non', cmds);
   let test = rvr.receiveMessage(msg);
   let results = {message: msg.name, 
      results: [{
          completed: false,
      }]};
   assert.deepStrictEqual(test, results)
  });

  it("responds to TA message & commands", function() {
   let rover = new Rover(100);
   let commands = [
      new Command('MOVE', 4321),
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 3579),
      new Command('STATUS_CHECK')
   ];
   let message = new Message('TA power', commands);
   let response = rover.receiveMessage(message);
   assert.strictEqual(response.message,'TA power');
   assert.strictEqual(response.results[0].completed, true);
   assert.strictEqual(response.results[1].roverStatus.position, 4321);
   assert.strictEqual(response.results[2].completed, true);
   assert.strictEqual(response.results[3].completed, false);
   assert.strictEqual(response.results[4].roverStatus.position, 4321);
   assert.strictEqual(response.results[4].roverStatus.mode, 'LOW_POWER');
   assert.strictEqual(response.results[4].roverStatus.generatorWatts, 110);
});

});