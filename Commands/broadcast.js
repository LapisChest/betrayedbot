module.exports = (message,util) => {
    if(message.content.toLowerCase().startsWith(util.prefix + "broadcast") && util.args[0] && util.args[1]){
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            return util.embed(message,"Only people with Manage Permissions permission may execute this command.");
        }
        var args = util.args;
        if(args[0].startsWith('<#') && args[0].endsWith('>')){
            var channel = util.bot.channels.get(args[0].slice(2,args[0].length-1));
            if(channel){
                util.embed(message,message.content.split(args[0])[1].slice(1),"Broadcast Sent");
                message.channel = channel;
                util.embed(message,message.content.split(args[0])[1].slice(1));
                return util.executed(message,"broadcast");
            } else {
                util.embed(message,"You have entered an invalid channel");
                return util.executed(message,"broadcast");
            }
        } else {
            util.embed(message,"Please tag a channel to send the broadcast in...");
            return util.executed(message,"broadcast");
        }
    }
}