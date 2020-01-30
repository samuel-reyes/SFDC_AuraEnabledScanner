
/**
Copyright 2020 Samuel Reyes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
**/

/* The purpose of this utility as it currently stands is simple.
* It is designed to scan Apex classes for @AuraEnabled methods.
* Upon finding them it will output the results to a log file (csv),
* for quick reference.
*
* The idea arose for this because of Salesforce mandatory security updates
* that would affect how user's have access to @AuraEnabled methods.
**/

const scanner = require('./src/scanner.js')
const csvBuilder = require('./src/csvBuilder')
const fs = require('fs')

let dirPath = process.argv[2]
const results = [];

if(process.argv.length <=2){
    console.log('Correct Usage: ' + __filename + ' path/to/directory')
    process.exit(-1)
}

if(!fs.existsSync(dirPath)){
    console.log('Directory path')
    
} else{
    let files = scanner.getFilesInDirectory(dirPath, '.cls')
    let toPush
    files.forEach(apexCalss=>{
        toPush = scanner.classScanner(apexCalss)
        if(toPush) results.push(toPush)
    })
}

if(results.length > 0){
    let csv = csvBuilder(results)
    const d = new Date()
    let fileName ='./AuraEnabledInformation' + d.getTime() + '.csv'
    fs.writeFile(fileName,csv,'utf8',(err) =>{
        if(err) console.log('failed to build CSV with err ' + JSON.stringify(err))
        else console.log('CSV built successfully!')
    })
}

// fs.readdir(dirPath, function(err,items){
//     console.log(items)
//     for(let i = 0; i < items.length; i++){
//         // console.log(items[i])
    
//     }
// })