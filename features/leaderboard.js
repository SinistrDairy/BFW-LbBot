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
exports.config = void 0;
const discord_js_1 = require("discord.js");
const lb_schema_1 = __importDefault(require("../models/lb-schema"));
const profile_schema_1 = __importDefault(require("../models/profile-schema"));
const secondConvert = 60;
let timer = 1000 * secondConvert;
let seconds = 1;
const fetchTopMembers = (guildID) => __awaiter(void 0, void 0, void 0, function* () {
    let importantData = '';
    const results = yield profile_schema_1.default.find({
        serverID: guildID,
    }).sort({
        points: -1
    }).limit(6);
    for (let counter = 0; counter < results.length; ++counter) {
        const { houseName, points } = results[counter];
        importantData += `**#${counter + 1})** House ${houseName} with **${points}** points\n`;
    }
    const impData = new discord_js_1.MessageEmbed()
        .setColor('GOLD')
        .setTitle(`__Welcome to the Battle Leaderboard!__`)
        .setDescription(`You've stepped up to the battlements with your house banners flown proudly at your back, but how does your Great House fair so far...`)
        .addField(`**Let's take a look at the War standings:**`, `${importantData}`)
        .setFooter({ text: `Updating in 60s` })
        .setTimestamp();
    return impData;
});
const updateLeaderboard = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield lb_schema_1.default.find({});
    for (const result of results) {
        const { _id, channelID } = result;
        const guild = client.guilds.cache.get(_id);
        if (guild) {
            const channel = guild.channels.cache.get(channelID);
            if (channel) {
                const findMessage = yield channel.messages.fetch();
                const firstMessage = findMessage.first();
                const topMembers = yield fetchTopMembers(_id);
                if (firstMessage) {
                    firstMessage.edit({ embeds: [topMembers] });
                }
                else {
                    channel.send({ embeds: [topMembers] });
                }
            }
        }
    }
    setTimeout(() => {
        updateLeaderboard(client);
    }, timer * seconds);
});
exports.default = (client) => __awaiter(void 0, void 0, void 0, function* () {
    yield updateLeaderboard(client);
});
exports.config = {
    displayName: 'Points Leaderboard',
    dbName: 'Points_Leaderboard'
};
