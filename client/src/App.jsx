import logo from './logo.svg';
import { useQuery, useMutation } from '@apollo/client';
import './App.css';
import React, { useState } from 'react';
import { FIND_ALL_CSV_DATA } from './connections/queries/CSVQueries'
import { CREATE_CSV_DATA_DUMP, DELETE_ALL_CSV_DATA_DUMP } from './connections/mutations/CSVMutations'


function App() {

  const { loading: loadingCSV, data: dataCSV } = useQuery(FIND_ALL_CSV_DATA)
  const csvDataDump = dataCSV?.findAllCSVData || {}
  console.log(csvDataDump)

  const [deleteDatabase, { loading: loadedDeleteDatabase, data: dataDeleteDatabase }] = useMutation(DELETE_ALL_CSV_DATA_DUMP, {
    refetchQueries: [
      { query: FIND_ALL_CSV_DATA },
  ]
  })

  const deleteFromDatabase = async () => {
    console.log('delete me')

    try {
      await deleteDatabase()
    }
    catch (err) {
      console.log(err)
    }

  }

  function processFile() {
    var fileSize = 0;
    //get file
    var theFile = document.getElementById("myFile");

    console.log(theFile.value)

    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    //check if file is CSV
    if (regex.test(theFile.value.toLowerCase())) {
      //check if browser support FileReader
      if (typeof (FileReader) != "undefined") {
        //get table element
        var table = document.getElementById("myTable");
        var headerLine = "";
        //create html5 file reader object
        var myReader = new FileReader();
        // call filereader. onload function
        myReader.onload = function (e) {
          var content = myReader.result;
          // console.log('::: RAW CVS DATA :::', content)
          // convert contect into an array of rows
          const arrayOfRows = content.split('\r')
          console.log('::: Array Of Rows :::', 'Number Of Rows From CSV', arrayOfRows.length - 1, arrayOfRows)
          // run a loop from the array of rows to console log 1 row at a time
          const columnHeader = arrayOfRows[0].split(',')
          console.log(columnHeader.length)
          let rebuildRow = []
          let rebuildArrayOfRows = []
          let cellIterator = []
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
                console.log(rebuildArrayOfRows)
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <br />
        <input id="myFile" type="file"></input>
        <button onClick={processFile}>Pocess file</button>

        <button onClick={deleteFromDatabase}>Delete Database</button>
      </header>
    </div>
  );
}

export default App;
