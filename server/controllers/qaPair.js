const QAPair = require('../models/qaPair');

async function getQaPair(qaId) {
  try {
    const QAPair = QAPair.findById(qaId);
    return QAPair;
  } catch (error) {
    throw new Error('got error for some reason');
  }
}

async function createQaPair(data) {
  try {
    const qaPair = new QAPair(data);
    const savedPair = await qaPair.save();
    return savedPair;
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  getQaPair,
  createQaPair,
};
