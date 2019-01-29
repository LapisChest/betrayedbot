module.exports = (message,util) => {
    if(util.msg(message)==util.prefix + 'application status'){
        var app = util.bot.getMember.get(message.author.id);
        if(!app){
            app = {
                id: message.author.id,
                data: JSON.stringify({
                  verified: false
                })};
              bot.setMember.run(app);
        }
        var data = JSON.parse(app.data);
        util.embed(message,data['application'] ? `Application Status - ${data['application']['status']}` : `You haven't submitted an Application`);
        return util.executed(message,"applicationStatus");
    } else if (util.msg(message).startsWith(util.prefix + "application status ") && message.mentions.users.first()){
        var app = util.bot.getMember.get(message.mentions.users.first().id);
        if(!app){
            app = {
                id: message.mentions.users.first().id,
                data: JSON.stringify({
                  verified: false
                })};
              bot.setMember.run(app);
        }
        var data = JSON.parse(app.data);
        util.embed(message,data['application'] ? `${message.mentions.users.first().username}'s Application Status - ${data['application']['status']}` : `${message.mentions.users.first().username} hasn't submitted an Application`);
        return util.executed(message,"applicationStatus");
    }
}