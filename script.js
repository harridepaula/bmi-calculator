const form = document.getElementById("bmi-form");
const unitSelect = document.getElementById("unit");
const metricInputs = document.getElementById("metric-inputs");
const usInputs = document.getElementById("us-inputs");
const result = document.getElementById("result");

unitSelect.addEventListener("change", () => {
    if (unitSelect.value === "metric") {
        usInputs.classList.add("hidden");
        metricInputs.classList.remove("hidden");
    } else if (unitSelect.value === "us") {
        metricInputs.classList.add("hidden");
        usInputs.classList.remove("hidden");
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const unit = unitSelect.value;
    let bmi;
    
    if (unit === "metric") {
        const heightCm = parseFloat(document.getElementById("height-cm").value);
        const weightKg = parseFloat(document.getElementById("weight-kg").value);
        bmi = weightKg / Math.pow(heightCm / 100, 2);
    } else if (unit === "us") {
        const heightFt = parseFloat(document.getElementById("height-ft").value);
        const heightIn = parseFloat(document.getElementById("height-in").value);
        const weightLb = parseFloat(document.getElementById("weight-lb").value);
        const heightInTotal = heightFt * 12 + heightIn;
        bmi = 703 * weightLb / Math.pow(heightInTotal, 2);
    }

    if (isNaN(bmi)) {
        result.classList.add("hidden");
        alert("Please fill in all the fields correctly.");
    } else {
        result.textContent = `Your BMI is ${bmi.toFixed(1)}`;
        const classification = getClassification(bmi);
        result.innerHTML += `<div class="result-text ${classification.toLowerCase()}">${classification}</div>`;
        result.classList.remove("hidden");
    }
});

function getClassification(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal";
    } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
}