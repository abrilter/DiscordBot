const guildModel = require('./models/guild') 

module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        if(!interaction.isCommand()) return

        const command = client.commands.get(interaction.commandName)

        if (!command) return

        const Guild = interaction.member.guild

        await guildModel.findOne({ guildId : interaction.guildId}).then((s,err) => {
            if(err) return console.log(err)
            if(s) {
                Guild.lang = s.lang
            } else{
                const newGuild = new guildModel({
                    guildId : interaction.guildId.toString(),
                    lang: 'es'
                })
                newGuild.save().catch( e => console.log(e))
            }
        })

        try{
                await command.run(client,interaction)
        } catch(e){
            console.error(e)
            return interaction.reply({content:'Ha surgido un error al ejecutar un comando'})
        }
    }
}