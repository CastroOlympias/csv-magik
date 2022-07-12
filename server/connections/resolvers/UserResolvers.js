const { UserModel } = require('../../collections');
const { signToken } = require('../../configuration/Authentication')
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');

const userResolvers = {
    // Mutations
    createAUser: async (parent, args) => {
        const user = await UserModel.create(args);
        const token = signToken(user);
        return { token, user };
    },
    loginToAUser: async (parent, { eMail, password }) => {
        const user = await UserModel.findOne({ eMail });
        if (!user) {
            throw new AuthenticationError('Invalid credentials');
        }
        const correctPassword = await user.isCorrectPassword(password);
        if (!correctPassword) {
            throw new AuthenticationError('Invalid credentials');
        }
        const token = signToken(user);
        return { token, user };
    },
    // Trying to get this to work, it seems the new password is being hashed, but it appears it that the token isn't being saved with a new password, which breaks login due to old token and new password, I haven't tried manually deleting my token in dev tools, to see if I can then create a new token with the new password. I'm taking a break!
    changeAUsereMailOrPassword: async (parent, args, context) => {
        if (context.user) {
            const user = await UserModel.findOneAndUpdate(
                { _id: context.user._id },
                args,
                { new: true });
            const saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
            const token = signToken(user);

            return { token, user };
        }
    },
    editAUser: async (parent, args, context) => {
        if (context.user) {
            const user = await UserModel.findOneAndUpdate(
                { _id: context.user._id },
                args,
                { new: true });
            return user;
        }
        throw new AuthenticationError('You must be logged in to edit your profile');
    },
    deleteAUser: async (parent, { userId }, context) => {
        if (context.user) {
            const user = await UserModel.findOneAndDelete({
                _id: userId
            })
            return user;
        }
        throw new AuthenticationError('You must be logged in to delete your profile')
    },

    // Queries
    findMe: async (parent, args, context) => {
        if (context.user) {
            const userData = await UserModel.findOne({ _id: context.user._id })
                .select('-__v -password')
            return userData;
        }
        throw new AuthenticationError('Not Logged In');
    },
    findAllUsers: async (parent, args, context) => {
        const allUserData = await UserModel.find()
            .select('-__v, -password')
        return allUserData
    },
    findAllUsersBySameName: async (parent, { userName }) => {
        return UserModel.find({ userName }).sort({ eMail: 'asc' })
            .select('-__v -password')
    },
    findAUserById: async (parent, { userId }) => {
        return UserModel.findOne({ _id: userId })
            .select('-__v -password')
    },
    findAUserByEmail: async (parent, { eMail }) => {
        return UserModel.findOne({ eMail })
            .select('-__v -password')
    },
}
module.exports = userResolvers;