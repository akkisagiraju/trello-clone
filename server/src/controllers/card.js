const jwt = require('jsonwebtoken');
require('express-async-errors');
const cardRouter = require('express').Router();
const Card = require('../models/Card');
const List = require('../models/List');

cardRouter.post('/cards', async (request, response) => {
  const { title, listId, desc, members } = request.body;
  const decodedToken = jwt.verify(request.token, process.env.SECRET_KEY);
  const { id: userId, name: userName } = decodedToken;

  const newCard = {
    title,
    listId,
    desc: desc || '',
    members: members || [],
    createdBy: {
      id: userId,
      name: userName
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const card = new Card(newCard);
  const savedCard = await card.save();
  const parentList = await List.findById(listId);
  parentList.cards = parentList.cards.concat(savedCard._id);
  await parentList.save();
  return response.status(200).send({ message: 'Card created successfully!' });
});

cardRouter.get('/cards', async (request, response) => {
  const cards = await Card.find({});
  return response.status(200).json(cards);
});

cardRouter.delete('/cards/:id', async (request, response) => {
  const { id } = request.params;
  await Card.findByIdAndDelete(id);
  // this will also delete the card from its parent list - cool, innit?
  return response.status(200).send({ message: 'Card deleted successfully!' });
});

module.exports = cardRouter;
