class Forecast {
  constructor() {
    this.key = 'n7ihGVrGz8dlpVXspVSNrfP5TjVTkN9A';
    this.weatherURL =
      'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURL =
      'http://dataservice.accuweather.com/locations/v1/cities/search';
  }

  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
  }

  // Get city information
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURL + query);
    const data = await response.json();
    return data[0];
  }

  // get weather information
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURL + query);
    const data = await response.json();
    return data[0];
  }
}
