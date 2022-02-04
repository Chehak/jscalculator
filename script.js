class Calculator{
constructor(previousOperand,currentOperand){
this.previousOperandTextElement= previousOperand;
this.currentOperandTextElement=currentOperand;
this.clear()
}
clear(){
this.currentOperand=' ' ;
this.previousOperandTextElement.innerText=' ' ;
this.operation=undefined ;
}
delete(){
this.currentOperand = this.currentOperand.toString().slice(0,-1);
}
appendNumber(number){
  //  if number already includes point(.) then we have to return it , we have to convert number to string so
  //  that we can have proper display over there

if(number==='.' && this.currentOperand.includes('.'))return
this.currentOperand= this.currentOperand.toString()+number.toString();  
}
chooseOperation(operation){
if(this.currentOperand==='') return
if(this.previousOperand !=''){
  this.compute()
}
this.operation=operation;
this.previousOperand=this.currentOperand;
this.currentOperand='';

}
compute(){
let computaion
const prev = parseFloat(this.previousOperand)
const current= parseFloat(this.currentOperand)
if(isNaN(prev)|| isNaN(current))return
switch(this.operation){
    case '+':
    computaion= prev+current
    break; 
    case '-':
    computaion= prev-current
    break;  
    case '*':
    computaion= prev*current
    break;  
    case '÷':
    computaion= prev/current
    break;
    default:
    return;
}
this.currentOperand=computaion;
this.operation = undefined
this.previousOperand = '';

}
updateDisplay(){
  this.currentOperandTextElement.innerText=this.currentOperand
  if(this.operation!= null){
    this.previousOperandTextElement.innerText = 
    `${this.previousOperand} ${this.operation}`
  }
}
}

const numberButtons= document.querySelectorAll('[data-number]');
const operationButton=document.querySelectorAll('[data-operation]')
const allClearButton=document.querySelector('[data-all-clear]');
const deleteButton=document.querySelector('[data-delete]');
const equalsButton=document.querySelector('[data-equals]');
const previousOperandTextElement=document.querySelector('[data-previous-operand]');
const currentOperandTextElement=document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
operationButton.forEach(button =>{
  button.addEventListener('click',()=>{
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay();
  })
})
equalsButton.addEventListener('click', button =>{
  calculator.compute()
  calculator.updateDisplay()
})
allClearButton.addEventListener('click', () =>{
  calculator.clear()
  calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
  calculator.delete()
  calculator.updateDisplay()
})