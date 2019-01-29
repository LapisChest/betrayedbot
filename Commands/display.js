module.exports = (message, util) => {
    if (util.msg(message).startsWith(util.prefix+"display ") && util.args[0]) {
      if(!message.member.roles.find("name", "Staff")){
        util.embed(message, `Only Members in the Staff Team may execute this command`);
        return util.executed(message, "display");
      }

      var Hypixel = require("hypixel");
      var hypixelclient = new Hypixel({
        key: "7a3637d7-a67c-4ad9-8262-20a65a4e65c7"
      });
  
      hypixelclient.getPlayerByUsername(util.args[0], (err, player) => {
        if (err) {
          return console.log(err);
        }
        if(!player){
          util.embed(message,"That Player does not exist.");
          return util.executed(message,"display");
        }
        var now = new Date(player.firstLogin);
        var now2 = new Date(player.lastLogin);
        var day = require('date-and-time').format(now,'D')
        var day2 = require('date-and-time').format(now2,'D')
        var alliases = '';
        for(var i=0; i<Object.keys(player.knownAliases).length; i++){
            if(i+1==Object.keys(player.knownAliases).length) {
              alliases = alliases + player.knownAliases[i]
            } else {
              alliases = alliases + player.knownAliases[i] + ", "
            }
        }
        var capital = require('capitalize');
        util.embed(message,`Username - ${player.displayname}
        All Usernames - ${alliases}
        First Login - ${require('date-and-time').format(now,'Y [|] MMMM [|] [' + require('ordinal-number-suffix')(day) + ']')}
        Last Login - ${require('date-and-time').format(now2,'Y [|] MMMM [|] [' + require('ordinal-number-suffix')(day2) + ']')}
        Network Level - ${networkLevel = Math.round((Math.sqrt((2 * player.networkExp) + 30625) / 50) - 2.5)}
        Karma - ${util.numname(player.karma)}
        Votes - ${player.voting ? player.voting.total : 0}
        Last Played Game - ${capital(player.mostRecentGameType.toLowerCase())}`,"Hypixel " + player.displayname + " Statistics","","https://crafatar.com/renders/head/" + player.uuid + ".png");
        return util.executed(message,"display");
      });
    }
  };
  