import { GuildMember, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import houseSchema from "../models/profile-schema";

export default{
    category: 'Points',
    description: 'Use this command to give a house some points',
    name: 'give-points',
    testOnly: true,
    slash: true,
    expectedArgs: '<house> <points>',
    expectedArgsTypes: ['STRING', 'NUMBER'],
    minArgs: 2,
    requireRoles: true,

    options: [
        {
            type: 'STRING',
            name: 'house',
            description: `Which house?`,
            required: true
        },
        {
            type: 'NUMBER',
            name: 'points',
            description: 'How many points?',
            required: true
        },
    ],

    callback: async ({interaction, guild, channel }) => {
        
        await interaction.deferReply()

        const house = await interaction.options.getString('house')
        const points = await interaction.options.getNumber('points')
        let newAmt = 0

        console.log(points)

        if(!house){
            const errEmbed = new MessageEmbed()
            .setColor('RED')
            .setTitle(`**ERROR**`)
            .setDescription(`**PLEASE NAME A CORRECT TARGET**`)
            .addField(`**Mentioned house**`, `${house}`)
            .setTimestamp()
            
            interaction.editReply({embeds: [errEmbed]})
    
            await new Promise(resolve => setTimeout(resolve, 1000 * 10))
            interaction.deleteReply()
            return
        }else{
            
            await houseSchema.findOneAndUpdate({
                houseName: house
            },
            {
                $inc: {points: points}
            })

            const targetProfile = await houseSchema.findOne({houseName: house})

            newAmt = await targetProfile.points

            const succEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle(`**SUCCESS**`)
            .setDescription(`**You've completed the following**`)
            .addField(`**Mentioned House**`, `${house}`, true)
            .addField(`**Points Given**`, `${points}`, true)
            .addField(`**New Total**`,`${newAmt}`, true)
            .setTimestamp()
            
            interaction.editReply({embeds: [succEmbed]})
    
            await new Promise(resolve => setTimeout(resolve, 1000 * 10))
            interaction.deleteReply()
            return
        }


              
        
    }
}as ICommand