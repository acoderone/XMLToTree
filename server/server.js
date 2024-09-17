const express = require('express');
const { convertXMLToTree } = require('./convertXMLtoTree');

const app = express();
const port = 5000;

app.get('/api/categories', async (req, res) => {
  try {
    const tree = await convertXMLToTree('./structure_released.xml'); // Replace with the actual file path
    res.json(tree);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
