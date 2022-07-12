import { gql } from "@apollo/client"

export const FIND_ALL_CSV_DATA = gql`
query Query {
    findAllCSVData {
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