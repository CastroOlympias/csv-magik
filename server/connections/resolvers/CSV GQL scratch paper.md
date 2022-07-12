<!-- *** Mutations *** -->
<!-- Create CSV Data -->
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
<!-- Arguments -->
{
  "columnA": "abccompany",
  "columnB": "abcTrucker",
  "columnC": "client number",
  "columnD": "Location",
  "columnE": "CTNR",
  "columnF": "Date",
  "columnG": "TIME",
  "columnH": "WEIGHT",
  "columnI": "CBMs",
  "columnJ": "TEST1",
  "columnK": "TEST2",
  "columnL": "TEST3",
  "columnM": "TEST4",
  "columnN": "TEST5"
}

<!-- Delete all CSV Data -->
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


<!-- *** Queries *** -->
<!-- Query all CSV data -->
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