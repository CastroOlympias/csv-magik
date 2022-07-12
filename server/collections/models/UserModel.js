const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const dateFormatter = require('../../configuration/DateFormatter');

const userSchema = new Schema(

    {
        // Document User Data
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormatter(timestamp)
        },
        userName: {
            type: String,
            required: true
        },
        eMail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        birthDate: {
            type: Date,
            required: true,
            get: timestamp => dateFormatter(timestamp)
        },
        password: {
            type: String,
            required: true,
            minlength: [8, 'Your password needs to be at least 8 characters long']
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const UserModel = model('UserModel', userSchema);
module.exports = UserModel;