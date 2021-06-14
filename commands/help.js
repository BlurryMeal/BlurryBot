const Discord = require('discord.js');
module.exports = {
	name: 'help',
	description: "this is a help command!",
	execute(message, args, cmd, client, Discord) {
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#6699EE')
			.setTitle('Commands List')
			.setDescription('Here is the list of all the commands that will help you out on the server')
			.setThumbnail('https://i.imgur.com/lIch4Lq.png')
			.addFields(
				{ name: 'b.play / b.p (song name or URL )', value: 'Plays that song in the voice channel you are in.' },
				{ name: 'b.skip / b.s', value: 'Skips the song.' },
				{ name: 'b.leave / b.stop', value: 'Leaves the VC it is in.' },

			)
			.setTimestamp()
			.setFooter('BlurryBot');

		message.channel.send(exampleEmbed);
	}
}