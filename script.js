const hangmanImage=document.querySelector(".hangman-box img")
const keyboardDiv=document.querySelector(".keyboard")
const wordDisplay=document.querySelector(".word-display")
const guessesText=document.querySelector(".guesses-text b")
const gameModal=document.querySelector(".game-modal")
const playAgain=document.querySelector(".play-again")
let currenWord,correctLetters=[],wrongGuessCount=0;

const maxGuesses=6

const resetGame=()=>{
    correctLetters=[]
    wrongGuessCount=0
    wordDisplay.innerHTML=currenWord.split("").map(()=>`<li class="letter"></li>`).join("")
    gameModal.classList.remove("show")
    keyboardDiv.querySelectorAll("button").forEach((btn)=>{
        btn.disabled=false
    })
    hangmanImage.src=`hangman-${wrongGuessCount}.svg`
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`

}
function getRandomWord(){
    const {word,hint}=wordlist[Math.floor(Math.random()* wordlist.length)]
    document.querySelector(".hint-text b").innerText=hint
    wordDisplay.innerHTML=word.split("").map(()=>`<li class="letter"></li>`).join("")
    currenWord=word
    resetGame()
    console.log(word)
    
}

const gameOver=(isVictory)=>{
    setTimeout(()=>{ 
        const modalText=isVictory?`You found the word`:`the corrct word was:`
        gameModal.querySelector("img").src=`${isVictory?'victory' :`lost`}.gif`
        gameModal.querySelector("h4").innerText=`${isVictory?'congrats' :`Game Over!`}`
        gameModal.querySelector("p").innerHTML=`${modalText} <b>${currenWord}</b>`;
        gameModal.classList.add("show")},300)
}


const initGame=(button, clickedLetter)=>{
    if(currenWord.toLowerCase().includes(clickedLetter)){
        [...currenWord].forEach((letter,index)=>{
            if(letter.toLowerCase()===clickedLetter){
                correctLetters.push(letter)
                wordDisplay.querySelectorAll("li")[index].innerHTML=letter
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed")}

        })
    }
    else{
        wrongGuessCount++
        hangmanImage.src=`hangman-${wrongGuessCount}.svg`

    }
    if(wrongGuessCount===maxGuesses){return gameOver(false)}
    if(correctLetters.length===currenWord.length){return gameOver(true)}
    button.disabled=true
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`
    
}


for(let i=97;i<=122;i++){
    const button=document.createElement('button')
    button.innerText=String.fromCharCode(i)
    keyboardDiv.appendChild(button)
    button.addEventListener('click',e=>initGame(e.target,String.fromCharCode(i)));
}

 getRandomWord()
 playAgain.addEventListener('click',getRandomWord)