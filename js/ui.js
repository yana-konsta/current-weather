class UI {
    constructor() {
        this.location = document.getElementById('location');
        this.description = document.getElementById('description');
        this.temp = document.getElementById('temp');
        this.icon = document.getElementById('icon');
        this.feelsLike = document.getElementById('feelsLike');
        this.wind = document.getElementById('wind');
        this.humidity = document.getElementById('humidity');
        this.pressure = document.getElementById('pressure');
        this.visability = document.getElementById('visability');
    
    }

    showResults(results) {
        const unitSpan = this.temp.getElementsByTagName('span')[0];
        this.location.textContent = results.name;
        this.description.textContent = results.weather[0].description;
        this.temp.textContent = Math.round(results.main.temp);
        this.temp.style.color = 'whitesmoke';
        this.temp.appendChild(unitSpan);
        this.icon.setAttribute('src', "http://openweathermap.org/img/w/" + results.weather[0].icon + ".png");
        this.feelsLike.textContent = `Feels like: ${results.main.feels_like}`;
        this.wind.textContent = `Wind: ${results.wind.speed}`;
        this.humidity.textContent = `Humidity: ${results.main.humidity}`;
        this.pressure.textContent = `Pressure: ${results.main.pressure}`;
        this.visability.textContent = `Visibility: ${results.visibility}`;


    }
}