const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const { AutoPoster } = require('topgg-autoposter')
const DisTube = require('distube'),
config = {
	prefix: "b.",
};

AutoPoster("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg1MzkyNjM1MzQyMjY0NzMyNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNjMwMDUwMzIwfQ.pZ6OegtdRjGhh-GIVrn7tU4nxY3BXKvMHh7bHcKF_jg", client)
  .on('posted', () => {
    console.log('Posted stats to Top.gg!')
  })

const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
if (message.author.bot) return;
if (!message.content.startsWith(config.prefix)) return;
const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
const command = args.shift();

if (command == "play")
	distube.play(message, args.join(" "));

if (["repeat", "loop"].includes(command))
	distube.setRepeatMode(message, parseInt(args[0]));
	
if (command == "loop" || command == "repeat") {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle('Current Song has been Looped!')

	message.channel.send(exampleEmbed);
}

if (command == "stop") {
	distube.stop(message);
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle('Bot has left the voice channel!')

	message.channel.send(exampleEmbed);
}
if (command == "skip") {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle('Song has been skipped!')

	message.channel.send(exampleEmbed);
}

if (command == "skip")
	distube.skip(message);

if (command == "volume")
distube.setVolume(message, args[0]);
if (command == "volume") {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle(`Volume has been set to ${args[0]}% `)

	message.channel.send(exampleEmbed);
}

if (command == "jump")
distube.jump(message, parseInt(args[0]-1));

if (command == "shuffle")
distube.shuffle(message);

if (command == "shuffle") {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle(`Queue has been shuffled!`)

	message.channel.send(exampleEmbed);
}

if (command == "pause")
distube.pause(message);


if (command == "pause") {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle(`Current Song has been paused!`)

	message.channel.send(exampleEmbed);
}


if (command == "resume")
distube.resume(message);

if (command == "resume") {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle(`Current Song has been resumed!`)

	message.channel.send(exampleEmbed);
}

if (command == "queue") {
	let queue = distube.getQueue(message);
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle('Current Queue')
	.setDescription(queue.songs.map((song,id) =>
	`**${id + 1}**) ${song.name} - \`${song.formattedDuration}\``).slice(0,10).join("\n"))

	message.channel.send(exampleEmbed);
}

if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `reverse`, `surround`, `earwax`].includes(command)) {
	let filter = distube.setFilter(message, command);
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle('Current Filter')
	.setDescription(filter || 'Off')

	message.channel.send(exampleEmbed);
}
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation pag
distube
.on("playSong", (message,queue, song) => {
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle('Currently Playing')
	.addFields(
		{ name: 'Song Name', value: song.name },
		{ name: 'Duration', value: song.formattedDuration, inline:true },
		{ name: 'Requested By', value: song.user, inline:true },
		{ name: 'Status', value: status(queue)},
	)
	message.channel.send(exampleEmbed);
})
.on("addSong", (message, queue, song) => message.channel.send(
	`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
))
.on("playList", (message, queue, playlist, song) => message.channel.send(
	`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
))
.on("addList", (message, queue, playlist) => message.channel.send(
	`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
))
// DisTubeOptions.searchSongs = true
.on("searchResult", (message, result) => {
	let i = 0;
	const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#9966CC')
	.setTitle('Choose an option from below')
	.setDescription(`${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
	message.channel.send(exampleEmbed);
	
})
// DisTubeOptions.searchSongs = true
.on("searchCancel", (message) => message.channel.send(`Searching canceled`))
.on("error", (message, e) => {
	console.error(e)
	message.channel.send("An error encountered: " + e);
});


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler' , 'event_handler'].forEach(handler =>{
	require(`./handlers/${handler}`)(client, Discord);
})

client.once('ready', () => {
	client.user.setActivity("BlurryBot | b.help");
});



client.login(process.env.BLURRYBOT_TOKEN);
