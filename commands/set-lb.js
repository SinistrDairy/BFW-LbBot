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
const lb_schema_1 = __importDefault(require("../models/lb-schema"));
exports.default = {
    name: 'set-lb',
    category: 'Leaderboard',
    description: 'Set up leaderboard channel',
    testOnly: true,
    slash: true,
    requireRoles: true,
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        const { guild, channel } = interaction;
        const guildId = guild === null || guild === void 0 ? void 0 : guild.id;
        const channelId = channel === null || channel === void 0 ? void 0 : channel.id;
        yield lb_schema_1.default.findOneAndUpdate({
            _id: guildId,
            channelID: channelId
        }, {
            _id: guildId,
            channelID: channelId
        }, {
            upsert: true
        });
        interaction.reply('Leaderboard channel set!').then((interaction) => {
            setTimeout(() => { }, 1000 * 5);
        });
    })
};
