const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

// array that store information of user fetched from the api
let data = []

// Add new user to data array & Update the DOM
function addData(obj) {
  data.push(obj)
  updateDOM()
}

// Fetch random user data , process the data & and push into data array
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  const user = data.results[0]
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  }
  addData(newUser)
}

// Updating the DOM
// here providedData = data means it is the default value if no argument is passed to the function
function updateDOM(providedData = data) {
  // Clearing the main div's content & setting to these default content
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'
  //   for each user in the data array, create a div with class person and set it's content with innerHTML and finally append the div to main div as child
  providedData.forEach((item) => {
    const element = document.createElement('div')
    element.classList.add('person')
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`
    main.appendChild(element)
  })
}

// Double everyone's money by mapping though each user in the data array and calling the updating the DOM again
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 }
  })
  updateDOM()
}

// show only Millionaires in the list
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000)
  updateDOM()
}

// sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

// Calculate the total wealth with reduce function and created new HTML element and appended to the main div as child
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0)

  const wealthEl = document.createElement('div')
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`
  main.appendChild(wealthEl)
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// Event Listener
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', showMillionaires)
calculateWealthBtn.addEventListener('click', calculateWealth)
