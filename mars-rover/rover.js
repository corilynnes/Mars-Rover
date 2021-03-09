class Rover {
  constructor(position, mode, generatorWatts){
    if (typeof(position) === 'number')
    {
      this.mode = mode || 'NORMAL';
      this.generatorWatts = generatorWatts || 110;
       this.position = position;
    }
    else
    {
      throw Error('Position value invalid. Please enter a number');
    }
  }
  receiveMessage(message)
  {
    let resultsArr = [];
    let result;
    for (let i = 0; i < message.commands.length; i++)
    {

      let cmd = message.commands[i];
      result = {
        completed: false
      };
      if (cmd.commandType == 'STATUS_CHECK')
      {
        result = {
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        }
      }
      if (cmd.commandType === 'MOVE' && this.mode === 'NORMAL')
      {
        result = {
          completed: true
        };
        this.position = cmd.value;
      }
      
      if (cmd.commandType == 'MODE_CHANGE')
      {
        this.mode = cmd.value;
        if (cmd.value == 'NORMAL' || cmd.value == 'LOW_POWER')
        {
          result = {
            completed: true
          }
        }
      }
      if (!(cmd.commandType == 'STATUS_CHECK' || cmd.commandType == 'MOVE' || cmd.commandType == 'MODE_CHANGE'))
      {
      }
      resultsArr.push(result);
    }
    
    return {message: message.name,
    results: resultsArr};
  }
};

module.exports = Rover;