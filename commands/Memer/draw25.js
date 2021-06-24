const { MessageEmbed, MessageAttachment } = require("discord.js");
const { blue } = require("../../botconfig/embed.json");

module.exports = {
  name: "draw25",
  aliases: [],
  category: "Memer",
  description: "IMAGE CMD",
  usage: "draw25 [ Text ]",

  run: async (client, message, args) => {
    
    if (!args.length) return message.channel.send(new MessageEmbed().setColor("#ff595e")
    .setDescription("**<:x2:819613332892942347> Please provide some Text!**"))
    
    var tempmsg = await message.channel.send("<a:loading:856385452868763688>")
    
    var user = message.mentions.users.first();
    if(user) args.shift();
    else user = message.author;

    var avatar = user.displayAvatarURL({ format: "png" });


    var arg = await resolve(message, args)
    var text = arg.join(" ")

    if (!text) {
      tempmsg.delete();
      return message.channel.send(new MessageEmbed().setColor("#ff595e")
      .setDescription("**<:x2:819613332892942347> Please provide some Text!**"))  
    }

    client.memer.draw25(avatar, text).then(image => {

      var attachment = new MessageAttachment(image, "draw25.png");

      tempmsg.delete()
      
      const embed = new MessageEmbed()
      .setColor(blue)
      .setImage("attachment://draw25.png")
      .attachFiles(attachment)
      .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      
      return message.channel.send(embed).catch()
      
    })
      
  }
}

async function resolve(message, args) {
  i = 0;
  await args.forEach(arg => {

    if (arg.includes("<@")) {
      let id = arg.replace(/[\\<>@#&!]/g, "");

      if (arg.includes("&")) {
        role = message.guild.roles.cache.get(id);
        if (role) args[i] = role.name;

      } else {

        let mem = message.guild.members.cache.get(id)
        if (mem) args[i] = mem.displayName;
      }
    }
    i++;
  });

  return args
}