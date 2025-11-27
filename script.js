const previousOperation = document.getElementById('previous-operation');
const currentOperation = document.getElementById('current-operation');

let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false; 


let buttons = document.querySelectorAll('.btns');

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        let buttonText = button.textContent;

        let buttonId = button.id;

        if (buttonId === 'AC') {
            clearAll();
        } else if (buttonId === 'Del') {
            deleteLastDigit();
        } else if (buttonId === 'Equals') {
            calculate();
        } else if (['+', '-', '/', 'x'].includes(buttonText)) {
            handleOperator(buttonText);
        } else if (buttonId === 'Decimal') {
            addDecimal();
        }
        else {
            appendNumber(buttonText);
        }

        updateDisplay();


    });

});

function updateDisplay() {
    currentOperation.textContent = currentInput;

    if (operator && previousInput) {
        previousOperation.textContent = `${previousInput} ${operator}`;

    } else {
        previousOperation.textContent = '';
    }
}


function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
       
        if (currentInput === '0' && num === '00') {
            return;
        }

       
        if (currentInput === '0') {
            currentInput = num;
        } 
      
        else {
            currentInput += num;
        }
    }
}

function handleOperator(op) {
    if (operator && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;

}
function calculate() {
    if (!operator || shouldResetDisplay) return;

    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    let result;

    switch (operator) {
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
            if (curr === 0) {
                alert("cannot divide by zero");
                clearAll();
                return;
            }
            result = prev / curr;
            break;
        default:
            return;

    }
    currentInput = Math.round(result * 100000000) / 100000000 + '';
    operator = '';
    previousInput = '';
    shouldResetDisplay = true;

}


function deleteLastDigit() {
    if (shouldResetDisplay) {
        shouldResetDisplay = false;
    }
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    }
    else {
        currentInput = '0';
    }
}


function addDecimal() { 
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    }
    else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
}

document.addEventListener("keydown", (e) => {

    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
        updateDisplay();

    } else if (e.key === '.') {
        addDecimal();
        updateDisplay();

    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        
        const op = e.key === '*' ? 'x' : e.key; 
        handleOperator(op);
        updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); 
        calculate();
        updateDisplay();
    } else if (e.key === 'Escape') {
        clearAll();
        updateDisplay();
    } 
    
    else if (e.key === 'Backspace') {
        deleteLastDigit();
        updateDisplay();
    }

});