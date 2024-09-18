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
exports.convertXMLToTree = void 0;
const fs_1 = __importDefault(require("fs"));
const xml2js_1 = require("xml2js");
// Function to calculate the size recursively
const calculateSize = (synsets) => {
    return synsets.reduce((sum, synset) => sum + (synset.synset ? calculateSize(synset.synset) : 1), 0);
};
// Function to build the tree structure
const buildTree = (synsets) => {
    return synsets.map(synset => ({
        name: synset.$.words,
        size: calculateSize(synset.synset || []),
        children: synset.synset ? buildTree(synset.synset) : []
    }));
};
// Function to convert XML data to a tree structure
const convertXMLToTree = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const xmlData = fs_1.default.readFileSync(filePath, 'utf-8');
    const result = yield (0, xml2js_1.parseStringPromise)(xmlData);
    const root = result.ImageNetStructure.synset || [];
    return {
        name: 'ImageNet 2011 Fall Release',
        size: calculateSize(root),
        children: buildTree(root),
    };
});
exports.convertXMLToTree = convertXMLToTree;
