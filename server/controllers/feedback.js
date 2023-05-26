const getFeedback = async (req, res) => {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  const feedbackId = req.params.feedbackId;
  res.send({
    data: `Hello get feedback ${feedbackId} for message ${messageId} from user ${userId}`,
  });
};

const createFeedback = async (req, res) => {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  res.send({
    data: `Hello create new feedback with user ${userId} and message ${messageId}`,
  });
};

const updateFeedback = async (req, res) => {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  const feedbackId = req.params.feedbackId;
  res.send({
    data: `Hello update feedback${feedbackId} for message ${messageId} from user ${userId}`,
  });
};

const deleteFeedback = async (req, res) => {
  // TODO
  const userId = req.params.userId;
  const messageId = req.params.messageId;
  const feedbackId = req.params.feedbackId;
  res.send({
    data: `Hello delete feedback${feedbackId} for message ${messageId} from user ${userId}`,
  });
};

module.exports = {
  getFeedback,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
