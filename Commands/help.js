module.exports = (message, util) => {
    if (util.msg(message) == util.prefix + "help" || message.mentions.users.first() && message.mentions.users.first().id==533973451501862912 && message.content.toLowerCase().endsWith('help')) {
      var help = util.readfile(util.fs, "help");
      var categories = "**";
      for (var i = 0; i < Object.keys(help).length; i++) {
        if (i + 1 == Object.keys(help).length) {
          categories = categories + help[i].name + "**";
        } else {
          categories = categories + help[i].name + ", ";
        }
      }
      if (categories == "**") {
        categories = "No Categories";
      }
      util.embed(
        message,
        " ឵឵ ឵឵\nTo see help commands in a Category do `" + util.prefix + "Help [Category]`\n\n" +
          categories +
          "\n ឵឵ ឵឵",
        "Betrayed Bot Help Menu"
      );
      return util.executed(message,"help");
    } else if (util.msg(message).startsWith(util.prefix + "help ") && util.args[0]){
      var help = util.readfile(util.fs, "help");
      var found = false;
      for (var i = 0; i < Object.keys(help).length && !found; i++) {
        if (help[i].name.toLowerCase() == util.args[0].toLowerCase()) {
          found = true;
          var msg="**---[ " + help[i].name + " ]---**\n\n";
          for(var ii=0; ii< Object.keys(help[i]).length-1; ii++){
              msg = msg + (ii+1) + ". `" + help[i][ii].command + "`\n\n" + help[i][ii].description + "\n\n"
          }
          util.embed(message, msg);
          return util.executed(message,"help");
      }}
      if (!found) {
        util.embed(message, "Invalid Category Name");
        return util.executed(message,"help");
      }
    }
  };
  