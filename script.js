// Use generic number validation to allow decimals
const isValid = (a, b) => typeof a === 'number' && !isNaN(a) && typeof b === 'number' && !isNaN(b);

const add = (a, b) => isValid(a, b) ? a + b : 'NOT NUMBER';
const subtract = (a, b) => isValid(a, b) ? a - b : 'NOT NUMBER';
const multiply = (a, b) => isValid(a, b) ? a * b : 'NOT NUMBER';

const divide = (a, b) => {
  if (!isValid(a, b)) return 'NOT NUMBER';
  if (b === 0) return 'MATH ERROR'; // Fixed: Check divisor 'b', not dividend 'a'
  return a / b;
};

const allButtons = document.querySelectorAll("button");
const entry = document.querySelector("input");

// Handle keyboard inputs
entry.addEventListener("keypress", (event) => {
  const allowedChars = /[0-9.]/;
  const controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
  
  if (controlKeys.includes(event.key)) return;
  if (!allowedChars.test(event.key)) {
    event.preventDefault();
  }
});

let entryList = [];
let firstNumber = 0;
let operatorId = '';
let singleNumber = '';

allButtons.forEach(button => {
  button.addEventListener("click", () => {
    const actionIds = ['plus-min', 'minus', 'plus', 'multiply',
        'divide', 'equals', 'dot', 'clear', 'put', 'backspace', 'backspace1'];
    
    // Build the number if it is a digit
    if (!actionIds.includes(button.id)) {
      entryList.push(button.id);
      singleNumber = entryList.join('');
      entry.value = singleNumber;
    }
    
    // Handle specific action buttons
    switch (button.id) {

        case 'dot':
            if (!entryList.includes('.')) { // Prevent multiple decimals
                entryList.push('.');
                singleNumber = entryList.join('');
                entry.value = singleNumber;
            }
            break;

        case 'plus':
        case 'minus':
        case 'multiply':

        case 'divide':
            if (singleNumber !== '') {
                firstNumber = Number(singleNumber);
                operatorId = button.id;
                entryList = []; // Clear for next number
                singleNumber = '';
                entry.value = '';
            }
            break;
            
        case 'equals':
            if (operatorId && singleNumber !== '') {
                let secondNumber = Number(singleNumber);
                let result = 0;
                
                if (operatorId === 'plus') result = add(firstNumber, secondNumber);
                if (operatorId === 'minus') result = subtract(firstNumber, secondNumber);
                if (operatorId === 'multiply') result = multiply(firstNumber, secondNumber);
                if (operatorId === 'divide') result = divide(firstNumber, secondNumber);
                
                entry.value = result;
                
                // Reset state and store result for chained operations
                singleNumber = String(result);
                entryList = singleNumber.split(''); 
                operatorId = '';
            }
            break;
            
        case 'clear':
            entryList = [];
            firstNumber = 0;
            operatorId = '';
            singleNumber = '';
            entry.value = '';
            break;

        case 'backspace':
        case 'backspace1':
            entryList.pop(); 
            singleNumber = entryList.join(''); 
            entry.value = singleNumber; 
            break;
        }
    });
});
