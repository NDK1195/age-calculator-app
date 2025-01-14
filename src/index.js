const form = document.getElementById("form");
const inputs = document.querySelectorAll(".inputs");
const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");
const years = document.getElementById("years");
const months = document.getElementById("months");
const days = document.getElementById("days");

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

function validateInput() {
  let isValidate = true;

  if (inputDay.value === "") {
    isValidate = false;
    changeToErrorStyle(inputDay, "This field is required");
  } else if (inputDay.value > 31) {
    isValidate = false;
    changeToErrorStyle(inputDay, "Must be a valid day");
  } else if (inputDay.value < 1) {
    isValidate = false;
    changeToErrorStyle(inputDay, "Must be a valid day");
  } else if (!validDayInMonth(inputDay.value, inputMonth.value)) {
    isValidate = false;
    changeToErrorStyle(inputDay, "Must be a valid date");
  }

  if (inputMonth.value === "") {
    isValidate = false;
    changeToErrorStyle(inputMonth, "This field is required");
  } else if (inputMonth.value > 12) {
    isValidate = false;
    changeToErrorStyle(inputMonth, "Must be a valid month");
  } else if (inputMonth.value < 1) {
    isValidate = false;
    changeToErrorStyle(inputMonth, "Must be a valid month");
  }

  if (inputYear.value === "") {
    isValidate = false;
    changeToErrorStyle(inputYear, "This field is required");
  } else if (inputYear.value < 1) {
    isValidate = false;
    changeToErrorStyle(inputYear, "Must be a valid year");
  } else if (inputYear.value > currentYear) {
    isValidate = false;
    changeToErrorStyle(inputYear, "Must be in the past");
  }

  return isValidate;
}

function changeToErrorStyle(input, message) {
  input.style.borderColor = "hsl(0, 100%, 67%)";
  input.previousElementSibling.classList.remove("text-smokey-grey");
  input.previousElementSibling.classList.add("text-light-red");
  input.nextElementSibling.textContent = message;
}

function validDayInMonth(day, month) {
  if ([1, 3, 5, 7, 8, 10, 12].includes(Number(month)) && Number(day) <= 31) {
    return true;
  } else if (currentMonth === 2 && (Number(day) <= 28 || Number(day) <= 29)) {
    return true;
  } else if ([4, 6, 9, 11].includes(Number(month)) && Number(day) <= 30) {
    return true;
  } else {
    return false;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateInput()) {
    const inputDate = new Date(
      inputYear.value,
      inputMonth.value - 1,
      inputDay.value,
    );

    let yearsResult = currentYear - inputDate.getFullYear();
    let monthsResult = currentMonth - (inputDate.getMonth() + 1);
    let daysResult = currentDay - inputDate.getDate();

    if (monthsResult < 0) {
      yearsResult--;
      monthsResult += 12;
    }

    if (daysResult < 0) {
      monthsResult--;
      daysResult += new Date(
        inputDate.getFullYear(),
        inputDate.getMonth() + 1,
        0,
      ).getDate();

      if (monthsResult < 0) {
        yearsResult--;
        monthsResult += 12;
      }
    }

    let yearsValue = 0;
    let monthsValue = 0;
    let daysValue = 0;

    years.textContent = yearsValue;
    months.textContent = monthsValue;
    days.textContent = daysValue;

    const yearsInterval = setInterval(() => {
      if (yearsValue === yearsResult) {
        clearInterval(yearsInterval);
      }

      years.textContent = yearsValue++;
    }, 15);

    const monthsInterval = setInterval(() => {
      if (monthsValue === monthsResult) {
        clearInterval(monthsInterval);
      }

      months.textContent = monthsValue++;
    }, 15);

    const daysInterval = setInterval(() => {
      if (daysValue === daysResult) {
        clearInterval(daysInterval);
      }

      days.textContent = daysValue++;
    }, 15);
  }
});

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.style.borderColor = "hsl(259, 100%, 65%)";

    const inputLabel = input.previousElementSibling;
    inputLabel.classList.remove("text-light-red");
    inputLabel.classList.add("text-smokey-grey");

    const errorText = input.nextElementSibling;
    errorText.textContent = "";
  });

  input.addEventListener("blur", () => {
    input.style.borderColor = "hsl(0, 0%, 86%)";
  });
});
