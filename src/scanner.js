const fs = require('fs')
const path = require('path')
const jfile = require('jfile')
const auraLength = '@AuraEnabled'.length

const classScanner = function(apexClass){
    let className = apexClass.substring(apexClass.lastIndexOf('/')+1,apexClass.length)

    const output = {className:className, methods:[]}
    let currentFile = new jfile(apexClass)
    
    let useNextLine = false

    currentFile.lines.forEach(line=>{
        let classDetected = (line.includes('lass'))
        if(classDetected) useNextLine = false;

        if(useNextLine){
            
            let validityCheck = (
                line.length > 10 && 
                !line.includes('emoteAction') &&
                !line.includes('Todo') &&
                !line.includes('//')
            )
            

            
            let emptyProp = (
                !line.includes('(') &&
                !line.includes(')') &&
                !line.includes('{') &&
                !line.includes('}')
            )

            line = JSON.stringify(line)
            if(validityCheck){
                let auraInfo = {}
                auraInfo.type = (
                    (   line.includes('{ get') || 
                        line.includes('{get') || 
                        line.includes('set;')
                    ) || (emptyProp)
                    ) ? 'property' : 'method'
                
                auraInfo.isVoid = (line.includes('Void') || line.includes('void'))
                auraInfo.isStatic = (line.includes('Static') || line.includes('static'))
                auraInfo.isPublic = (line.includes('Public') || line.includes('public'))
                auraInfo.fullMethodLine = line
                
                if('method' === auraInfo.type){
                    let endpoint = line.lastIndexOf('(');
                    line = line.substring(0,endpoint);
                    
                    let startpoint = line.lastIndexOf(' ');
                    line = line.substring(startpoint,line.length) + '()'
                } else if('property' === auraInfo.type){
                    let endpoint
                    if(!emptyProp){
                        endpoint = line.indexOf('{')
                        line = line.substring(0,endpoint).trim();
                    } else{
                        line = line.substring(0,line.length-1)
                    }

                    console.log('prop line ' + line + '|')
                    
                    let startpoint = line.lastIndexOf(' ');
                    line = line.substring(startpoint,line.length)
                }
                
                auraInfo.methodName = line
                output.methods.push(auraInfo)
            }

            let sameLineProperty = (line.includes('uraEnable') && line.length > auraLength)

            if(validityCheck && !sameLineProperty) useNextLine = false
        }
        if(
            line.includes('@AuraEnabled') || 
            line.includes('@auraEnabled') && 
            !line.includes('*')) useNextLine = true;
    })

    if(output.methods.length > 0){
        // console.log(output)
        return output;
    } else return undefined
    
}

// Using recursion, we find every file with the desired extention, even if its deeply nested in subfolders.
const getFilesInDirectory = function(dir, ext) {
    if (!fs.existsSync(dir)) {
        console.log(`Specified directory: ${dir} does not exist`);
        return;
    }

    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);

        // If we hit a directory, apply our function to that dir. If we hit a file, add it to the array of files.
        if (stat.isDirectory()) {
            const nestedFiles = getFilesInDirectory(filePath, ext);
            files = files.concat(nestedFiles);
        } else {
            if (path.extname(file) === ext) {
                files.push(filePath);
            }
        }
    });

    return files;
}

module.exports = {
    classScanner:classScanner,
    getFilesInDirectory:getFilesInDirectory
}