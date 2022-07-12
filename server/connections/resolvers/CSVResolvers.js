const { CSVModel } = require("../../collections")

const csvResolvers = {
    // Mutations
    createFromCSVData: async (parent, args) => {
        const csvData = await CSVModel.create(args)
        return csvData
    },

    // Queries
    findAllCSVData: async (parent, args) => {
        const findAllCSVData = await CSVModel.find()
        return findAllCSVData
    }
}

module.exports = csvResolvers