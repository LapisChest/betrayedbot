module.exports = (message, util) => {
  if (util.msg(message) == util.prefix + "application") {
    var app = util.bot.getMember.get(message.author.id);
    if (!app) {
      util.embed(message, `You are not Verified`);
      return util.executed(message, "application");
    }
    var data = JSON.parse(app.data);
    if (!data["application"]) {
      util.embed(message, `You haven't submitted a Application`);
      return util.executed(message, "application");
    }
    var formatted =
      "**Betrayed Application (" +
      message.author.id +
      ")**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬";
    var applicationkeys = Object.keys(data["application"]["app"]);
    for (var i = 0; i < applicationkeys.length; i++) {
      formatted += `\n\n${applicationkeys[i]} - ${
        data["application"]["app"][applicationkeys[i]]
      }`;
    }
    message.author.send({
      embed: {
        color: message.color,
        description: formatted + "\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
      }
    });
    return util.executed(message, "application");
  } else if (
    util.msg(message).startsWith(util.prefix + "application ") &&
    message.mentions.users.first()
  ) {
    if(!message.member.roles.find("name", "Application Team")){
      util.embed(message, `Only Members in the Application Team may execute this command`);
      return util.executed(message, "application");
    }
    var app = util.bot.getMember.get(message.mentions.users.first().id);
    var user = message.mentions.users.first();
    if (!app) {
      util.embed(message, `${user.username} is not Verified`);
      return util.executed(message, "application");
    }
    var data = JSON.parse(app.data);
    if (!data["application"]) {
      util.embed(message, `${user.username} hasn't submitted a Application`);
      return util.executed(message, "application");
    }
    var formatted =
      "**Betrayed Application (" +
      message.author.id +
      ")**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬";
    var applicationkeys = Object.keys(data["application"]["app"]);
    for (var i = 0; i < applicationkeys.length; i++) {
      formatted += `\n\n${applicationkeys[i]} - ${
        data["application"]["app"][applicationkeys[i]]
      }`;
    }
    message.author.send({
      embed: {
        color: message.color,
        description: formatted + "\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
      }
    });
  }
};
