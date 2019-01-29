module.exports = (message,util) => {
    if(message.content.toLowerCase()==util.prefix + "betrayed"){
        const betrayed = util.bot.emojis.find(emoji => emoji.name === "betrayed");
        util.embed(message,betrayed + ' [Betrayed Guild Page](https://hypixel.net/guilds/Betrayed)');
        return util.executed(message,"betrayed");
    }
}