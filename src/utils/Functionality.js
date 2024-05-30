const allCheckBoxes = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll("input");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");

inputFields.forEach((input)=>{
    input.addEventListener("focus", ()=>{
        errorLabel.style.visibility = "hidden";
    })
                    
})

let progValue = 0;


allCheckBoxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        const inputArray = [...inputFields]
        const allGoalsAdded = inputArray.every((element)=>{
                        return element.value !== "";
                    })
        // if( box.nextElementSibling.value !== ""){
            if(allGoalsAdded){
                if(box.parentNode.classList.contains("completed")){
                    box.parentNode.classList.remove("completed");
                }else{
                    box.parentNode.classList.add("completed");
                }
                errorLabel.style.visibility = "hidden";
                progValue += 33.33
            }else{
                errorLabel.style.visibility = "visible";
            }
        // }
    })
})
progressValue.style.width = progValue + "%";

// console.log(allCheckBoxes)



