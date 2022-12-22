"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const profile_schema_1 = __importDefault(require("../models/profile-schema"));
exports.default = {
    category: 'Points',
    description: 'Use this command to give a school some points',
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
            description: `Which school?`,
            required: true
        },
        {
            type: 'NUMBER',
            name: 'points',
            description: 'How many points?',
            required: true
        },
    ],
    callback: ({ interaction, guild, channel }) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        const house = yield interaction.options.getString('house');
        const points = yield interaction.options.getNumber('points');
        let newAmt = 0;
        console.log(points);
        if (!house) {
            const errEmbed = new discord_js_1.MessageEmbed()
                .setColor('RED')
                .setTitle(`**ERROR**`)
                .setDescription(`**PLEASE NAME A CORRECT TARGET**`)
                .addField(`**Mentioned school**`, `${house}`)
                .setTimestamp();
            interaction.editReply({ embeds: [errEmbed] });
            return;
        }
        else {
            yield profile_schema_1.default.findOneAndUpdate({
                houseName: house
            }, {
                $inc: { points: points }
            });
            const targetProfile = yield profile_schema_1.default.findOne({ houseName: house });
            newAmt = yield targetProfile.points;
            const succEmbed = new discord_js_1.MessageEmbed()
                .setColor('GREEN')
                .setTitle(`**SUCCESS**`)
                .setDescription(`**You've completed the following**`)
                .addField(`**Mentioned school**`, `${house}`, true)
                .addField(`**Points Given**`, `${points}`, true)
                .addField(`**New Total**`, `${newAmt}`, true)
                .setTimestamp();
            interaction.editReply({ embeds: [succEmbed] });
            return;
        }
    })
};
