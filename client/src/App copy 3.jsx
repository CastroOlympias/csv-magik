import logo from './logo.svg';
import { useQuery, useMutation } from '@apollo/client';
import './App.css';
import React, { useState } from 'react';
import { FIND_ALL_CSV_DATA } from './connections/queries/CSVQueries'
import { CREATE_CSV_DATA_DUMP, DELETE_ALL_CSV_DATA_DUMP } from './connections/mutations/CSVMutations'


function App() {

  const { loading: loadingCSV, data: dataCSV } = useQuery(FIND_ALL_CSV_DATA, {
    refetchQueries: [
      { query: FIND_ALL_CSV_DATA },
    ]
  })
  const csvDataDump = dataCSV?.findAllCSVData || {}
  console.log(csvDataDump)

  const [createFromCSVData, { loading: loadingToCreateCSVData, error, data }] = useMutation(CREATE_CSV_DATA_DUMP)
  console.log(loadingToCreateCSVData)
  // console.log(error)
  // console.log(data)

  const [deleteDatabase, { loading: loadedDeleteDatabase, data: dataDeleteDatabase }] = useMutation(DELETE_ALL_CSV_DATA_DUMP, {
    refetchQueries: [
      { query: FIND_ALL_CSV_DATA },
    ]
  })


  const deleteFromDatabase = async (event) => {
    console.log('delete me')

    try {
      await deleteDatabase()
    }
    catch (err) {
      console.log(err)
    }

  }
  console.log(csvDataDump)
  const checkCSVFile = async => {
    let fileSize = 0;
    //get file
    let theFile = document.getElementById("myFile");

    console.log(theFile.value)
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    //check if file is CSV
    if (regex.test(theFile.value.toLowerCase())) {
      //check if browser support FileReader
      if (typeof (FileReader) != "undefined") {
        //get table element
        let table = document.getElementById("myTable");
        let headerLine = "";
        //create html5 file reader object
        let myReader = new FileReader();
        // call filereader. onload function
        myReader.onload = function (e) {
          let content = myReader.result;
          // console.log('::: RAW CVS DATA :::', content)
          // convert contect into an array of rows
          const arrayOfRows = content.split('\r')
          // console.log('::: Array Of Rows :::', 'Number Of Rows From CSV', arrayOfRows.length - 1, arrayOfRows)
          // run a loop from the array of rows to console log 1 row at a time
          const columnHeader = arrayOfRows[0].split(',')
          // console.log(columnHeader.length)

          // Arrays used to index a CSV file
          let rebuildRow = []
          let rebuildArrayOfRows = []
          let cellIterator = []

          // Arrays used to batch the indexed CSV data for batch reqeusts against GraphQl Mutations
          let batchAmount = 1200
          let batchOfRows = []
          let remainingBatchOfRows = []
          let arrayOfBatches = []

          // This function handles creating an array of batch requests to be sent used in GraphQl Mutations
          const buildArrayOfBatchesOfRows = () => {
            // This loop creates the maximum size for the batchAmount array of rows, but his will not add the remaining rows that don't count up the batchAmount number
            // To create a batch, once the batchOfRows array length is equal to batchAmount then a push is created to build the arrayOfBatches.
            // the tail end of the indexed csv array is less the batchAmount, so that tail end failes the if statement and doesn't get added the arrayOfBatches
            // The second for loop doesn't run until this first for loop runs, leaving the second for loop outside this one allows this two step loop procees to run really fast
            for (let IndexedCSVFileRows = 0; IndexedCSVFileRows < rebuildArrayOfRows.length; IndexedCSVFileRows++) {
              let indexedRow = rebuildArrayOfRows[IndexedCSVFileRows]
              batchOfRows.push(indexedRow)
              if (batchOfRows.length == batchAmount) {
                arrayOfBatches.push(batchOfRows)
                console.log('Creating Batches')
                batchOfRows = []
              }
            }

            // This loop is used to batch the remaining rows that were left behind from the above loop, starting from where the above loop ended
            // The above loop ends first allow for a total count of currently batched rows from where the this second loop can then automaticaly the difference, and where to start in the indexed csv array
            // This allows variable use in whereby you only have to adjust the let batchAmount =, and the match will auto caculate and build the batches thier repsective size
            // This will dymanically change the remaining amout of rows to batch and the if statement will adjust according to the remaining amount and always add the remaing rows
            let batchedRows = batchAmount * arrayOfBatches.length
            let remainingRowsToBatch = rebuildArrayOfRows.length - batchAmount * arrayOfBatches.length
            console.log('Rows Batched', batchedRows)
            console.log('Remaning Rows To Batch', remainingRowsToBatch)
            for (let IndexedCSVFileRows = batchedRows; IndexedCSVFileRows < rebuildArrayOfRows.length; IndexedCSVFileRows++) {
              let indexedRow = rebuildArrayOfRows[IndexedCSVFileRows]
              remainingBatchOfRows.push(indexedRow)
              if (remainingBatchOfRows.length == remainingRowsToBatch) {
                arrayOfBatches.push(remainingBatchOfRows)
                console.log('Batch Building Complete')
                console.log('Array Of Batches', arrayOfBatches)
                remainingBatchOfRows = []
                destructureArrayOfBatchesOfRows()
              }
            }
          }



          let loadingToDatabase = true
          let notLoadingToDatabase = false
          // this will loop over the arrayOfBatches, then inside will loop of the batch array of rows, then these rows will be looped to get the cell value to send to the database
          const destructureArrayOfBatchesOfRows = async event => {

            const sleep = (time) => {
              return new Promise((resolve) => setTimeout(resolve, time))
          }
            console.log('Hey you', arrayOfBatches)
            for (let arrayOfBatchesIndex = 0; arrayOfBatchesIndex < arrayOfBatches.length; arrayOfBatchesIndex++) {
              if (loadingToCreateCSVData == true || loadingToCreateCSVData == 'undefined') {

                // console.log(arrayOfBatches[arrayOfBatchesIndex])
                // arrayOfBatchesIndex--
                await sleep(80000)
              } else {
                let batchedRowArray = arrayOfBatches[arrayOfBatchesIndex]
                console.log(batchedRowArray)
                // This loop loops over each row in the batch
                for (let batchedRowsArrayIndex = 0; batchedRowsArrayIndex < batchedRowArray.length; batchedRowsArrayIndex++) {
                  let batchedRow = batchedRowArray[batchedRowsArrayIndex]
                  // console.log(batchedRow)

                  const doSomething = async () => {

                    const sendCSVRowDataToDatabase = { columnA: batchedRow[0], columnB: batchedRow[1], columnC: batchedRow[2], columnD: batchedRow[3], columnE: batchedRow[4], columnF: batchedRow[5], columnG: batchedRow[6], columnH: batchedRow[7], columnI: batchedRow[8], columnJ: batchedRow[9], columnK: batchedRow[10], columnL: batchedRow[11], columnM: batchedRow[12], columnN: batchedRow[13] }
                    // console.log(rebuildRow)
                    // console.log(sendCSVRowDataToDatabase)
                    try {
                      const { data } = await createFromCSVData({
                        variables: {
                          ...sendCSVRowDataToDatabase
                        }
                      });

                      // console.log(data)
                    } catch (e) {
                      console.log(e)
                    }




                  }
                  doSomething()
                  
                }
                // await sleep(80000)
              }
             
            }

          }



          // if (loadingToCreateCSVData == false) {
          //   destructureArrayOfBatchesOfRows()
          // }


setTimeout((arrayOfBatchesIndex) => {
  arrayOfBatchesIndex++
  destructureArrayOfBatchesOfRows()
}, 80000);



          // This set of loops is what indexes the CSV file data, once the CSV file indexing is complete, this will call the buildArrayOfBatchesOfRows() function
          for (let rowIndex = 0; rowIndex < arrayOfRows.length; rowIndex++) {
            // Here, we will take the arrayOfRows and iterate over them
            // The rowIterator has an array of columns
            // Splitting by comma ',' allows rowIterator to have an index based on the cvs cell, allowing for whole data strings or words instead of an array of single digits
            const rowIterator = arrayOfRows[rowIndex].split(',')
            for (let cellIndex = 0; cellIndex < rowIterator.length; cellIndex++) {
              // The cellIterator will take the column values from the rowIterator's array
              // this first if state evalutes the current cellIterator index value against strings from the csv file that I want left out of the rebuildRow array
              // due to cvs strings having commas "," this can create extra indexs in your array causing data misalignment with rows and columns in the new array's that you're building
              // example, in a cvs (abc company, LLC) will take up 1 cell because when using excel to enter this (abc company, LLC) into 1 cell, excel will wrap that in quotes "abc company, LLC"
              // this maintains this one cell, but when you split ',' to obtain each cell value into it's on index, abc company are thereby split from LLC and what happens is abc company is in one index and LLC is in another index.
              // this effectveliy is creating an extra column which leads to data disdisplacement whereby client name in the first column will end up in different and seeming random columns
              // The if statement effectlivey removes the extra column by removing the extra indexes created by the comma split when the cellIterator current index value evaluates to true. When it evaluates to false, it moves to the else condition
              // In the else condition the cellIterator current index value that evaluated to false then gets pushed into the rebuildRow array
              // Once all the vartions of split values to be removed are added in the or operater, you'll see in the conosle log the reversal of the data displament and begin to see proper data alignment for their rows and columms
              cellIterator = rowIterator[cellIndex]
              if (cellIterator == ' LLC' || cellIterator == ' LLC"' || cellIterator == ' LLC."' || cellIterator == ' L.L.C."' || cellIterator == ' Inc"' || cellIterator == ' Inc.' || cellIterator == ' Inc."' || cellIterator == ' Inc."' || cellIterator == ' INC.\"' || cellIterator == '\"' || cellIterator == 'Ltd' || cellIterator == 'Ltd.' || cellIterator == 'Ltd."' || cellIterator == 'Ltd"' || cellIterator == ' Ltd.\"' || cellIterator == ' LC.\"' || cellIterator == ' Inc. RESIDENTIAL\"' || cellIterator == ' L\"' || cellIterator == ' Jetways Systems\"' || cellIterator == ' National Associat\"' || cellIterator == ' INC\"') {
              } else {
                // cellIterator index values not matched, will be added to the rebuildRow array
                rebuildRow.push(cellIterator)
                // console.log(rebuildRow)
              }
              // This if statement evaulates the index length of rebuildRow array to make sure it doesn't exceed your cvs column count.
              // The consol log will show the array length based on the column header count in the csv file to match any column count
              // If the array length is less than the cvs column header count, effectively re-run the cellIterator loop to keep adding column data to the rebuildRow array
              // Else (when it isn't less than the cvs column header count) defer to the esle condition of the if state
              if (rebuildRow.length < columnHeader.length) {
                // Keep runing the loop until the rebuildRow array length is longer less than the cvs column header count
              } else {
                // The rebuildRow array now has the current iterated CSV row column values and then dumps them into to rebuildArrayOfRows array
                // Ater pushing the rebuildRow into rebuildArrayOfRows array, rebuildRow zeros out, or just becmes an empty array again otherwise you'd create a tone of duplicate data
                // Once rebuildRow array becomes an empty array again, the next row array index is processed and the row columns are looped through it
                rebuildArrayOfRows.push(rebuildRow)
                if (rebuildArrayOfRows.length + 1 == arrayOfRows.length) {
                  // console.log(rebuildArrayOfRows)
                  console.log('CSV file is now indexed', rebuildArrayOfRows)
                  buildArrayOfBatchesOfRows()
                }
                rebuildRow = []
              }
            }
          }
        }
        //call file reader onload
        myReader.readAsText(theFile.files[0]);
      }
      else {
        alert("This browser does not support HTML5.");
      }
    }
    else {
      alert("Please upload a valid CSV file.");
    }
    return false;
  }



  function processFile() {
    var fileSize = 0;
    let theFile = document.getElementById("myFile");
    // console.log(theFile.value)
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    //check if file is CSV
    if (regex.test(theFile.value.toLowerCase())) {
      //check if browser support FileReader
      if (typeof (FileReader) != "undefined") {
        //get table element
        let table = document.getElementById("myTable");
        let headerLine = "";
        //create html5 file reader object
        let myReader = new FileReader();
        // call filereader. onload function
        myReader.onload = function (e) {
          let content = myReader.result;
          // console.log('::: RAW CVS DATA :::', content)
          // convert contect into an array of rows
          const arrayOfRows = content.split('\r')
          // console.log('::: Array Of Rows :::', 'Number Of Rows From CSV', arrayOfRows.length - 1, arrayOfRows)
          // run a loop from the array of rows to console log 1 row at a time
          const columnHeader = arrayOfRows[0].split(',')
          // console.log(columnHeader.length)
          let rebuildRow = []
          let rebuildArrayOfRows = []
          let cellIterator = []





          for (let rowIndex = 0; rowIndex < arrayOfRows.length; rowIndex++) {

            const rowIterator = arrayOfRows[rowIndex].split(',')

            for (let cellIndex = 0; cellIndex < rowIterator.length; cellIndex++) {

              cellIterator = rowIterator[cellIndex]
              if (cellIterator == ' LLC' || cellIterator == ' LLC"' || cellIterator == ' LLC."' || cellIterator == ' L.L.C."' || cellIterator == ' Inc"' || cellIterator == ' Inc.' || cellIterator == ' Inc."' || cellIterator == ' Inc."' || cellIterator == ' INC.\"' || cellIterator == '\"' || cellIterator == 'Ltd' || cellIterator == 'Ltd.' || cellIterator == 'Ltd."' || cellIterator == 'Ltd"' || cellIterator == ' Ltd.\"' || cellIterator == ' LC.\"' || cellIterator == ' Inc. RESIDENTIAL\"' || cellIterator == ' L\"' || cellIterator == ' Jetways Systems\"' || cellIterator == ' National Associat\"' || cellIterator == ' INC\"') {
              } else {
                // await sleep()
                rebuildRow.push(cellIterator)
              }
              if (rebuildRow.length < columnHeader.length) {
              } else {
                // console.log(rebuildRow)



                const doSomething = async () => {

                  const sendCSVRowDataToDatabase = { columnA: rebuildRow[0], columnB: rebuildRow[1], columnC: rebuildRow[2], columnD: rebuildRow[3], columnE: rebuildRow[4], columnF: rebuildRow[5], columnG: rebuildRow[6], columnH: rebuildRow[7], columnI: rebuildRow[8], columnJ: rebuildRow[9], columnK: rebuildRow[10], columnL: rebuildRow[11], columnM: rebuildRow[12], columnN: rebuildRow[13] }
                  // console.log(rebuildRow)
                  // console.log(sendCSVRowDataToDatabase)
                  try {
                    const { data } = await createFromCSVData({
                      variables: {
                        ...sendCSVRowDataToDatabase
                      }
                    });
                  } catch (e) {
                    console.log(e)
                  }



                }
                doSomething()

                rebuildArrayOfRows.push(rebuildRow)
                if (rebuildArrayOfRows.length + 1 == arrayOfRows.length) {
                  console.log('CSV file is now indexed')
                  console.log(rebuildArrayOfRows)

                }
                rebuildRow = []
              }
            }

          }


          console.log('Making GraphQl Requests')
          let timer = 0
          setInterval(() => {
            let time = timer++
            // console.log(time)
            return
          }, 1000);

          if (loadingToCreateCSVData == true) {
            // console.log('Maging GraphQl Mutation Requests')
          } else {
            console.log('Done')
            const timeStoped = timer++
            console.log(csvDataDump)
            if (loadingToCreateCSVData == false) {
              console.log(csvDataDump)
            }
            // console.log(timeStoped)
            // console.log(rebuildArrayOfRows)
          }




        }
        //call file reader onload
        myReader.readAsText(theFile.files[0]);
      }
      else {
        alert("This browser does not support HTML5.");
      }
    }
    else {
      alert("Please upload a valid CSV file.");
    }

    // return false;
  }




  // const [createFromCSVData, { error }] = useMutation(CREATE_CSV_DATA_DUMP, {
  //   update(cache, { data: { createFromCSVData } }) {
  //     try {
  //       const { findAllCSVData } = cache.readQuery({ query: FIND_ALL_CSV_DATA })
  //       cache.writeQuery({
  //         query: FIND_ALL_CSV_DATA,
  //         data: { findAllCSVData: [createFromCSVData, ...findAllCSVData] }

  //       });
  //     } catch (e) {
  //       console.log(e)
  //     }

  //     // const { findMe } = cache.readQuery({ query: FIND_ME })
  //     // cache.writeQuery({
  //     //   query: FIND_ME,
  //     //   data: { findMe: { ...findMe, findAllCSVData: [...findMe.myTours, createFromCSVData] } }
  //     // })
  //   }
  // })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <br />
        <input id="myFile" type="file"></input>
        <button onClick={checkCSVFile}>Check CSV index</button>
        <button onClick={processFile}>Send to database</button>
        <button onClick={deleteFromDatabase}>Delete Database</button>
      </header>
    </div>
  );
}

export default App;
