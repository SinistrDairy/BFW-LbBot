import DJS, { Intents } from "discord.js"
import dotenv from 'dotenv'
import WOK from 'wokcommands'
import path from 'path'
import profileModel from './models/profile-schema';
dotenv.config();

const client = new DJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
        
    ]
})

client.on('ready', async () =>{

  const dbOptions = {
    keepAlive: true
  }


    new WOK (client, {
        commandsDir: path.join(__dirname, 'commands'),
        featuresDir: path.join(__dirname, 'features'),
        typeScript: false,
        botOwners: ['239426866157453313'],
        testServers: ['966738616044892220'],
        mongoUri: 'mongodb+srv://SinistrDairy:rjg2xeNAVUDu9mlR@bfw-lb.dsook.mongodb.net/bfw-lb?retryWrites=true&w=majority',
        dbOptions 
    })
    console.log('Bot Ready!')
})



client.login(process.env.TOKEN)