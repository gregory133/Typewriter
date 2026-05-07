const findAllMatches=(textList:any, searchText:string)=>{
    // console.log(textList, searchText);
    const matchingTexts=textList.map((text:any)=>{
        const title=text.title.toLowerCase()
        
        if (title.includes(searchText.toLowerCase())){
            return {'title':text.title, 'contents':text.contents, 'dateCreated':text.dateCreated}
        }
        return null
    })
    // console.log('matching', matchingTexts);
    let returnArray:any[]=[]

    matchingTexts.forEach((element:any) => {
        if (element!=null){
            returnArray.push(element)
        }
    }); 
    // console.log('return', returnArray);
    return returnArray
}

export default findAllMatches