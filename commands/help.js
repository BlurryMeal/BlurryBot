const Discord = require('discord.js');
const pagination = require('discord.js-pagination')
module.exports = {
	name: 'help',
	description: "this is a help command!",
	execute(message, args, cmd, client, Discord) {
		
		const page1 = new Discord.MessageEmbed()
			.setColor('#6699EE')
			.setTitle('General Information')
			.setURL('https://blurrybot.xyz')
			.setDescription('BlurryBot is a fully fledged Music Bot developed by BlurryMeal. To get started join a voice channel and play a song by typing `b.play (Song Name)` ')
			.setThumbnail('https://i.imgur.com/lIch4Lq.png')
			.addFields(
				{ name: 'Commands', value: 'A Full List of commands have been mentioned in the next two pages.' },
				{ name: 'No Sir', value: 'There is no premium section for this bot, all features including filters are free for all users!' },
				{ name: 'Bot Invite', value: 'You can invite BlurryBot to your discord server through https://top.gg/bot/853926353422647326' },
				{ name: 'Website', value: 'For more information you can visit our website at **(Under Construction)**' },
			)
		
		const page2 = new Discord.MessageEmbed()
			.setColor('#6699EE')
			.setTitle('General Music Commands')
			.setURL('https://blurrybot.xyz')
			.setDescription('Here is the list of all the commands currently present in BlurryBot.')
			.setThumbnail('https://i.imgur.com/lIch4Lq.png')
			.addFields(
				{ name: 'b.help', value: 'Displays this message.' },
				{ name: 'b.play (Song Name / URL)', value: 'Plays the desired song in your voice channel.' },
				{ name: 'b.skip', value: 'Skips the current song.' },
				{ name: 'b.stop', value: 'Leaves the voice channel.' },
				{ name: 'b.pause', value: 'Pauses the current song.' },
				{ name: 'b.resume', value: 'Continues playing the song.' },
				{ name: 'b.loop | b.repeat', value: 'Loops the song currently playing in the voice channel.' },
				{ name: 'b.volume (Numerical Value)', value: 'Changes the volume of the song.' },
				{ name: 'b.jump (Number)', value: 'Jumps to the preferred song in the queue.' },
				{ name: 'b.shuffle', value: 'Shuffles the Queue.' },
			)

		const page3 = new Discord.MessageEmbed()
			.setColor('#6699EE')
			.setTitle('Music Filter Commands')
			.setURL('https://blurrybot.xyz')
			.setDescription('Here is the list of all the commands for Music Filters')
			.setThumbnail('https://i.imgur.com/lIch4Lq.png')
			.addFields(
				{ name: 'b.3d', value: 'This Filter gives a 3D audio effect for the current song.' },
				{ name: 'b.echo', value: 'This Filter gives an echo effect for the current song.' },
				{ name: 'b.karaoke', value: 'Always wanted to sing on discord? Well now is your chance!' },
				{ name: 'b.reverse', value: 'This Filter reverses the audio of the current song.' },
				{ name: 'b.surround', value: 'This Filter gives a Surround Sound effect for the current song.' },
				{ name: 'b.earwax', value: 'Never had earwax in your ears?' },
				{ name: 'b.bassboost', value: 'Increase the Bass of the current song.' },
				{ name: 'b.nightcore', value: 'This FIlter increases the pitch and pace of the current song.' },
				{ name: 'b.vaporwave', value: 'This Filter makes the current song sound like as if it was made in the 1980s.' },
			)
	
			
		const pages = [
			page1,
			page2,
			page3
		]

		const emoji = ["⏪", "⏩"]

		const timeout = '30000'

		pagination(message, pages, emoji, timeout)
	

	}

}