const Logger = {
  clog(...args) {
    console.log(...args);
  }
};
Global.Logger = Logger;
module.exports = { Logger };
