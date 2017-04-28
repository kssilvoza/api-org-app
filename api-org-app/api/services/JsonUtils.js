module.exports = {
  isEmpty : function(input) {
    for(var key in input) {
      return !input.hasOwnProperty(key);
    }
    return true;
  }
}
