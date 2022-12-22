import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import houseSchema from "../models/profile-schema";

export default {
    name: 'clear-lb',
    category: 'Leaderboard',
    description: `Use this command to clear the leaderboard and remove all points!`,
    aliases: ['cl','clear'],
    slash: true,
    testOnly: true,
    cooldown: '1s',
    requireRoles: true,

    callback: async ({interaction}) => {

        await interaction.deferReply()

        const results = await houseSchema.find().sort({"houseName":1})
        const collectNames = []
        const collectPoints = []
        let hNames = ''
        let hPoints = ''
        let newAmt = `0\n 0\n 0\n 0\n 0\n 0\n`

        for (let counter = 0; counter < results.length; ++counter){
            const {houseName, points} = results[counter]
            collectNames.push(houseName)
            collectPoints.push(points)

            console.log(houseName)

            await houseSchema.findOneAndUpdate(
                {
                    houseName: houseName
                },
                {
                    $set: {points: 0}
                }
            )
        }

        collectNames.forEach((element: any) => {
            hNames += `${element}\n`
        })
        collectPoints.forEach((element: any) => {
            hPoints += `${element}\n`
        })


        const clearLB = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`**SUCCESS**`)
        .setDescription(`**You've cleared the following schools and their points**`)
        .addField(`**Mentioned School**`, `${hNames}`, true)
        .addField(`**Previous Points**`, `${hPoints}`, true)
        .addField(`**New Points**`,`${newAmt}`, true)
        .setTimestamp()
        
        interaction.editReply({embeds: [clearLB]})
    }
        
}as ICommand