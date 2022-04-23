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
const profile_schema_1 = __importDefault(require("../models/profile-schema"));
exports.default = {
    name: 'add-house',
    category: 'Houses',
    description: `Use this command to add a new house.`,
    aliases: [''],
    slash: true,
    testOnly: true,
    guildOnly: true,
    requireRoles: true,
    options: [
        {
            type: 'STRING',
            name: 'house',
            description: `Which house?`,
            required: true
        }
    ],
    callback: ({ interaction }) => __awaiter(void 0, void 0, void 0, function* () {
        yield interaction.deferReply();
        const newHouse = yield interaction.options.getString('house');
        let houseData;
        try {
            houseData = yield profile_schema_1.default.findOne({ houseName: newHouse });
            if (!houseData) {
                let hProf = yield profile_schema_1.default.create({
                    houseName: newHouse,
                    totalAmt: 0,
                    serverID: interaction.guildId,
                });
                hProf.save();
            }
        }
        catch (err) {
            console.log(err);
        }
        yield interaction.editReply('done');
    })
};
