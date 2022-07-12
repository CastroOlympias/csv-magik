// User Resolvers
const { createAUser, loginToAUser, editAUser, changeAUsereMailOrPassword, deleteAUser, findMe, findAllUsers, findAllUsersBySameName, findAUserById, findAUserByEmail } = require('./resolvers/UserResolvers')

// CSV Resolvers
const { createFromCSVData, findAllCSVData } = require('./resolvers/CSVResolvers')

const resolvers = {
    Mutation: {
        // User Mutations
        createAUser,
        loginToAUser,
        editAUser,
        changeAUsereMailOrPassword,
        deleteAUser,

        // CSV Mutations
        createFromCSVData
    },
    Query: {
        // User Queries
        findMe,
        findAllUsers,
        findAllUsersBySameName,
        findAUserById,
        findAUserByEmail,

        // CSV Queries
        findAllCSVData
    },
}
module.exports = resolvers;