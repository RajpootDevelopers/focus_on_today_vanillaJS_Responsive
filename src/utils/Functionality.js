const allCheckBoxes = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll("input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const result0 = document.getElementsByClassName("quote")[0];
const result1 = document.getElementsByClassName("quote")[1];
const progressTitle= document.getElementsByClassName("progress-title")[0];
const bottomQouat = document.getElementsByClassName("qoute")[0];
console.log(bottomQouat)


console.log(progressTitle)

const allQouats = [
    "Raise the bar by completing your goals!",
    "Well begun is half done!",
    "Just a step away, keep going!",
    "Whoa! You just completed all the goals, time for chill"
]

const bottomQouats = [
    "Move one step ahead today!",
    `Keep Going, You’re making great progress!`
]

let progValue = 0;

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};
console.log(allGoals);

let totalCompleted = Object.values(allGoals).filter((goal) => goal.completed).length;
console.log(totalCompleted)
const updateProgressTitle = () => {
        if(totalCompleted===0){
            progressTitle.textContent = allQouats[0];
        }else if(totalCompleted===1){
            progressTitle.textContent = allQouats[1];
        }else if(totalCompleted===2){
            progressTitle.textContent = allQouats[2];
        }else if(totalCompleted===3){
            progressTitle.textContent = allQouats[3];
        }
}

const updateBottomQouat = () => {
    if(totalCompleted===0){
        bottomQouat.textContent = bottomQouats[0];
    }else if(totalCompleted===3){
        bottomQouat.textContent = bottomQouats[1];
    }
}
updateBottomQouat(totalCompleted);

updateProgressTitle(totalCompleted);
progressLabel.textContent = `${totalCompleted}/3 Completed`;

inputFields.forEach((input) => {
    const goal = allGoals[input.id] || {};
    
    input.value = goal.task || "";
    if (goal.completed) {
        input.parentElement.classList.add("completed");
        input.disabled = true;
        progValue += 33.33;

    } else {
        input.parentElement.classList.remove("completed");
        input.disabled = false;
    }

    input.addEventListener("focus", () => {
        errorLabel.style.visibility = "hidden";
    });

    input.addEventListener("input", (e) => {
        allGoals[input.id] = {
            task: e.target.value,
            completed: goal.completed || false,
            progressValue: progValue
        };
        localStorage.setItem("allGoals", JSON.stringify(allGoals));
    });
});

progressValue.style.width = `${progValue}%`;



allCheckBoxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        const inputArray = [...inputFields];
        const inputId = box.nextElementSibling.id;
        const allGoalsAdded = inputArray.every((element) => element.value !== "");

        if (allGoalsAdded) {
            if (box.parentNode.classList.contains("completed")) {
                box.parentNode.classList.remove("completed");
                inputFields[index].disabled = false;
                progValue -= 33.33;
                allGoals[inputId].completed = false;

            } else {
                box.parentNode.classList.add("completed");
                inputFields[index].disabled = true;
                inputFields[index].style.backgroundColor = "#fff";
                progValue += 33.33;
                allGoals[inputId].completed = true;
            }

            totalCompleted = Object.values(allGoals).filter((goal) => goal.completed).length;
            
            updateBottomQouat(totalCompleted);
            updateProgressTitle(totalCompleted);
            progressLabel.innerHTML = `${totalCompleted}/3 Completed`;

            allGoals[inputId].progressValue = progValue;
            localStorage.setItem("allGoals", JSON.stringify(allGoals));
            errorLabel.style.visibility = "hidden";
        } else {
            errorLabel.style.visibility = "visible";
        }

        progressValue.style.width = `${progValue}%`;
    });
});
