const fs = require('fs');
const { parseStringPromise } = require('xml2js');

// Function to convert XML to tree structure
const convertXMLToTree = async (filePath) => {
  const xmlData = fs.readFileSync(filePath, 'utf-8');
  const result = await parseStringPromise(xmlData);

  // Helper function to calculate the size of the node recursively
  const calculateSize = (synsets) => {
    if (!synsets || synsets.length === 0) return 1;  // Base size if no children
    return synsets.reduce((sum, synset) => sum + calculateSize(synset.synset || []), 0);
  };

  // Helper function to build the tree structure
  const buildTree = (synsets) => {
    return synsets.map(synset => ({
      name: synset.$.words, // Extract the words as name
      size: calculateSize(synset.synset || []), // Calculate the size
      children: synset.synset ? buildTree(synset.synset) : [] // Recursively build children
    }));
  };

  // Build the root of the tree
  const rootSynset = result.ImageNetStructure.synset[0];  // Assuming the first synset as root
  return {
    name: rootSynset.$.words || 'ImageNet Structure',
    size: calculateSize(rootSynset.synset || []),
    children: buildTree(rootSynset.synset || [])
  };
};

module.exports = { convertXMLToTree };
