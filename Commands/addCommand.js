module.exports = (message, util, data) => {
    if (
      util.msg(message).startsWith(util.prefix + "add command") &&
      !data
    ) {
      if (!util.args[1]) {
        util.embed(message, "Please specify the name of the Command");
        return util.executed(message,"addCommand");
      }
      if (util.owner(message)) {
        var help = util.readfile(util.fs, "help");
        var found = false;
        for (var i = 0; i < Object.keys(help).length && !found; i++) {
          if (help[i].name.toLowerCase() == util.args[1].toLowerCase()) {
            found = true;
            var cmd;
            var desc;
            var check = "";
            for (var ii = 2; ii < util.args.length; ii++) {
              // Checking of "cmd:YourCmdHere;"
              if (util.args[ii].endsWith(";") && check == "startofcmd") {
                check = "endofcmd";
                cmd =
                  cmd + " " + util.args[ii].slice(0, util.args[ii].length - 1);
              }
              if (check == "startofcmd") {
                cmd = cmd + " " + util.args[ii];
              }
              if (util.args[ii].startsWith("cmd:")) {
                cmd = util.args[ii].slice(4);
                check = "startofcmd";
              }
              // Checking of "desc:YourDescHere;"
              if (util.args[ii].endsWith(";") && check == "startofdesc") {
                check = "endofdesc";
                desc =
                  desc + " " + util.args[ii].slice(0, util.args[ii].length - 1);
              }
              if (check == "startofdesc") {
                desc = desc + " " + util.args[ii];
              }
              if (util.args[ii].startsWith("desc:")) {
                desc = util.args[ii].slice(5);
                check = "startofdesc";
              }
            }
            if (check != "endofdesc") {
              util.embed(
                message,
                "Command Format - `.add command cmd:YourCmdHere; desc:YourDescHere;`"
              );
              return util.executed(message,"addCommand");
            }
            util.embed(
              message,
              "Command - `" +
                cmd +
                "`\nDescription - `" +
                desc +
                "`\n\nIs this correct? (Yes/No)"
            );
            return util.datapass(message,"addCommand",{cmd:cmd,desc:desc,i:i});
          }
        }
        if (!found) {
          util.embed(message, "Invalid Category Name");
          return util.executed(message,"addCommand");
        }
      } else {
        util.embed(message, "Only the Owner may add Commands to Help Menu");
        return util.executed(message,"addCommand");
      }
    } else if (
      data &&
      util.msg(message) == "yes"
    ) {
      var help = util.readfile(util.fs, "help");
      help[data.data.i][Object.keys(help[data.data.i]).length-1] = {
        command: data.data.cmd,
        description: data.data.desc
      };
      util.writefile(util.fs, "help", help);
      util.embed(message, "Command has been added to the Category");
      return util.executed(message,"addCommand");
    } else if (data) {
      util.embed(message, "Addition of the Command Cancelled");
      return util.executed(message,"addCommand");
    }
  };
  