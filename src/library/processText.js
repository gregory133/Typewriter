const accents=new Set(['\'', '"', '`', '^', '&'])
const accentables=new Set(['e', 'a', 'i', 'o', 'u', 'c', 'y'])

const accentScores={
    '`': 0,
    "'": 1,
    '^': 2,
    '"': 3
}

const letterScores={
    'a': 224,
    'e': 232,
    'i': 236,
    'o': 242,
    'u': 249
}

const exceptions={
    'c&': 'ç',
    'ae': 'æ',
    'y"': 'ÿ'
}

const invarients=new Set([
    'o"', 'o`', "o'", 'o&', "u'", "a'", 'a"', 'a&', 'e&', "c'", 'c`', 'c"', 'c^',
    "i'", 'i`','i&',"u'", 'u&', "y'", 'y`', 'y^', 'y&'
])

export const processText=(text, cursorPos)=>{
    const accent=text.charAt(cursorPos-1)
	const letter=text.charAt(cursorPos-2)
    console.log();
    const lowercaseLetter=letter.toLowerCase()
    const combined=lowercaseLetter+accent
    const isUpper=(lowercaseLetter!=letter)

    // console.log(lowercaseLetter);

    if (invarients.has(combined)){
        return text
    }

    // console.log(Object.keys(exeptions));
    if (Object.keys(exceptions).includes(combined)){
        let equivalent=exceptions[combined]
        if (isUpper){
            equivalent=equivalent.toUpperCase()
        }
        // console.log(text.substring(0, cursorPos-2), equivalent, text.substring(cursorPos));
        text=text.substring(0, cursorPos-2)+equivalent+text.substring(cursorPos)
        
        return text
    }

    if (accents.has(accent) && accentables.has(lowercaseLetter)){
        const unicode=letterScores[lowercaseLetter]+accentScores[accent]
        text=getTextFromUnicode(unicode, text, isUpper, cursorPos)
        // console.log('hhere');
        return text
    }

    return text
}

const getTextFromUnicode=(unicode, text, isUpper, cursorPos)=>{
    let character=String.fromCharCode(unicode)
    // text=text.substring(0, text.length-2)

    if (isUpper){
        character=character.toUpperCase()
    }
    // text+=character
    text=text.substring(0, cursorPos-2)+character+text.substring(cursorPos)
    
    return text
}