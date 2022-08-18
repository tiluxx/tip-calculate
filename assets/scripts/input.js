const inputs = document.querySelectorAll('input');
const billInput = document.getElementById('bill__input');
const customInput = document.getElementById('custom__input');
const numberPeopleInput = document.getElementById('number-people__input');
const tipDisplay = document.getElementById('tip__amount');
const totalDisplay = document.getElementById('total__amount');
const resetBtn = document.querySelector('.content__result__reset__btn');
const btnSelectTip = document.getElementById('content__option__tip-boxes');

let billValue, tipValue, numberPeopleValue, tipPercent, tipPerPerson, totalPerPerson;

function clickTipHandler(val) {
    tipPercent = Number(val);
    calculateProgress();
}

function calculateProgress() {
    billValue = Number(billInput.value);
    tipValue = Number(tipPercent);
    numberPeopleValue = Number(numberPeopleInput.value);
    if (numberPeopleValue != 0) {
        tipPerPerson = (billValue * tipValue) / numberPeopleValue;
        totalPerPerson = (billValue *(tipValue + 1)) / numberPeopleValue;
        if (billValue && tipValue && numberPeopleValue) {
            tipDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
            totalDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
        }
    }
}

inputs.forEach(input => input.addEventListener('input', calculateProgress));

// Number of People validator
numberPeopleInput.addEventListener('input', (e) => {
    if (Number(e.target.value) == 0) {
        document.getElementById("number-people-title__error").style.display = "block";
        numberPeopleInput.classList.add("input-error");
        
    } else {
        document.getElementById("number-people-title__error").style.display = "none";
        numberPeopleInput.classList.remove("input-error");
    }
})

// Custom input
customInput.addEventListener('input', function() {
    const currActive = document.getElementsByClassName("btn-selected");
    if (currActive.length > 0) {
        currActive[0].className = currActive[0].className.replace(" btn-selected", "");
    }
    tipPercent = Number(this.value) / 100;
});

customInput.addEventListener('click', function() {
    const currActive = document.getElementsByClassName("btn-selected");
    if (currActive.length > 0) {
        currActive[0].className = currActive[0].className.replace(" btn-selected", "");
    }
});

// reset button
function reset() {
    billValue = 0;
    numberPeopleValue = 0;
    tipPercent = 0;
    tipDisplay.textContent = `$0.00`;
    totalDisplay.textContent = `$0.00`;
    inputs.forEach(input => (input.value = ''));
    const currActive = document.getElementsByClassName("btn-selected");
    if (currActive.length > 0) {
        currActive[0].className = currActive[0].className.replace(" btn-selected", "");
    }
}

resetBtn.addEventListener('click', reset);

// Select tip btn
const selectTipBtns = btnSelectTip.getElementsByClassName("content__option__tip-boxes-percent");
for (let i = 0; i < selectTipBtns.length; ++i) {
    selectTipBtns[i].addEventListener("click", () => {
        // Remove "active" of current btn
        const currActive = document.getElementsByClassName("btn-selected");
        if (currActive.length > 0) {
            currActive[0].className = currActive[0].className.replace(" btn-selected", "");
        }

        customInput.value = '';

        // Add "active" to btn selected
        selectTipBtns[i].classList.add("btn-selected");
    })
}