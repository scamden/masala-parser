/**
 * Created by Simon on 14/12/2016.
 */

/**
 * This parse a text paragraph
 * text can be "simple" text; bold, italic or a mix (sequence) of those
 * a paragraph ends with a blank line("\n\n" or "\n  \t  \n") or "end of stream" (P.eos())
 */
import P from '../parsec/parser';
import stream from '../../lib/stream/index';
import T from '../../lib/standard/token';

function stop(){
    return P.eos.or(T.lineFeed()).or(P.char('*'));
}

function pureText(){
    return P.not(stop()).rep()
        .map(a=>a.join('').replace(/\n/g, " "));//  ['a','\n','b'] -> 'a b'
}

function italic(){
    return P.char('*')
        .thenRight(pureText())
        .thenLeft(P.char('*'))
        .map(string => ({italic:string})  )
}

function bold(){
    return P.string('**')
        .thenRight(pureText())
        .thenLeft(P.string('**'))
        .map(string => ({bold:string})  )
}

function text(){
    return pureText()
        .map(string => ({text:string}) )
}


function formattedParagraph(){
    return T.blank()
        .thenRight(bold().or(italic()).or(text()).rep() )
        .thenLeft(stop())
        .map(array =>({paragraph:array}))
}

function readText(){
  //  return stop().or(anything().rep().map(a=>a.join(''))).optrep();
    return stop().opt()
            .thenRight(
        rawText()
        .thenLeft(stop()).rep()
        )
        .then(rawText())
        .flattenDeep()
}



function parseText( line, offset=0){
   // return formattedParagraph().parse(stream.ofString(line), offset)
    return formattedParagraph().parse(stream.ofString(line), offset)
}


export default {
    formattedParagraph,

    parse(line){
        return parseText(line,0);
    }
}