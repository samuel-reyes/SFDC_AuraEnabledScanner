/**
 * Datatype is an array in the following format.
 * [ [ApexClassName,[{auraInfoObject}] ]
 * **/

const csvBuilder = function(apexInfoArray){
    // console.log('array collected, building CSV')
    let csvContent = 'data:text/csv;charset=utf-8,\n\nClass Name,Apex Name,Apex Type,Is Void,Is Static,Is Public,Full Method Line\n'

    apexInfoArray.forEach((item) => {
        item.className = item.className.trim()

        console.log(item)
        
        let toCSV = ''
        let sp = ','
        item.methods.forEach((method)=>{

            method.fullMethodLine = method.fullMethodLine.trim()
            method.methodName =method.methodName.trim()


            toCSV += item.className.trim() + sp
            + method.methodName.trim() + sp
            + method.type + sp
            + method.isVoid + sp
            + method.isStatic + sp
            + method.isPublic + sp
            + method.fullMethodLine.trim() + '\n'
        })

        csvContent += toCSV.trim()
    });

    console.log(csvContent)

    return csvContent
}

module.exports = csvBuilder