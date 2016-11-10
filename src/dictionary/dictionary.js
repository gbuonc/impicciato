import animali from './animali';
import cose from './cose';
import mestieri from './mestieri';
import vegetali from './frutta';
import alphabet from '../helpers/alphabet';

const dictionary = {
   cose,
   animali,
   mestieri,
   vegetali
};
const dictionaryCopy = {
   cose,
   animali,
   mestieri,
   vegetali
};

const categories = Object.keys(dictionary);

// convert alphabet array to map object
const difficultyMap= alphabet.reduce((p,n) => {
 p[n.char]=n.multip;
 return p;
}, {});

let getLemmaDifficultyIndex = lemma => {
   // do not consider first and last chars because they are already visible
   const lettersInLemma = lemma.toUpperCase().split('').slice(1,-1);
   const firstChar = lettersInLemma[0];
   // sum difficulty points for every character in current word
   const total = lettersInLemma.reduce((p,n) =>{
      return p+difficultyMap[n];
   }, difficultyMap[firstChar])
   // set index as the average difficulty value, plus word length
   const difficultyIndex= (total/lemma.length) + lettersInLemma.length;
   return difficultyIndex
}

for (let category in dictionaryCopy) {
   if (dictionaryCopy.hasOwnProperty(category)) {
      let categoryObj = {};
      const lemmas = dictionaryCopy[category];
      const lemmasObj = lemmas.filter(lemma => lemma.length > 3).map(lemma => {
         let lemmaObj = {}
         lemmaObj.word = lemma;
         lemmaObj.difficultyIndex = getLemmaDifficultyIndex(lemma);
         return lemmaObj;
      });
      categoryObj.lemmas = lemmasObj;
      const averageLength = lemmasObj.reduce((p,n)=>{
         return p.word.length + n.word.length
      })/lemmas.length;
      console.log('average', averageLength);
      const maxVal = lemmasObj.map(obj => obj.difficultyIndex).reduce((p,n) =>{
         return p > n ? p : n
      })
      console.log(maxVal);
      const minVal = lemmasObj.map(obj => obj.difficultyIndex).reduce((p,n) =>{
         return p < n ? p : n
      })

      console.log(lemmasObj.filter(el => el.difficultyIndex <= minVal))
      console.log(minVal);
      dictionaryCopy[category] = categoryObj;
   }
}



// console.log(JSON.stringify(dictionaryCopy));

// var x = categories.map(el => {
//    let categoryObj = {};
//    categoryObj.cat = el;
//    categoryObj.arr = dictionary[el];
//    return categoryObj;
// })

// .map(arr => {
// return arr.map(word =>{
// const wordLength = word.length;
// const wordToArr = word.toUpperCase().split('');
// const total = wordToArr.reduce((p,n)=>{
// return p+difficultyMap[n];
// }, difficultyMap[wordToArr[0]]);
// const difficulty = total/wordLength;
// let obj = {word, wordLength, difficulty, total};
// return obj;
// })
// });
// console.log(JSON.stringify(x));


export default dictionary;
