const express = require('express');

const { authentication } = require('../middlewares/authentication.middleware');
const { UserAuth, AdminAuth } = require('../middlewares/authorization.middleware')

const { FlightModel } = require('../models/Flights.model')

const flightRouter = express.Router();

flightRouter.get('/', async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.send(flights)
  } catch (error) {
    res.send(501).send({ message: error.message })
  }
})

flightRouter.get('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const flight = await FlightModel.findById(id);
    res.send(flight)
  } catch (error) {
    res.status(501).send({message: error.message})
  }
})

flightRouter.post('/', authentication, AdminAuth, async (req, res) => {
  const payload = req.body;
  if (
    !payload.airline ||
    !payload.flightNo ||
    !payload.departure ||
    !payload.arrival ||
    !payload.departureTime ||
    !payload.arrivalTime ||
    !payload.seats ||
    !payload.price
  ) {
    return res.status(404).send({ message: 'All Feilds Required' });
  }
  try {
    const flight = new FlightModel(payload);
    await flight.save();
    res.status(201).send({ message: 'Flight Added' })
  } catch (error) {
    res.status(501).send({ message: error.message })
  }
})

flightRouter.patch('/:id', authentication, AdminAuth, async (req, res) => {
  const payload = req.body;
  const {id} = req.params;
  try {
    const flightExists = await FlightModel.findById(id);
    if(!flightExists) {
      return res.status(404).send({message: 'Flight not found'})
    }
    await FlightModel.findOneAndUpdate({_id: id}, payload)
    return res.status(204).send({message: 'Flight Updated Sucessfully'})
  } catch (error) {
    return res.status(501).send({message: error.message})
  }
})

flightRouter.delete('/:id', authentication, AdminAuth, async (req, res) => {
  const {id} = req.params;
  try {
    const flightExists = await FlightModel.findById(id);
    if(!flightExists) {
      return res.status(404).send({message: 'Flight not found'})
    }
    await FlightModel.findOneAndDelete({_id: id})
    return res.status(202).send({message: 'Flight Removed Sucessfully'})
  } catch (error) {
    return res.status(501).send({message: error.message})
  }
})

module.exports = {
  flightRouter
}