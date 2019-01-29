module.exports = (message, util) => {
  if (
    (util.msg(message).startsWith(util.prefix + "application accept") &&
      util.args[1]) ||
    (util.msg(message).startsWith(util.prefix + "application deny") &&
      util.args[1])
  ) {
    if (!message.member.roles.find("name", "Application Team")) {
      util.embed(
        message,
        `Only Members in the Application Team may execute this command`
      );
      return util.executed(message, "application");
    }
    var user = util.bot.users.get(util.args[1]);
    if (!user) {
      util.embed(message, "That user doesn't not exist");
      return util.executed(message, "applicationAcceptorDeny");
    }
    var member = util.bot.getMember.get(util.args[1]);
    if (!member) {
      util.embed(message, "That user is not Verified");
      return util.executed(message, "applicationAcceptorDeny");
    }
    var data = JSON.parse(member.data);
    if (!data["application"]) {
      util.embed(message, "That application does not exist");
      return util.executed(message, "applicationAcceptorDeny");
    }
    var status = util.args[0].toLowerCase() == "accept" ? "Accepted" : "Denied";
    data["application"]["status"] = status;
    member.data = JSON.stringify(data);
    util.bot.setMember.run(member);
    util.embed(message, user.username + "'s Application Status updated to " + status);
    user.send({
      embed: {
        color: message.color,
        description: "Your application has been reviewed and it got " + status + (status == 'Denied' ? ' (You may re-apply after 7 days)' : '')
      }
    })
    if (status == 'Accepted') {
      var role = guild.roles.find(role => role.name === "Members");
      var member = message.guild.members.get(util.args[1]);
      member.addRole(role).catch(console.error);
    }
    return util.executed(message, "applicationAcceptorDeny");
  }
};