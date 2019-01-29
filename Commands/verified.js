module.exports = (message,util) => {
    if(message.content.toLowerCase()==util.prefix+"verified"){
        var membercount = 0;
        var verifiedcount = 0;
        message.guild.fetchMembers()
        .then(guild => {
            guild.members.forEach(function (member) {
                membercount++;
                if(util.bot.getMember.get(member.id)){
                    verifiedcount++;
                }
            })
            util.embed(message,`Out of ${membercount} members, ${verifiedcount} are verified.`);
            return util.executed(message,"verified");
        })
        .catch(console.error);
    } else if (message.content.toLowerCase()==util.prefix+"verified list"){
        var verified = '';
        message.guild.members.forEach(function (member) {
            if(util.bot.getMember.get(member.id)){
                verified += verified!='' ? (' , ' + member.user.username) : (member.user.username)
            }
        })
        util.embed(message,verified,"Verified Members");
        return util.executed(message,"verifiedList");
    } else if (message.content.toLowerCase().startsWith(util.prefix+"verified ") && message.mentions.users.first()){
        if(util.bot.getMember.get(message.mentions.users.first().id)){
            util.embed(message,message.mentions.users.first().username + " is verified.");
        } else {
            util.embed(message,message.mentions.users.first().username + " is not verified.");
        }
        return util.executed(message,"verfied");
    }
}