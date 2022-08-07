// const config = require('./config.json')
const {Client, Intents, Collection} = require('discord.js') // Debe ser version 13
const { userInfo } = require('os')
//  npm install discord.js@13.3.1
require('dotenv').config()
// const i18n = require('i18n') // y no hara falta
//const fs = require('fs')
const { join } = require('path')
const { setInterval } = require('timers')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()
client.languages = require('i18n')

client.languages.configure({
    locales: ['en','es'],
    directory: join(__dirname, "locales"),
    defaultLocale:'es',
    retryInDefaultLocale: true,
    objectNotation: true,
    register: global,

    logWarnFn:function(msg){
        console.log('WARNING: ' + msg);
    },

    logErrorFn: function (msg) {
        console.log('ERROR' + msg)
    },
    
    missingKeyFn: function(locale, value){
        return value
    },

    mustacheConfig: {
        tags: ["{{" , "}}"],
        disable: false
    }

})

client.languages.setLocale('en')  // Indioma inglés
// client.languages.__({phrase: 'avatar.self', locale: 'es'})

setInterval(() => {
    updateStatus()
}, 60000)

async function updateStatus(){
    const guildNum = await client.guilds.cache.size
    const memberNum = await client.guilds.cache.reduce ((prev,guild) =>
    prev + guild.memberCount, 0)

    await client.user.setActivity(`Servidores: ${guildNum} Miembros: ${memberNum}`, {type: "LISTENING"})
}

require("./handlers/events.js")(client);
require("./handlers/commands.js")(client);

client.login(config.token);


/**  Lo dejare comentado 
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name,command)
}

client.once("ready", () => {
    console.log("El bot esta preparado");
  });
  

  client.on('interactionCreate',async interaction => {
    if(!interaction.isCommand()) return 
    const command = client.commands.get(interaction.commandName)
    if (!command) return
    try{
        await command.execute(interaction)
    }catch(e){
        console.error(e)
        return interaction.reply({content: "Ha surgido un error al ejecutar el comando"})
    }
    /*const{commandName} = interaction
    if(commandName == 'ping'){
        await interaction.reply('Pong!')
    } **/
/**
})
**/   // Se va a declarar en otro archivo

//client.login(process.env.token);
// Warning porque el json se sube a github etc


// Dejo aquí una idea de comandos
//No funciono pero por si acaso xd
/*const Discord = require('discord.js')
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })*/
// Para crear un bot se necesita un cliente