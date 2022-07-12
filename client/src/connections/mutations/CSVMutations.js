import { gql } from "@apollo/client";

export const CREATE_CSV_DATA_DUMP = gql `
mutation Mutation($columnA: String, $columnB: String, $columnC: String, $columnD: String, $columnE: String, $columnF: String, $columnG: String, $columnH: String, $columnI: String, $columnJ: String, $columnK: String, $columnL: String, $columnM: String, $columnN: String) {
    createFromCSVData(columnA: $columnA, columnB: $columnB, columnC: $columnC, columnD: $columnD, columnE: $columnE, columnF: $columnF, columnG: $columnG, columnH: $columnH, columnI: $columnI, columnJ: $columnJ, columnK: $columnK, columnL: $columnL, columnM: $columnM, columnN: $columnN) {
      createdAt
      columnA
      columnB
      columnC
      columnD
      columnE
      columnF
      columnG
      columnH
      columnI
      columnJ
      columnK
      columnL
      columnM
      columnN
    }
  }
`;

export const DELETE_ALL_CSV_DATA_DUMP = gql`
mutation Mutation {
    deleteAllCSVData {
      createdAt
      columnA
      columnB
      columnC
      columnD
      columnE
      columnF
      columnG
      columnH
      columnI
      columnJ
      columnK
      columnL
      columnM
      columnN
    }
  }
`;