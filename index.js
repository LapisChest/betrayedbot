// Variables //

var swearing = false;
var util = {};
var commands = {};
var datapass = [];
var verify = [];
var apply = [];
var applyquestions = [
  "State Your IGN",
  "State Your Age",
  "What Guild were you in before?",
  "Stats / Favourite Game? (Please link your Plancke)",
  "State Your Discord Tag",
  "What Is Your Hypixel Network Level?",
  "Have You Been Punished On The Network? If So, Why?"
];
var application = [];
var Filter = require('bad-words'),
  filter = new Filter({
    placeHolder: 'x'
  });
const fs = require("fs");
const commando = require("discord.js-commando");
const Hypixel = require("hypixel");
const latestTweets = require("latest-tweets");
const SQLite = require("better-sqlite3");
const memberdb = new SQLite("./Data/members.sqlite");
const bot = new commando.Client({
  unknownCommandResponse: false
});

fs.readdir("./Commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    commands[file] = require("./Commands/" + file);
  });
});

util.hypixel = Hypixel;

util.datapass = function (message, commandname, data) {
  return {
    command: commandname,
    commandid: commandname + "-" + message.guild.id + "-" + message.author.id,
    data: data,
    datapass: true
  };
};

util.owner = function (message) {
  return (
    message.author.id == 242674430566858753 ||
    message.author.id == 322738594491924481
  );
};

util.checkdatapass = function (message, commandname, data) {
  if (!data) {
    return false;
  }
  return (
    commandname + "-" + message.guild.id + "-" + message.author.id ==
    data.commandid
  );
};

util.embed = function (message, description, title, image, thumbnail) {
  var embed = {};
  embed.color = message.color;
  if (description) {
    embed.description = description;
  }
  if (title) {
    embed.title = title;
  }
  if (image) {
    embed.image = {
      url: image
    };
  }
  if (thumbnail) {
    embed.thumbnail = {
      url: thumbnail
    };
  }
  return message.channel.send({
    embed
  });
};

util.msg = function (message) {
  return message.content.toLowerCase();
};

util.readfile = function (fs, name) {
  return JSON.parse(fs.readFileSync("./Data/" + name + ".json", "utf8"));
};

util.writefile = function (fs, name, variable) {
  fs.writeFile("./Data/" + name + ".json", JSON.stringify(variable), err => {
    if (err) console.error(err);
  });
  return;
};

util.owner;

util.fs = fs;

util.executed = function (message, commandname) {
  return {
    command: commandname,
    commandid: commandname + "-" + message.guild.id + "-" + message.author.id,
    executed: true
  };
};

util.datapass = function (message, commandname, data) {
  return {
    command: commandname,
    commandid: commandname + "-" + message.guild.id + "-" + message.author.id,
    data: data,
    datapass: true
  };
};

util.numname = function (x) {
  let name = [];
  let min = 1000;
  let max = 1000000;
  name[0] = "Thousand";
  name[1] = "Million";
  name[2] = "Billion";
  name[3] = "Trillion";
  name[4] = "Quadrillion";
  name[5] = "Quintillion";
  name[6] = "Sextillion";
  name[7] = "Septillion";
  name[8] = "Octillion";
  name[9] = "Nonillion";
  name[10] = "Decillion";
  name[11] = "Undecillion";
  name[12] = "Duodecillion";
  name[13] = "Tredecillion";
  name[14] = "Quattuordecillion";
  name[15] = "Quindecillion";
  name[16] = "Sexdecillion";
  name[17] = "Septendecillion";
  name[18] = "Octodecillion";
  name[19] = "Novemdecillion";
  name[20] = "Vigintillion";
  name[21] = "Centillion";
  for (let i = 0; i < name.length; i++) {
    if (x >= min && x < max) {
      let z = round(x / min, 1);
      x = z + " " + name[i];
      i = 10;
    }
    min = min * 1000;
    max = max * 1000;
  }
  return x;
};

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

util.prefix = "b!";

bot.on("message", message => {
  if (message.author.bot) {
    return;
  }
  message.color = util.readfile(util.fs, "color");
  var args = message.content.trim().split(/ +/g);
  args.shift();
  util.args = args;

  // Apply //

  if (message.content.toLowerCase() == util.prefix + "apply") {
    var app = bot.getMember.get(message.author.id);
    if (!app) {
      app = {
        id: message.author.id,
        data: JSON.stringify({
          verified: false
        })};
      bot.setMember.run(app);
    }
    var data = JSON.parse(app.data);
    if (data["application"] && data["application"]["status"] == "Accepted") {
      return util.embed(message, "Your Application is already accepted");
    } else if (
      data["application"] &&
      data["application"]["status"] == "Denied"
    ) {
      var appdate = new Date(data["application"]["date"]);
      var now = new Date();
      var timedif = now - appdate;
      if (7 - timedif / 86400000 > 0) {
        const prettyMs = require("pretty-ms");
        return util.embed(
          message,
          "You have " +
          prettyMs(86400000 * 7 - timedif) +
          " days left to re-apply"
        );
      }
    }
    message.author.send({
      embed: {
        color: message.color,
        description: "**Guild Application**\n\n*Accepting Only People Who Will Get The Guild A Lot Of XP*\n(Please point out your main games while applying, You can apply even if you're not a SW,BW,MW,UHC Player)\n\n**Do `continue` if you wish to continue.**"
      }
    });
    return apply.push("apply." + message.author.id + ".0");
  } else {
    for (var i = 0; i < apply.length; i++) {
      for (var ii = 0; ii < applyquestions.length; ii++) {
        if (apply[i] == "apply." + message.author.id + "." + ii) {
          if (apply[i] == "apply." + message.author.id + ".0") {
            if (message.content.toLowerCase() != "continue") {
              return apply.splice(i, 1);
            }
          }
          util.embed(message, applyquestions[ii]);
          if (ii > 0) {
            application[message.author.id][applyquestions[ii - 1]] =
              message.content;
          } else {
            application[message.author.id] = {};
          }
          apply.splice(i, 1);
          return apply.push("apply." + message.author.id + "." + (ii + 1));
        }
      }
      if (
        apply[i] ==
        "apply." + message.author.id + "." + applyquestions.length
      ) {
        util.embed(
          message,
          "Applications are to be answered up to 24-48 hours, You will get a DM From one of the Application team members if your application was successful or denied.\n\nNote: If your application was denied you may reapply after 7 Days​"
        );
        apply.splice(i, 1);
        message.channel = bot.channels.get("535413516656443392");
        var formatted =
          "**Betrayed Application (" +
          message.author.id +
          ")**\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬";
        var applicationkeys = Object.keys(application[message.author.id]);
        for (var i = 0; i < applicationkeys.length; i++) {
          formatted += `\n\n${applicationkeys[i]} - ${
            application[message.author.id][applicationkeys[i]]
          }`;
        }
        var guild = bot.guilds.get("318481890611036160");
        var role = guild.roles.find(role => role.name === "Application Team");
        message.channel.send(role.toString() + " New Application Submitted");
        util.embed(
          message,
          formatted + "\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
        );
        if (!bot.channels.find("name", "application-" + message.author.id)) {
          var role1 = guild.roles.find('name', '@everyone');
          var role2 = guild.roles.find('name', 'Application Team');
          guild
            .createChannel("application-" + message.author.id, "text")
            .then(channel => {
              channel.setParent('535413388654936065');
              channel.overwritePermissions(message.author.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
              });
              channel.overwritePermissions(role1.id, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
                READ_MESSAGES: false,
              });
              channel.overwritePermissions(role2.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
              });
              message.channel = channel;
              util.embed(
                message,
                formatted + "\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬"
              );
            });
        }
        var setApp = bot.getMember.get(message.author.id);
        var data = JSON.parse(setApp.data);
        data["application"] = {
          app: application[message.author.id],
          status: "Pending",
          date: new Date()
        };
        setApp.data = JSON.stringify(data);
        return bot.setMember.run(setApp);
      }
    }
  }

  // Verify //

  if (message.content.toLowerCase() == util.prefix + "verify") {
    verify.push("verify." + message.author.id);
    message.channel.send("Please check your DMs - <@!" + message.author.id + ">");
    return message.author.send({
      embed: {
        color: message.color,
        description: "__**NOTE : MESSAGE THE BOT FROM HERE ON!! DO NOT MESSAGE ON THE DISCORD**__\n\n**Betrayed Verification**\n\nIf you wish to Verify your account please make sure you:\n\n**Have** a **Premium Minecraft Account**\n\nAnd you have the **Ability** to **Login with your Account Right Now**\n\nIf so, **Please Log in to your Account and Join Hypixel (mc.hypixel.net) \nthen do `/api new` and ** then please continue with `b!verify continue [API Key]`"
      }
    });
  } else if (
    message.content.toLowerCase().startsWith(util.prefix + "verify continue ")
  ) {
    for (var i = 0; i < verify.length; i++) {
      if ("verify." + message.author.id == verify[i]) {
        if (message.channel.type == "dm") {
          var superagent = require("superagent");
          superagent
            .get(
              "https://api.hypixel.net/player?key=" + args[1] + "&name=VimHax"
            )
            .then(body => {
              var success = JSON.parse(body.text);
              if (success.success == true) {
                util.embed(message, "Valid API Key, you are Verified");
                var guild = bot.guilds.get("318481890611036160");
                var member = guild.members.get(message.author.id);
                var role = guild.roles.find(role => role.name === "Members");
                member.addRole(role).catch(console.error);
                if (!bot.getMember.get(message.author.id)) {
                  bot.setMember.run({
                    id: message.author.id,
                    data: JSON.stringify({
                      verified: true
                    })
                  });
                }
              } else {
                util.embed(message, "Invalid API Key, you are not Verified");
              }
              verify = verify.splice(i, 1);
              return;
            });
        } else {
          verify = verify.splice(i, 1);
          return util.embed(
            message,
            "Invalid API Key, you are not Verified. Please do this command on DM"
          );
        }
      }
    }
  }

  if (message.channel.type == "dm") {
    return;
  }

  util.bot = bot;

  var cmdkeys = Object.keys(commands);
  var cmd;
  for (var i = 0; i < cmdkeys.length; i++) {
    if (
      datapass[cmdkeys[i]] &&
      datapass[cmdkeys[i]].commandid.endsWith(
        message.guild.id + "-" + message.author.id
      )
    ) {
      try {
        cmd = commands[cmdkeys[i]](message, util, datapass[cmdkeys[i]]);
      } catch (err) {
        console.log(err);
        datapass = datapass.splice(cmdkeys[i], 1);
        util.embed(
          message,
          "An error has occured during the execution of the command, the Owner has been notified of this Error"
        );
        var guild = bot.guilds.get("318481890611036160");
        var member = guild.members.get("242674430566858753");
        return member.send(`An error has occured while running the command - ${
          cmdkeys[i]
        }
            ${err}`);
      }
      datapass = datapass.splice(cmdkeys[i], 1);
    } else {
      try {
        cmd = commands[cmdkeys[i]](message, util);
      } catch (err) {
        console.log(err);
        util.embed(
          message,
          "An error has occured during the execution of the command, the Owner has been notified of this Error"
        );
        var guild = bot.guilds.get("318481890611036160");
        var member = guild.members.get("242674430566858753");
        return member.send(`An error has occured while running the command - ${
          cmdkeys[i]
        }
            ${err}`);
      }
    }
    if (cmd && cmd.executed) {
      return console.log(
        cmd.command + " has been executed. Command ID - " + cmd.commandid
      );
    } else if (cmd && cmd.datapass) {
      datapass[cmdkeys[i]] = cmd;
      return console.log(
        cmd.command +
        " has been executed [DataPass]. Command ID - " +
        cmd.commandid
      );
    }
  }

  if (message.content != filter.clean(message.content) && swearing) {
    message.channel.fetchMessages().then(
      function (list) {
        message.channel.bulkDelete(1);
        message.channel.send(filter.clean(message.content));
      },
      function (err) {
        message.channel.send("Error has occured during the execution of this process");
      }
    );
  }


});

bot.on("ready", function () {
  console.log("Ready");
  var channel = bot.channels.get("533975008985350144");
  if (channel) {
    channel.send("**Online**");
  }

  // Members Database //

  bot.getMember = memberdb.prepare("SELECT * FROM members WHERE id = ?");
  bot.setMember = memberdb.prepare(
    "INSERT OR REPLACE INTO members (id, data) VALUES (@id, @data);"
  );
});

bot.on("error", e => console.error(e));

bot.login("NTMzOTczNDUxNTAxODYyOTEy.Dxy3Kg.qpdzjWLcUZQ5xNcDfl5V2b5UVq8");