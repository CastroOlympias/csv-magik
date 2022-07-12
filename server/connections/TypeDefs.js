const { gql } = require('apollo-server-express');

const typeDefs = gql`
type UserModel {
    createdAt: String
    _id: ID
    userName: String
    eMail: String
    birthDate: String
    password: String
}

type CSVModel {
    createdAt: String
    columnA: String
    columnB: String
    columnC: String
    columnD: String
    columnE: String
    columnF: String
    columnG: String
    columnH: String
    columnI: String
    columnJ: String
    columnK: String
    columnL: String
    columnM: String
    columnN: String
}

type Auth {
    token: ID
    user: UserModel
}

type Mutation {
    ########## User Mutations
    createAUser(userName: String, eMail: String, birthDate: String, password: String): Auth
    
    loginToAUser(eMail: String, password: String): Auth
    
    editAUser(userName: String, eMail: String, birthDate: String, password: String, aboutMe: String, findMeFriend: String): UserModel
    
    changeAUsereMailOrPassword(userName: String, eMail: String, birthDate: String, password: String): Auth
    
    deleteAUser(userId: ID): UserModel



    ########## CSV Mutations
    createFromCSVData(columnA: String, columnB: String, columnC: String, columnD: String, columnE: String, columnF: String, columnG: String, columnH: String, columnI: String, columnJ: String, columnK: String, columnL: String, columnM: String, columnN: String): CSVModel

    deleteAllCSVData: CSVModel
}

type Query {
    ########## User Queries
    findMe: UserModel
    
    findAllUsers: [UserModel]
    
    findAllUsersBySameName(userName: String): [UserModel]
    
    findAUserById(userId: ID): UserModel
    
    findAUserByEmail(eMail: String): UserModel



    ########## CSV Queries
    findAllCSVData: [CSVModel]
}
`
module.exports = typeDefs;