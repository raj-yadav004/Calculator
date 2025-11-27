const previousOperation = document.getElementById('previous-operation');
const currentOperation = document.getElementById('current-operation');

let currentInput = '0';
let previousInput = '';
let operator = '';
let ShouldResetDisplay = false;


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
        } else if (['+', '-', '/', '*'].includes(buttonText)) {
            handleOperator(buttonText);
        } else if (buttonId === 'Decimal') {
            adddecimal();
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
    if (ShouldResetDisplay) {
        currentInput = num;
        ShouldResetDisplay = false;
    } else {
        if (currentInput === '0' && num !== '00') {
            currentInput = num;
        }
        else if (currentInput !== '0') {
            currentInput += num;
        }
    }
}

function handleOperator(op) {
    if (operator && !ShouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    ShouldResetDisplay = true;

}
function calculate() {
    if (!operator || ShouldResetDisplay) return;

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
    ShouldResetDisplay = true;

}


function deleteLastDigit() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    }
    else {
        currentInput = '0';
    }
}


function adddecimal() {
    if (ShouldResetDisplay) {
        currentInput = '0.';
        ShouldResetDisplay = false;
    }
    else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    ShouldResetDisplay = false;
}

document.addEventListener("keydown", (e) => {

    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
        updateDisplay();

    }
    else if (e.key === '.') {
        adddecimal();
        updateDisplay();

    }
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const op = e.key === '*' ? 'x' : e.key;
        handleOperator(op);
        updateDisplay();
    }
    else if (e.key === 'Enter' || e.key === '=') {
        calculate();
        updateDisplay();
    }
    else if (e.key === 'Escape') {
        clearAll();
        updateDisplay();
    }

});