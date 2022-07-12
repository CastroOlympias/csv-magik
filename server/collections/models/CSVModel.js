const { Schema, model } = require('mongoose')
const dateFormatter = require('../../configuration/DateFormatter');

const csvSchema = new Schema(
    {
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormatter(timestamp)
        },
        columnA: {
            type: String
        },
        columnB: {
            type: String
        },
        columnC: {
            type: String
        },
        columnD: {
            type: String
        },
        columnE: {
            type: String
        },
        columnF: {
            type: String
        },
        columnG: {
            type: String
        },
        columnH: {
            type: String
        },
        columnI: {
            type: String
        },
        columnJ: {
            type: String
        },
        columnK: {
            type: String
        },
        columnL: {
            type: String
        },
        columnM: {
            type: String
        },
        columnN: {
            type: String
        },
    }
);

const CSVModel = model('CSVModel', csvSchema)
module.exports = CSVModel