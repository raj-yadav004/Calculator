const previousOperation = document.getElementById('previous-operation');
const currentOperation = document.getElementById('current-operation');

let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false; // Initialized correctly


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

// FIX: Improved appendNumber logic for multi-digit input and '00' button
function appendNumber(num) {
    if (shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        // 1. Prevent '00' if display is currently just '0'
        if (currentInput === '0' && num === '00') {
            return;
        }

        // 2. If display is '0', replace it with the new number
        if (currentInput === '0') {
            currentInput = num;
        } 
        // 3. Otherwise, append the number
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
        case '*': // Added for keyboard compatibility
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


function addDecimal() { // Renamed from adddecimal to addDecimal
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
        e.preventDefault(); // Optional: prevent scroll on space/operator keys
        const op = e.key === '*' ? 'x' : e.key; // Map keyboard '*' to button 'x'
        handleOperator(op);
        updateDisplay();
    } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault(); // Prevent Enter from triggering button click/submit
        calculate();
        updateDisplay();
    } else if (e.key === 'Escape') {
        clearAll();
        updateDisplay();
    } 
    // FIX: Added Backspace support
    else if (e.key === 'Backspace') {
        deleteLastDigit();
        updateDisplay();
    }

});