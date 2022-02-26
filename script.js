const billEl = document.getElementById('bill'),
  peopleEl = document.getElementById('people'),
  tipParentEl = document.querySelector('.input-form-tip'),
  customTipEl = document.getElementById('custom'),
  tipAmountEl = document.getElementById('tip'),
  totalEl = document.getElementById('total'),
  resetBtn = document.getElementById('reset')

let bill = 0,
  tipPercentage = 0,
  people = 0

// Event Listeners
billEl.addEventListener('change', (e) => (bill = parseFloat(e.target.value)))

peopleEl.addEventListener('change', (e) => {
  people = parseInt(e.target.value)

  calculateSplit()
})

tipParentEl.addEventListener('click', (e) => {
  removeTipActiveClass()

  if (e.target.type === 'button') {
    tipPercentage = parseInt(e.target.value)

    e.target.classList.add('active')

    calculateSplit()
  }
})

customTipEl.addEventListener(
  'change',
  (e) => (tipPercentage = parseInt(e.target.value))
)

resetBtn.addEventListener('click', resetApp)

// App implementation
function calculateSplit() {
  menageClasses()

  const tip = bill * (tipPercentage / 100)
  const split = (bill + tip) / people

  if (people === 0) {
    showResults(0, 0)
  } else {
    showResults(tip, split)
  }
}

function menageClasses() {
  if (people === 0) {
    peopleEl.classList.add('error')
  } else {
    peopleEl.classList.remove('error')
  }

  resetBtn.classList.remove('disabled')
}

function showResults(tip, split) {
  tipAmountEl.innerText = '$' + tip.toFixed(2)
  totalEl.innerText = '$' + split.toFixed(2)
}

function resetApp() {
  bill = 0
  tipPercentage = 0
  people = 0

  billEl.value = ''
  customTipEl.value = ''
  peopleEl.value = ''
  customTipEl.value = ''

  totalEl.innerText = '$00.00'
  tipAmountEl.innerText = '$00.00'

  removeTipActiveClass()

  resetBtn.classList.add('disabled')
  peopleEl.classList.remove('error')
}

function removeTipActiveClass() {
  tipParentEl
    .querySelectorAll('input[type="button"]')
    .forEach((el) => el.classList.remove('active'))
}
