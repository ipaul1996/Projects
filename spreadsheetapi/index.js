const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require('fs');
const http = require('http');


// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import fs from 'fs';


// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet('1YLVHUpvnXZ5KwvqTXTqD8vs7uTkAaDqVs9JRDe1JyVk');


const CREDENTIALS = JSON.parse(fs.readFileSync('./clear-gantry-388204-b5be11dc86aa.json'));

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];


const getAnniversaryData = async () => {
   // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth({
    
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo(); // loads document properties and worksheets

    const sheet1 = doc.sheetsByIndex[0];
    let rows = await sheet1.getRows();

    let currentDate = new Date();
    let currentMonth = monthNames[currentDate.getMonth()];
    let currentDay = currentDate.getDate();
    let currentDayWithMonth = `${currentDay} ${currentMonth}`;
    // console.log(currentDayWithMonth);
    let data = [];
    let flag = false;
    for(let i = 0; i < rows.length; i++) {

        if(currentDayWithMonth === rows[i]['Anniversary Date']) {
            data.push(new Person(rows[i].Name, rows[i].DOB));
            flag = true;
        }
        
    }

    if(flag) {
        console.log(data);
    } else {
        console.log("No data found to display");
    }

    return data;

}


function Person(Name, DOB) {
    this.name = Name;
    this.dob = DOB
}



const server = http.createServer((req, res) => {
    if(req.url == "/anni") {
        res.end("<h1>About Page</h1>");
    } else {
        res.end("<h1>Page Not Found!</h1>")
    }
    
})

server.listen(5000, () => {
    console.log("Server is working!");
})




getAnniversaryData();

