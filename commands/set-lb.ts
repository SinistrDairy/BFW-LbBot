import { ICommand } from "wokcommands";
import lbSchema from "../models/lb-schema";

export default {
    name: 'set-lb',
    category: 'Leaderboard',
    description: 'Set up leaderboard channel',
    testOnly: true,
    slash: true,
    requireRoles: true,

    callback: async ({interaction}) => {

        const {guild, channel} = interaction
        const guildId = guild?.id
        const channelId = channel?.id

        await lbSchema.findOneAndUpdate({
            _id: guildId,
            channelID: channelId
        },{
            _id: guildId,
            channelID: channelId
        },{
            upsert: true
        })



        interaction.reply('Leaderboard channel set!').then((interaction)=>{
            setTimeout(() => {}, 1000*5);
        })
    }

} as ICommand