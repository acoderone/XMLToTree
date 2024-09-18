import express from 'express';
import { convertXMLToTree } from './utils/xmlToTree';
import path from 'path';

const app = express();
const PORT = 5000;

// Define a route to fetch the categories as a tree
app.get('/api/categories', async (req, res) => {
  try {
    const filePath = path.join(__dirname, './structure_released.xml');
    const treeData = await convertXMLToTree(filePath);
    res.json(treeData);
  } catch (error) {
    res.status(500).json({ message: 'Error reading XML file' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
