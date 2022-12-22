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
    name: 'clear-lb',
    category: 'Leaderboard',
    description: `Use this command to clear the leaderboard and remove all points!`,
    aliases: ['cl', 'clear'],
    slash: true,
    testOnly: true,
    cooldown: '1s',
    requireRoles: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        const results = yield profile_schema_1.default.find().sort({ "houseName": 1 });
        const collectNames = [];
        const collectPoints = [];
        let hNames = '';
        let hPoints = '';
        let newAmt = `0\n 0\n 0\n 0\n 0\n 0\n`;
        for (let counter = 0; counter < results.length; ++counter) {
            const { houseName, points } = results[counter];
            collectNames.push(houseName);
            collectPoints.push(points);
            console.log(houseName);
            yield profile_schema_1.default.findOneAndUpdate({
                houseName: houseName
            }, {
                $set: { points: 0 }
            });
        }
        collectNames.forEach((element) => {
            hNames += `${element}\n`;
        });
        collectPoints.forEach((element) => {
            hPoints += `${element}\n`;
        });
        const clearLB = new discord_js_1.MessageEmbed()
            .setColor('GREEN')
            .setTitle(`**SUCCESS**`)
            .setDescription(`**You've cleared the following schools and their points**`)
            .addField(`**Mentioned School**`, `${hNames}`, true)
            .addField(`**Previous Points**`, `${hPoints}`, true)
            .addField(`**New Points**`, `${newAmt}`, true)
            .setTimestamp();
        interaction.editReply({ embeds: [clearLB] });
    })
};
