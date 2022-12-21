import { Client, MessageEmbed, TextChannel } from "discord.js"
import lbSchema from "../models/lb-schema"
import house from "../models/profile-schema"

const secondConvert = 60
let timer = 1000 * secondConvert
let seconds = 1


const fetchTopMembers = async (guildID: any) => {

    let importantData = ''

    const results = await house.find({
        serverID: guildID,
    }).sort({
        points: -1
    }).limit(6)

    for(let counter = 0; counter < results.length; ++counter){
        const{houseName, points} = results[counter]

        importantData += `**#${counter + 1})** House ${houseName} with **${points}** points\n`
    }

    const impData = new MessageEmbed()
        .setColor('GOLD')
        .setTitle(`__Welcome to the Battle Leaderboard!__`)
        .setDescription(`You've stepped up to the battlements with your house banners flown proudly at your back, but how does your Great House fair so far...`)
        .addField(`**Let's take a look at the War standings:**`, `${importantData}`)
        .setFooter({ text: `Updating in 60s` })

    return impData

}

const updateLeaderboard = async (client: Client) => {
    const results = await lbSchema.find({})

    for(const result of results){
        const {_id, channelID} = result

        const guild = client.guilds.cache.get(_id)
        if(guild){
            const channel = guild.channels.cache.get(channelID) as TextChannel

            if(channel){
                const findMessage = await channel.messages.fetch()
                const firstMessage = findMessage.first()
                const topMembers = await fetchTopMembers(_id)

                if(firstMessage){
                    firstMessage.edit({embeds: [topMembers]})
                }else {
                    channel.send({embeds: [topMembers]})
                }
            }
        }
    }
    
    setTimeout (()=>{
        updateLeaderboard(client)
    },timer * seconds)
}

export default async (client: Client) => {
    await updateLeaderboard(client)    
}

export const config = {
    displayName: 'Points Leaderboard',
    dbName: 'Points_Leaderboard'
}