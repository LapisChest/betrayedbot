module.exports = (message,util) => {
    if(message.content.toLowerCase().startsWith(util.prefix+'color') && util.args[0]){
        if(!message.member.permissions.has('MANAGE_MESSAGES')){
            util.embed(message,"Only members who have Manage Messages Permission may execute this command");
            return util.executed(message,"color");
        }
        util.writefile(util.fs,"color",parseInt(util.args[0],16));
        message.color = parseInt(util.args[0],16);
        util.embed(message,"Message Color Updated");
        return util.executed(message,"color");
    }
}