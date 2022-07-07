
const storage = new Storage();
// get stored location data
const weatherLocation = storage.getLocationData();

const weather = new Weather(weatherLocation.city, weatherLocation.country);


document.addEventListener('DOMContentLoaded', e => {
    const ui = new UI();

    getWeather(ui);
    // show popup
    const changeLocation = document.getElementById('btn-change');
    changeLocation.addEventListener('click', e => {
        document.querySelector('.bg-modal').style.display = 'flex';
    });
    //   addListener on close popup
    const closeBtn = document.querySelector('.close-popup');
    closeBtn.addEventListener('click', closePopup);

    // listener on button save changes
    const saveChanges = document.getElementById('save-changes');
    const cityInput = document.getElementById('new-city');
    const countryInput = document.getElementById('new-country');
    // regExp matches the user input
    cityInput.addEventListener('blur', e => {
        clearErrorMsg(cityInput.parentElement);
        const re = /^(([a-zA-Z])+(\s+[a-zA-Z])?){2,12}$/;
        if (!re.test(cityInput.value)) {
            cityInput.style.border = '2px solid red';
            setMessage('City', cityInput);
        }

    });
    countryInput.addEventListener('blur', e => {
        clearErrorMsg(countryInput.parentElement);
        const re = /^(([a-zA-Z])+(\s+[a-zA-Z])?){2,12}$/;
        if (!re.test(countryInput.value)) {
            countryInput.style.border = '2px solid red';
            setMessage('Country', countryInput);
        }

    });


    saveChanges.addEventListener('click', e => {

        const newCity = cityInput.value.trim();
        const newCountry = countryInput.value.trim();

        weather.changeLocation(newCity, newCountry);
        storage.setLocationData(newCity, newCountry)
        getWeather(ui);
        closePopup();

    });

    // change units (metric or imperial)

    const unitSpan = document.getElementById('unitSymbol');
    document.getElementById('unit1').addEventListener('click', e => {
        weather.setUnits('imperial');
        getWeather(ui);
        unitSpan.innerText = 'F';
    });
    document.getElementById('unit2').addEventListener('click', e => {
        weather.setUnits('metric');
        getWeather(ui);
        unitSpan.innerText = 'C';
    });


});

// work with promise
function getWeather(ui) {
    weather.getWeather()
        .then(results =>
            ui.showResults(results))

        .catch((e) => {
            console.log(e);
            alert('Something went wrong');
        })
}

function closePopup() {
    document.querySelector('.bg-modal').style.display = 'none';
}

// Erroe message
function setMessage(fieldName, inputField) {
    const div = document.createElement('div');
    div.innerText = fieldName + ' must be between 2 and 12 characters';
    div.className = 'error-message';
    inputField.parentElement.insertBefore(div, inputField);


}
// clear error message
function clearErrorMsg(div) {
    const msg = div.querySelectorAll('.error-message');
    for (let i = 0; i < msg.length; i++) {
        msg[i].remove();
    }
}
