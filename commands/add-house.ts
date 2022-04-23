import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";
import house from "../models/profile-schema";

export default {
    name: 'add-house',
    category: 'Houses',
    description: `Use this command to add a new house.`,
    aliases: [''],
    slash: true,
    testOnly: true,
    guildOnly:true,
    requireRoles: true,
    options: [
        {
            type: 'STRING',
            name: 'house',
            description: `Which house?`,
            required: true
        }
    ],

    callback: async ({interaction}) => {

        await interaction.deferReply()

        const newHouse = await interaction.options.getString('house')

        let houseData;
        try {
          houseData = await house.findOne({ houseName: newHouse });
          if (!houseData) {
            let hProf = await house.create({
              houseName: newHouse,
              totalAmt: 0,
              serverID: interaction.guildId,

    
            });
            hProf.save();
          }
        } catch (err) {
          console.log(err);
        }


        await interaction.editReply('done')
    
    }
        
}as ICommand