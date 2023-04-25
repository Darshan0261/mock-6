const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/Users.model');
const { BookingModel } = require('../models/Bookings.model')
const { flightRouter } = require('./Flights.router');
const { authentication } = require('../middlewares/authentication.middleware');
const { UserAuth } = require('../middlewares/authorization.middleware');
const { FlightModel } = require('../models/Flights.model');

const router = express.Router();

router.use('/flights', flightRouter)

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    let { role } = req.body;
    if(!role) {
        role = 'user';
    }
    if (!name || !email || !password) {
        return res.status(409).send({ message: 'Name, email and password required' });
    }
    try {
        const userExists = await UserModel.findOne({ email: email });
        if (userExists) {
            return res.status(409).send({ message: 'Email Already Registered' });
        }
        bcrypt.hash(password, +process.env.saltRounds, async function (err, hash) {
            if (err) {
                return res.status(501).send({ message: err.message })
            }
            const user = new UserModel({ name, email, password: hash, role });
            await user.save()
            res.status(201).send({ message: 'User Registerd Sucessfully' })
        });
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(409).send({ message: 'Email and password required' });
    }
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (err) {
                return res.status(501).send({ message: err.message })
            }
            if (!result) {
                return res.status(401).send({ message: 'Wrong Credentials' })
            }
            const token = jwt.sign({ name: user.name, id: user._id, role: user.role }, process.env.PRIVATE_KEY);
            return res.status(201).send({ message: 'User Login Sucessful', token })
        });
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

router.post('/booking', authentication, UserAuth, async (req, res) => {
    const {flight_id, token} = req.body;
    const user_id = token.id;
    if(!flight_id) {
        return res.status(409).send('Flight ID and seats required');
    }
    try {
        const flight = await FlightModel.findOne({_id: flight_id});
        if(!flight) {
            return res.status(404).send({message: 'Flight not Found'});
        }
        if(flight.seats < 1) {
            return res.status(404).send({message: `Only ${flight.seat} seats availble`});
        }
        const booking = new BookingModel({user: user_id, flight: flight_id})
        await booking.save();
        flight.seats--;
        await flight.save();
        res.status(201).send({message: 'Booking done sucessfully'})
    } catch (error) {
        return res.status(501).send({messagea: error.message})
    }
})

router.get('/dashboard', authentication, UserAuth, async (req, res) => {
    const { token } = req.body;
    const user_id = token.id;
    try {
        const bookings = await BookingModel.find({ user: user_id });
        return res.send(bookings);
    } catch (error) {
        return res.status(501).send({ message: error.message })
    }
})

module.exports = {
    router
}
