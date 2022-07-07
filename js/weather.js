class Weather {
    constructor(city, country) {
        this.apiKey = '8c1a5de769d96a58761ba1590334a80d';
        this.city = city;
        this.country = country;
        this.units = 'metric'
    }
    // fetch weather from API
    async getWeather() {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&${this.country}&appid=${this.apiKey}&units=${this.units}`);
        const responseData = await response.json();
        return responseData;


    }
    // change weather location
    changeLocation(city, country) {
        this.city = city;
        this.country = country;
    }

    setUnits(units) {
        this.units = units;
    }
}