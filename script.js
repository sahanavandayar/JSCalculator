//the calculator class has an constructor (take all inputs)
class Calculator {
  //clarifies that text display is in the calculator class, sets text elements in the class
  constructor(previousOperandTextElement, currentOperandTextElement) {
    //setting the previous number or operation to the next one
    this.previousOperandTextElement = previousOperandTextElement
    //resetting the current operand to the current one
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }
  //clear out diff variables
  //called again in calculator class
  clear() {
    //empty string as default
    this.currentOperand = ''
    this.previousOperand = ''
    //allClear has no operation selected, so it's defined
    this.operation = undefined
  }
  //removes a single number
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  //adds number to screen in UI
  appendNumber(number) {
    //prevents user from inputing multiple decimals in a row
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }
  //when a user clicks on an operation
  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }
  //takes values in calculator and pushes out one singular value
  compute() {
    let computation
    //parseFloat converts a string argument and converts it to a float
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    //NaN means Not a Number
    if (isNaN(prev) || isNaN(current)) return
    //here, you are matching up the values and operations buttons
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
    
      default:
        return
    }
    //actual computation taking place
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    //decimals can't be parsed into a float
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    //remove the decimal when compounding these integers
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        //returns number to local string, in case of a long number
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      //the dollar sign indicates concatinating both elements  
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}

//querySelector vs querySelectorAll allows one element to be selected at a time(think numbers)
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
//FLAG changes to query selector all
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
// below are not buttons, text elements
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//this is how you define new classes! good to keep in mind
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//take calculator to add number, append number to allow for compound numbers (ex. 36)
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})
//operation button to actually compute the operation
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
//this button adds and computes all the previous operations
equalsButton.addEventListener('click', button => {
  calculator.compute("")
  //below shoudl remain empty as it is displaying what was previously computed
  calculator.updateDisplay()
})
//allClear to clear the display
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})
//deleteButton function
deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

