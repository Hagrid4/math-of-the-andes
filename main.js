const confirmA = document.getElementById("confirm_animals");
confirmA.hidden = true;
const confirmP = document.getElementById("confirm_population");
confirmP.hidden = true;
const calculate = document.getElementById("calculate");
calculate.hidden = true;
const explain = document.getElementById("explain");
explain.hidden = true;
const example = document.getElementById("example");
example.hidden = true;
const reset = document.getElementById("reset");
const speciesNumber = document.getElementById("species_num");
const speciesInput = document.getElementById("species_input");
function createSpecies() {
    speciesInput.innerHTML = "";
    const numberOfSpecies = Number(speciesNumber.value);
    for (let i = 0; i < numberOfSpecies; i++) {
        const speciesDiv = document.createElement("div");
        speciesInput.appendChild(speciesDiv);
        speciesDiv.className = "species_div";
        speciesDiv.textContent = "Species " + (i + 1) + ":";
        const animalSelect = document.createElement("select");
        animalSelect.className = "animal_select";
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.disabled = false;
        placeholder.selected = true;
        placeholder.textContent = "Select Animal";
        animalSelect.appendChild(placeholder);
        const animals = ["Andean Condor", "Chinchilla", "Andean Mountain Cat"];
        for (let x = 0; x < animals.length; x++) {
            const option = document.createElement("option");
            option.textContent = animals[x];
            animalSelect.appendChild(option);
        }
        speciesDiv.appendChild(animalSelect);
    }
};
speciesNumber.addEventListener("change", createSpecies);
createSpecies();
speciesInput.addEventListener("change", function() {
    confirmA.hidden = false;
    const animalSelects = document.querySelectorAll(".animal_select");
    animalSelects.forEach(function(select) {
        for (let sj = 0; sj < select.options.length; sj++) {
            const option = select.options[sj];
            option.disabled = false;
        }
        animalSelects.forEach(function(otherSelect) {
            if (select !== otherSelect) {
                for (let y = 0; y < select.options.length; y++) {
                    const option = select.options[y];
                    if (option.value === otherSelect.value) {
                        option.disabled = true;
                    }
                }
            }
        });
    });
});
confirmA.addEventListener("click", function() {
    let allSelected = true;
    const numberOfSpecies = Number(speciesNumber.value);
    const error1 = document.getElementById("error1");
    if (numberOfSpecies < 2) {
        error1.textContent = "Please select minimum 2 species!";
    }
    else {
        const animalSelects = document.querySelectorAll(".animal_select");
        animalSelects.forEach(function(select) {
            if (select.value === "") {
                allSelected = false;
            }
        });
        if (allSelected === false) {
                error1.textContent = "Please select an animal for every species!";
            }
        else {
            confirmA.hidden = true;
            speciesNumber.disabled = true;
            error1.textContent = "";
            const animalSelects = document.querySelectorAll(".animal_select");
            animalSelects.forEach(function(select) {
                const animal = select.value;
                select.disabled = true;
                const population = document.getElementById("population_input");
                const populationDiv = document.createElement("div");
                populationDiv.className = "population_div";
                population.appendChild(populationDiv);
                populationDiv.textContent = "Enter Population of " + animal + ":";
                const populationInput = document.createElement("input");
                populationInput.className = "populationInput";
                populationInput.type = "text";
                populationInput.inputMode = "numeric";
                populationInput.pattern = "\\d*";
                populationInput.placeholder = "Enter Population";
                populationDiv.appendChild(populationInput);
                confirmP.hidden = false;
                populationInput.addEventListener("input", function() {
                    populationInput.value = populationInput.value.replace(/\D/g, "");
                });
            });
        }
    }
});
confirmP.addEventListener("click", function() {
    let allValid = true;
    const populationInputs = document.querySelectorAll(".populationInput");
    const error2 = document.getElementById("error2");
    populationInputs.forEach(function(input) {
        if (input.value < 2) {
            allValid = false;
        }
    });
    if (allValid === false) {
            error2.textContent = "Minimum population for each animal is 2!";
        }
        else {
            error2.textContent = "";
            confirmP.hidden = true;
            populationInputs.forEach(function(input) {
                input.disabled = true;
            });
            calculate.hidden = false;
        }
});
calculate.addEventListener("click", function() {
    const populations = [];
    const populationInputs = document.querySelectorAll(".populationInput");
    populationInputs.forEach(function(input) {
        populations.push(Number(input.value));
        
    });
    let totalPopulation = 0;
    let numerator = 0;
    for (let z = 0; z < populations.length; z++) {
        totalPopulation = totalPopulation + populations[z];
        numerator = numerator + ((populations[z])*(populations[z] - 1));
    }
    let sdi = 1 - ((numerator)/((totalPopulation)*(totalPopulation - 1)));
    calculate.hidden = true;
    const result = document.getElementById("result");
    result.textContent = "Simpson's Diversity Index = " + sdi.toFixed(3) + " to 3 d.p.";
    explain.hidden = false;
});
explain.addEventListener("click", function() {
    const explanation = document.getElementById("explanation");
    const explain_para1 = document.createElement("p");
    explanation.appendChild(explain_para1);
    explain_para1.textContent = "Simpson's Diversity Index is calculated using the following formula:";
    const formula = document.createElement("img");
    formula.src = "SimpsonIndex2.gif";
    explanation.appendChild(formula);
    const explain_para2 = document.createElement("p");
    explain_para2.textContent = "n = population of one particular species";
    explanation.appendChild(explain_para2);
    const explain_para3 = document.createElement("p");
    explain_para3.textContent = "N = total population of all species";
    explanation.appendChild(explain_para3);
    example.hidden = false;
    explain.hidden = true;
});
reset.addEventListener("click", function() {
    const explanation = document.getElementById("explanation");
    speciesInput.innerHTML = "";
    explanation.innerHTML = "";
    const result = document.getElementById("result");
    result.textContent = "";
    const population = document.getElementById("population_input");
    population.innerHTML = "";
    example.hidden = true;
    const error1 = document.getElementById("error1");
    error1.textContent = "";
    const error2 = document.getElementById("error2");
    error2.textContent = "";
    speciesNumber.disabled = false;
    speciesNumber.value = "1";
    createSpecies();
    confirmA.hidden = true;
    confirmP.hidden = true;
    calculate.hidden = true;
    explain.hidden = true;
});