const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    user : { type: mongoose.Types.ObjectId, ref: 'user' },
    flight : { type: mongoose.Types.ObjectId, ref: 'flight' }
});

const BookingModel = mongoose.model('booking', BookingSchema);

module.exports = {
    BookingModel
}