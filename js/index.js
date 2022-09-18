String.prototype.replaceAt = function (index, character) {
	return (
		this.substring(0, index) +
		character +
		this.substring(index + character.length)
	);
};

const verifyButton = document.querySelector("#verify");
const resetButton = document.querySelector("#reset");
const word = document.querySelector("#word");
const letterInput = document.querySelector("#letter-input");
let lifes = 0;

const getKey = () => {
	const posibilities = ["gato", "perro", "casa", "elefante"];
	return posibilities[Math.floor(Math.random() * posibilities.length)]; //posibilidades [3 -0 -1 -2]
};

const vocalLetter = ['a','e','i','o','u'];

const replaceKey = (key) => {
	let encrypted = key.replace(/./g, "_ ");
    for(const i in key){
        if (vocalLetter.includes(key[i])) {
            encrypted = encrypted.replaceAt(i*2,key[i]);
            word.innerHTML = encrypted;
            break;
         } 
    }    
    return encrypted;
};

const resetGame = () => {
	lifes = 0;
    key = getKey();
    encryptedKey = replaceKey(key);
	word.innerHTML = encryptedKey;
    for(let i = 0;i<5;i++){
        document.querySelector(`#image-${i}`).style.display = 'none';
    }
    letterInput.removeAttribute('disabled');
    letterInput.value='';
    verifyButton.style.display='inherit';
    resetButton.style.display='none';
    console.log(key);
};

let key = getKey();
let encryptedKey = replaceKey(key);
let included = false;

console.log(key);

word.innerHTML = encryptedKey;

const verifyLetter = () => {
    const letter  = letterInput.value.toLowerCase();
	console.log(letter);    
    for(const i in key){
        if (letter == key[i]) {			
            letterInput.value = '';
            encryptedKey = encryptedKey.replaceAt(i*2,letter);
            word.innerHTML = encryptedKey;            
            included = true;            
         } 
    }

    included = key.includes(letter);

    if(!included){
        if(lifes!=0){
            document.querySelector(`#image-${lifes-1}`).style.display = 'none';
        }
        document.querySelector(`#image-${lifes}`).style.display = 'inherit';
        console.log(lifes);        
        lifes++;
    }	

    if(!encryptedKey.includes('_')){
        letterInput.setAttribute('disabled','');
        verifyButton.style.display='none';
        resetButton.style.display='inherit';       
        alert('Felicidades ganaste');
    }

    if(lifes == 5){        
        letterInput.setAttribute('disabled','');
        verifyButton.style.display='none';
        resetButton.style.display='inherit';       
        alert('Juego terminado');
    }
};

const reset = () => {    
    resetGame();    
}

//0 a 1 0*1 , 0*2, 0.....4 0.0001 4 4

verifyButton.addEventListener("click", verifyLetter);
resetButton.addEventListener("click", reset);