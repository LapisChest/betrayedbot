module.exports = (message, util) => {
    if (message.content.toLowerCase().startsWith(util.prefix + "poll")) {
        if (!message.member.permissions.has('MANAGE_MESSAGES')) {
            util.embed(message, "Only members who have Manage Messges Permission may execute this command");
            return util.executed(message, "poll");
        }
        var args = util.args;
        if (!args[2]) {
            util.embed(message, "Poll Format\n\n`" + util.prefix + "poll #channel :thumbsup: .customemojiname Please vote...`")
            return util.executed(message, "poll");
        }
        var channel = util.bot.channels.get(args[0].slice(2, args[0].length - 1));
        if (!channel) {
            util.embed(message, "Invalid Channel");
            return util.executed(message, "poll");
        }
        var emojis = [];
        for (var i = 1; i < args.length; i++) {
            if (!args[i].startsWith('.') && !isEmoji(args[i])) {
                i = args.length;
            } else {
                if (args[i].startsWith('.')) {
                    var emoji = util.bot.emojis.find(emoji => emoji.name.toLowerCase() == (args[i].slice(1)).toLowerCase());
                    if (!emoji) {
                        util.embed(message, "Invalid Emoji Name");
                        return util.executed(message, "poll");
                    }
                    emojis.push(emoji);
                } else {
                    emojis.push(args[i]);
                }
            }
        }
        var stringlength = message.content.split(args[emojis.length])[0].length;
        var poll = message.content.slice(stringlength + args[emojis.length].length).trim();
        util.embed(message, 'Posted Poll - \n\n' + poll);
        channel.send({
            embed: {
                color: message.color,
                description: poll
            }
        }).then(async (msg) => {
            for (var i = 0; i < emojis.length; i++) {
                await msg.react(emojis[i]);
            }
            return util.executed(message, "poll");
        }).catch((err) => {
            console.log(err);
            return util.executed(message, "poll");
        })
    }
}

function isEmoji(str) {
    var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    if (str.replace(regex, "") != str) {
        return true;
    } else {
        return false;
    }
}