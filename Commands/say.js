module.exports = (message, util) => {
  if (util.msg(message).startsWith(util.prefix + "say ") && util.args[0]) {
    message.channel.fetchMessages().then(
      function(list) {
        message.channel.bulkDelete(1);
        message.channel.send(message.content.trim().slice((util.prefix + "say ").length));
        return util.executed(message,"say");
      },
      function(err) {
        message.channel.send("Error has occured during the execution of this command");
        return util.executed(message,"say");
      }
    );
  }
};
