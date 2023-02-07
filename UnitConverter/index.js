/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const input = document.getElementById("input-field")
const convert = document.getElementById("convert-btn")
let MtrFt = document.getElementById("mf-output")
let LtrGal = document.getElementById("lg-output")
let KlPnd = document.getElementById("kp-output")


convert.addEventListener("click", function(){

    value = input.value
    // function to convert metric values to the imperial system
    function metricToImperial(val, unit) {
        switch (unit) {
            case "meters":
                return val * 3.2808;
            case "liters":
                return val * 0.264172;
            case "kilograms":
                return val * 2.20462;
            default:
                return null;
        }
    }
    // function to convert imperial values to the metric system
    function ImperialToMetric(val, unit) {
        switch (unit) {
            case "feet":
                return val / 3.2808;
            case "gallons":
                return val / 0.264172;
            case "pounds":
                return val / 2.20462;
            default:
                return null;
        }
    }
    
    // converting metric values to the imperial system
    let feetValue = metricToImperial(value, "meters")
    let gallonValue =metricToImperial(value, "liters")
    let poundValue =metricToImperial(value, "kilograms")
    // converting inmperial values to the metric system
    let meterValue = ImperialToMetric(value, "feet")
    let literValue = ImperialToMetric(value, "gallons")
    let kiloValue = ImperialToMetric(value, "pounds")
    
    //Length
    MtrFt.innerHTML = `${value} meters = ${ Number(feetValue).toFixed(3) } feet | ${value} feet = ${ Number(meterValue).toFixed(3) } meters `
    //Volume
    LtrGal.innerHTML =`${value} liters = ${ Number(gallonValue).toFixed(3) } gallons | ${value} gallons = ${ Number(literValue).toFixed(3) } liters `
    //Mass
    KlPnd.innerHTML = `${value} kilos = ${ Number(poundValue).toFixed(3) } pounds | ${value} pounds = ${ Number(kiloValue).toFixed(3) } kilos `
     
})

