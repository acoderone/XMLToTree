import fs from 'fs';
import { parseStringPromise } from 'xml2js';

interface Synset {
  $: {
    wnid: string;
    words: string;
    gloss: string;
  };
  synset?: Synset[];
}

// Function to calculate the size recursively
const calculateSize = (synsets: Synset[]): number => {
  return synsets.reduce((sum, synset) => sum + (synset.synset ? calculateSize(synset.synset) : 1), 0);
};

// Function to build the tree structure
const buildTree = (synsets: Synset[]): any[] => {
  return synsets.map(synset => ({
    name: synset.$.words,
    size: calculateSize(synset.synset || []),
    children: synset.synset ? buildTree(synset.synset) : []
  }));
};

// Function to convert XML data to a tree structure
export const convertXMLToTree = async (filePath: string): Promise<any> => {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const result = await parseStringPromise(xmlData);
  const root = result.ImageNetStructure.synset || [];
  
  return {
    name: 'ImageNet 2011 Fall Release',
    size: calculateSize(root),
    children: buildTree(root),
  };
};
