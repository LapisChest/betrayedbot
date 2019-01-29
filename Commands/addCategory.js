module.exports = (message, util) => {
    if (util.msg(message).startsWith(util.prefix + "add category")) {
      if (!util.args[1]) {
        util.embed(message, "Please include a name for the Category");
        return util.executed(message,"addCategory");
      }
      if (util.owner(message)) {
        var help = util.readfile(util.fs, "help");
        help[Object.keys(help).length] = {};
        help[Object.keys(help).length - 1].name = util.args[1];
        util.writefile(util.fs, "help", help);
        util.embed(message, "Added a new Category " + util.args[1]);
        return util.executed(message,"addCategory");
      } else {
        util.embed(message, "Only the Owner may add Categories to Help Menu");
        return util.executed(message,"addCategory");
      }
    }
  };
  