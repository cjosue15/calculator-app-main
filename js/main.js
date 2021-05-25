const keypad$ = document.querySelector('.keypad');
const operationText$ = document.querySelector('#operation');
const equalButton$ = document.querySelector('.equal');
const resetButton$ = document.querySelector('.reset');
const delButton$ = document.querySelector('.del');
const result$ = document.querySelector('#result');
const resultBox$ = document.querySelector('.result-box');
const operationKeys = ['+', '-', 'x', '/'];
const objOperationKeys = {
  x: ' x',
  '-': '-',
  '+': '+',
  '/': '/',
};
let firstOperation = '';
let secondOperation = '';
operationText$.innerText = 0;
let signo = null;

const resetAll = (result) => {
  firstOperation = '';
  secondOperation = '';
  signo = null;
  operationText$.innerText = result;
  result$.innerText = '';
};

keypad$.addEventListener('click', ({ target } = e) => {
  const keyClass = target.classList[0];
  if (keyClass !== 'key') return;

  const key = target.innerText;

  if (operationKeys.includes(key)) {
    signo = key;
  }

  if (!signo) {
    if (!isNaN(Number(firstOperation + key))) {
      firstOperation += key;
    }
  } else {
    if (!isNaN(Number(secondOperation + key))) {
      secondOperation += key;
    }
  }

  operationText$.innerText = !signo ? firstOperation || 0 : secondOperation || 0;
  result$.innerText = `${firstOperation || ''} ${signo || ''} ${secondOperation || ''}`;
});

delButton$.addEventListener('click', () => {
  const numbers = [...firstOperation.split(''), signo, ...secondOperation.split('')];

  if (operationKeys.includes(numbers[numbers.length - 1])) {
    console.log('Imprimir');
    signo = null;
  } else {
    if (!signo) {
      const arr = firstOperation.split('');
      arr.splice(firstOperation.length - 1, 1);
      firstOperation = arr.join('');
    } else {
      const arr = secondOperation.split('');
      arr.splice(secondOperation.length - 1, 1);
      secondOperation = arr.join('');
    }
  }

  numbers.splice(numbers.length - 1, 1);
  operationText$.innerText = !signo ? firstOperation || 0 : secondOperation || 0;
  result$.innerText = `${firstOperation || ''} ${signo || ''} ${secondOperation || ''}`;
});

resetButton$.addEventListener('click', () => {
  resetAll(0);
});

equalButton$.addEventListener('click', () => {
  if (!secondOperation) return;
  let result;
  switch (objOperationKeys[signo]) {
    case '+':
      result = Number(firstOperation) + Number(secondOperation);
      break;
    case '-':
      result = Number(firstOperation) - Number(secondOperation);
      break;
    case 'x':
      result = Number(firstOperation) * Number(secondOperation);
      break;
    default:
    case 'x':
      result = Number(firstOperation) / Number(secondOperation);
      break;
  }

  resetAll(result);
});
