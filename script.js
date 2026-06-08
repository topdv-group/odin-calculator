
const add = ( a, b)=>{
    if(!Number.isInteger(a)||!Number.isInteger(b)){
        return 'NOT NUMBER';
    }
    return a + b;
};

const subtract = ( a, b)=>{
    if(!Number.isInteger(a)||!Number.isInteger(b)){
        return 'NOT NUMBER';
    }
    return a - b;
};

const multiply = ( a, b)=>{
    if(!Number.isInteger(a)||!Number.isInteger(b)){
        return 'NOT NUMBER';
    }
    return a * b;
};

const divide = ( a, b)=>{
    if(!Number.isInteger(a)||!Number.isInteger(b)){
        return 'NOT NUMBER';
    }
    if( a !== 0){
        let num = a / b;
        return num;
    }

    return 'MATH ERROR';
};

const allButtons = document.querySelectorAll("button");
const entry = document.querySelector("input");

entry.addEventListener("keypress",(event) =>{
    const allowedChars = /[0-9.]/;
        const controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter'];
        if (controlKeys.includes(event.key)) {
            return; 
        }

        if (!allowedChars.test(event.key)) {
            event.preventDefault();
        }
      
});

let entryList = [];
let firstNumber = 0;
let operatorId = '';
let singleNumber = '';

allButtons.forEach(button => {

    button.addEventListener("click",()=>{

        const NotAllowedIds = ['plus-min','minus','plus','multiply','divide','equals','dot','clear','put'];

        if(!NotAllowedIds.includes(button.id)){
            entryList.push(button.id);
        };

        singleNumber = entryList.join('');

        entry.value = singleNumber;

        if(NotAllowedIds.includes(button.id)){
            entry.value = '';
        };

        // console.log(entryList)
        // console.log(singleNumber)

        switch(button.id){
            case 'plus':
            case 'minus':
            case 'multiply':
            case 'divide':
                    firstNumber = Number(singleNumber);
                    operatorId = button.id;
                    singleNumber = '';
                    entry.value = '';
                    entryList =[''];
                  
            break;
                
            case 'equals':

                singleNumber = Number(singleNumber);

                if(operatorId === 'plus') result = add(firstNumber,singleNumber);
                if(operatorId === 'minus') result = subtract(firstNumber,singleNumber);
                if(operatorId === 'multiply') result = multiply(firstNumber,singleNumber);
                if(operatorId === 'divide') result = divide(firstNumber,singleNumber);

                entry.value = result;
                
                break;    
        } 
    });
    
});






