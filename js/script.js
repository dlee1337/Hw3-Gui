/*
File: script.js
GUI Assignment: Homework 3, creating a dyanmic multiplication table.
David Lee, Umass Lowell, david_lee2@student.uml.edu
Date: 11/02/2024
Description:
For this assignment we were responsible for using Js to create a dynamic multiplication table.
For getting used to more nuanced things like the math.abs function, overflow(scroll), and the .some method I referred to a variety of the resources.
These are the resources I used:
    - lecture notes
    - the additional resources provided in the pdf released on blackboard
    - mdn Docs & w3schools, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array.
    - implementations of 2d arrays and matrix implementations: https://youtube.com/shorts/09FgFjtPETM?si=A1T5keziN7gZw4xp
*/

function generateTable() {
    //pulling inputs from the form in html
    var rStart = Number(document.getElementById('rowStart').value);
    var rEnd = Number(document.getElementById('rowEnd').value);
    var cStart = Number(document.getElementById('colStart').value);
    var cEnd = Number(document.getElementById('colEnd').value);
    //checks all parameters & swaps if start point > end point
    if (rStart > rEnd) {
        let tmp = rStart;
        rStart = rEnd;
        rEnd = tmp;
    }
    if (cStart > cEnd) {
        let tmp = cStart;
        cStart = cEnd;
        cEnd = tmp;
    }
    //bounds checker
    const tmp = [rStart, rEnd, cStart, cEnd]; //shove into array
    const isOOB = tmp.some(value => Math.abs(value) > 50); // in the event numbers are greater than 50 popup msg.
    if (isOOB) {
        document.getElementById('statusMsg').innerHTML = "Please enter a number [-50,50] inclusive.";
        return false; // prevents user from submitting in the event that their input does not meet the criteria.
    }
    else {
        document.getElementById('statusMsg').innerHTML = "Your numbers fit the criteria, success!";
    }
    //calculation portion, creating matrix
    var matrix = [];
    for (i = rStart; i <= rEnd; i++) {
        tmp1 = [];
        for (j = cStart; j <= cEnd; j++) {
            var result = i * j;

            tmp1.push(result);
        }
        matrix.push(tmp1);
    }
    //call render function
    renderTable(matrix);
    return false; //prevents code from jumping back into loop.
}

function renderTable(matrix) {
    //default parameters
    var rStart = Number(document.getElementById('rowStart').value);
    var rEnd = Number(document.getElementById('rowEnd').value);
    var cStart = Number(document.getElementById('colStart').value);
    var cEnd = Number(document.getElementById('colEnd').value);
    //double check for swap once more
    if (rStart > rEnd) {
        let tmp = rStart;
        rStart = rEnd;
        rEnd = tmp;
    }
    if (cStart > cEnd) {
        let tmp = cStart;
        cStart = cEnd;
        cEnd = tmp;
    }

    //start of rendering table by calling tag
    var output = "<table>";
    //index for column number
    var index = 0;
    //top section, removes top left cell
    output += "<tr>";
    output += "<th style='border-top:none; border-left:none;'></th>";
    //row numbers
    for(i = 0; i <= rEnd-rStart; i++) {
        var tmp = i + rStart;
        output += "<th style='background-color:darkgreen;'>" + tmp + "</th>";
    }
    output += "</tr>";
    //generates rest of the table
    for(i = 0; i <= rEnd-rStart; i++) {
        output = output + "<tr>";
        for(j = -1; j <= cEnd-cStart; j++) { //starts at -1 to account for shift
            if (j==-1) {
                //calculates column numbers
                var tmp = index + cStart;
                output = output + "<th style='background-color:darkgreen;'>" + tmp + "</th>";
                index++;
            }
            else {
                output = output + "<td>" + matrix[i][j] + "</td>"; //products
            }
        }
        output = output + "</tr>" // closing tags - row
    }
    output += "</table>"; // closing tags - table
    myTable.innerHTML=output; //display - table
}


