const allCheckBoxes = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll("input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");

let progValue = 0;

// const allGoals = {};

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

inputFields.forEach((input) => {
    input.value = allGoals[input.id]?.task || "";
    input.addEventListener("focus", () => {
        errorLabel.style.visibility = "hidden";
    })
    input.addEventListener("input", (e)=>{
        allGoals[input.id] = {
            task : e.target.value,
            completed : false
        };
        localStorage.setItem("allGoals", JSON.stringify(allGoals))
        // console.log(allGoals)
    })

})



allCheckBoxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        const inputArray = [...inputFields]
        const allGoalsAdded = inputArray.every((element) => {
            return element.value !== "";
        })
        // if( box.nextElementSibling.value !== ""){
        if (allGoalsAdded) {
            if (box.parentNode.classList.contains("completed")) {
                box.parentNode.classList.remove("completed");
                inputFields[index].disabled = false;
                progValue -= 33.33;
            } else {
                box.parentNode.classList.add("completed");
                inputFields[index].disabled = true;
                (inputFields[index].disabled) ? inputFields[index].classList.add("input:disabled") : "";
                progValue += 33.33;
            }
            errorLabel.style.visibility = "hidden";
            // progressValue.style.width += "33.33%";
        } else {
            errorLabel.style.visibility = "visible";
        }
        // }
        progressValue.style.width = `${progValue}%`;
    })
})




