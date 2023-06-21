// Require the necessary discord.js classes
const fs = require('node:fs/promises');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, erkulDataPath } = require('./config');
const { SETTINGS } = require('./constants')
const cronjobs = require('./cron')
const { createConnection, getSetting, setSetting } = require('./db');
const log = require('./utilities/logger');

(async () => {
	const db = await createConnection();

	// Create a new client instance
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });
	client.commands = new Collection();

	client.db = db;

	const DM_PREF = await getSetting(db, SETTINGS.DM_PREF, {});
	client[SETTINGS.DM_PREF] = new Collection(Object.entries(DM_PREF));

	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = await fs.readdir(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = (await fs.readdir(commandsPath)).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				client.commands.set(command.data.name, command);
			} else {
				log.warn(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}

	// will get populated by whatever is in the data folder
	client.erkulData = {}
	const erkulDataFiles = await fs.readdir(erkulDataPath);
	for (const filename of erkulDataFiles.filter(file => file.endsWith('.json'))) {
		// need to pull name without ext
		const filePath = path.join(erkulDataPath, filename);
		const ext = path.extname(filename);
		const name = filename.slice(0, -ext.length);

		log.info(`Loading ${name} into bot`)
		const stringData = await fs.readFile(filePath);
		const data = JSON.parse(stringData);

		client.erkulData[name] = data;
	}

	client.on(Events.InteractionCreate, async interaction => {
		const command = interaction.client.commands.get(interaction.commandName);

		if (interaction.isAutocomplete()) {
			log.info(`IS AUTOCOMPLETE`)
			return command?.autocomplete(interaction, client)
		}

		if (!interaction.isChatInputCommand()) return;



		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			console.error(error?.rawError?.errors)
			console.error(JSON.stringify(error?.rawError?.errors, null, 2))
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	});


	// When the client is ready, run this code (only once)
	// We use 'c' for the event parameter to keep it separate from the already defined 'client'
	client.once(Events.ClientReady, async c => {
		log.info(`Ready! Logged in as ${c.user.tag}`);
		// const job = await cronjobs(client)
		// job.start();
		// client.job = job;


	});

	// Log in to Discord with your client's token
	client.login(token);


})();
