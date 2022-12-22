import { Client, MessageEmbed, TextChannel} from "discord.js"
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
        points: -1,
        houseName: 1
    }).limit(6)

    for(let counter = 0; counter < results.length; ++counter){
        const{houseName, points} = results[counter]
        importantData += `**#${counter + 1})**${houseName} with **${points}** points\n`
    }

    const impData = new MessageEmbed()
        .setColor('GOLD')
        .setTitle(`__Welcome to the Wizarding Academy School Standings__`)
        .setDescription(`You've been giving it your best, it's time to see how you fair against the rest...`)
        .addField(`**The standings are as follows:**`, `${importantData}`)
        .setFooter('Updating in 60s...')
        .setTimestamp(Date.now())

    return impData

}

const updateLeaderboard = async (client: Client) => {
    const results = await lbSchema.find({})

    for(const result of results){
        const {_id, channelID} = result

        const topMembers = await fetchTopMembers(_id)
        const guild = client.guilds.cache.get(_id)
        if(guild){
            const channel = guild.channels.cache.get(channelID) as TextChannel

            if(channel){
                const findMessage = await channel.messages.fetch()
                const firstMessage = findMessage.first()

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