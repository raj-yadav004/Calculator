const previousDisplay = document.querySelector('#previous-display');
const currentDisplay = document.querySelector('#current-display');

currentInput = '0';
previousInput = '';
operator = '';
shouldResetDisplay = false;

updateDisplay();
let buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {

    let buttonText = button.textContent;
    let buttonId = button.id;

    button.addEventListener("click", () => {

        if (buttonId === 'AC') {
            clearAll();

        } else if (buttonId === 'backspace') {
            deleteLastDigit();
        } else if (buttonId === 'Equals') {
            calculate();
        } else if (['+', '-', 'x', '/', '%'].includes(buttonText)) {
            handleOperator(buttonText)
        }else if(buttonId === 'dot'){
            addDecimal(); 
        }
         else {
            appendNumber(buttonText);
        }

        updateDisplay();

    });

});

// function for update display 
function updateDisplay() {
    currentDisplay.textContent = currentInput;

    if (operator && previousInput) {
        previousDisplay.textContent = `${previousInput} ${operator}`
    }
    else {
        previousDisplay.textContent = '';
    }
}
function handleOperator(op){
   if(operator && !shouldResetDisplay){
    calculate(); 
   }
   previousInput = currentInput;
   operator = op; 
   shouldResetDisplay = true; 


}
function calculate(){
    if(!operator&& shouldResetDisplay) return; 

    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);
    let result; 

    switch(operator){
        case '+':
            result = prev + curr; 
            break; 
        case '-':
            result = prev - curr; 
            break; 
        case 'x':
        case '*':
            result = prev * curr; 
            break; 
        case '/':
            if(curr === 0){
                alert("cannot divide by 0"); 
                clearAll(); 
                return ; 
            }
            result = prev / curr; 
            break; 
        case '%':
            if(curr === 0){
                alert("cannot mudulo with zero");
                clearAll();
                return; 
            }
            result = prev % curr; 
            break; 
        default:
            return; 
    }
    currentInput = Math.round(result * 100000000) / 100000000+'';
    previousInput = '';
    operator = '';
    shouldResetDisplay = true; 
}


function clearAll(){
    currentInput = '0';
    previousInput = '';
    operator = ''
    shouldResetDisplay = false;
}
function deleteLastDigit(){
    if(shouldResetDisplay){
        shouldResetDisplay = false; 
    }
    if(currentInput.length > 1){
        currentInput =  currentInput.slice(0,-1);
    }
    else {
        currentInput = '0';
    }


    
}
function appendNumber(num){
    if(shouldResetDisplay){
        currentInput =num; 
        shouldResetDisplay = false;
    }
    else {
        if(currentInput === '0' && num === '0'){
            return ;
            
        }
        else if(currentInput === '0'){
            currentInput = num; 
        }
        else {
            currentInput +=num; 
        }
    }
   
}
function addDecimal(){
    if(shouldResetDisplay){
        currentInput = '0.';
        shouldResetDisplay = false; 
    }
    else if(!currentInput.includes('.')) {
        currentInput += '.';
    }
}


document.addEventListener('keydown',(e)=>{
    if(e.key >= '0' && e.key <= 9){
        appendNumber(e.key);
        updateDisplay();  

    }else if (e.key === 'Enter'){
        e.preventDefault(); 
        calculate(); 
        updateDisplay(); 
    }
    else if(e.key === 'Escape'){
        clearAll(); 
        updateDisplay(); 

    }else if(e.key === '+' || e.key === '/' || e.key === '*' || e.key === '-' || e.key === '%'){
        let op = e.key === '*' ? 'x':e.key; 
        handleOperator(op); 
        updateDisplay(); 
    }
    else if(e.key === '.'){
        addDecimal(); 
        updateDisplay(); 
    } else if(e.key === 'Backspace'){
        deleteLastDigit(); 
        updateDisplay(); 
    }
});