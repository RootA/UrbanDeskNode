const mongoose = require('mongoose');
const Schema = new Schema;

var categorySchema = new Schema({
    name: String,
    isActive: Boolean,
    timestamps: true
});
module.exports = mongoose.model('Category', categorySchema);

var countrySchema = new Schema({
    name: String,
    isActive: Boolean,
    timestamps: true
});

module.exports = mongoose.model('Country', countrySchema);

var userSchema = new Schema({
    name: String,
    username: { type: String, unique: true },
    password: { type: String, required: true },
    profile_pic: { data: Buffer, contentType: String },
    phone: { type: String, unique: true},
    email: { type: String, unique: true},
    balance: { type: Float64Array, default: 0.00 },
    bio: String,
    category: [
        {type: Schema.categorySchema.ObjectID, ref: 'Category'}
    ],
    country: [
        {type: Schema.countrySchema.ObjectID, ref: 'Country'}
    ],
    timestamps: true
});

// defines properties to bring in the API endpoint
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('User', userSchema);
