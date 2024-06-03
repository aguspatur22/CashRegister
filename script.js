let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
const mappings = {
    PENNY: ['Pennies',0.01],
    NICKEL: ['Nickels',0.05],
    DIME: ['Dimes',0.1],
    QUARTER: ['Quarters',0.25],
    ONE: ['Ones',1.0],
    FIVE: ['Fives',5.0],
    TEN: ['Tens',10.0],
    TWENTY: ['Twenties',20.0],
    'ONE HUNDRED': ['Hundreds',100.0]
  };
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const changeDue = document.getElementById("change-due");
const changeLeft = document.getElementById("cash-drawer-display");


const updateUI = () => {
  let displayHTML = `<p><strong>Change in drawer: </strong></p>`;
  cid.forEach((el) => {
    displayHTML+= `
    <p>${mappings[el[0]][0]}: $${el[1]}</p>`
    });
  changeLeft.innerHTML = displayHTML;
};


const updateCid = (array) => {
  array.forEach((item, index) => {
    cid[index][1] = item[1];
  });
};


const updateResult = (result) => {
  let resultHTML = cid.every((item) => item[1] === 0) ? "Status: CLOSED " : "Status: OPEN ";
  for (const x in result) {
      resultHTML+= `${x}: $${result[x]} `;
  }
  changeDue.innerHTML = resultHTML;
};


const calculateChange = (cash) => {
  let change = (cash - price);
  let reversed = cid.map(item => [...item]).reverse(); // Create a deep copy and reverse it
  let result = {}
  reversed.forEach((item) => {
    while(change >= mappings[item[0]][1] && (item[1] / mappings[item[0]][1]).toFixed(2) > 0) {
      change = Number((change - mappings[item[0]][1]).toFixed(2));
      item[1] = Number((item[1] - mappings[item[0]][1]).toFixed(2));
      if (result[item[0]]) {
        result[item[0]] += mappings[item[0]][1];
      } else {
        result[item[0]] = mappings[item[0]][1];
      }
    } 
  });

  //Check sufficient change
  if (change === 0) {
    updateCid(reversed.reverse());
    updateResult(result);
  } else {
    changeDue.innerHTML = "Status: INSUFFICIENT_FUNDS";
  }
};
 
updateUI();

purchaseBtn.addEventListener("click", () => {
  console.log()
  if (cash.value < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (parseFloat(cash.value) === price) {
    changeDue.innerText = "No change due - customer paid with exact cash";
  } else {
    calculateChange(parseFloat(cash.value));
  }

  updateUI();
});
