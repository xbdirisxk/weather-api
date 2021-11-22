let city = document.querySelector('input');
let errorMsg = document.querySelector('.error-msg');

// DOM
const displayCity = document.querySelector('.weather-info > .city-name');
const displayIcon = document.querySelector('.weather-info > .temp > img');
const displayTemp = document.querySelector('.weather-info > .temp > span');

// const displayMap = document.querySelector('#map');

const displayFeelsLike = document.querySelector('.weather-info > .feels-like');
const displayCloud = document.querySelector('.weather-info > .cloud');
const displayHumidity = document.querySelector('.weather-info > .humidity');
const displayVisibility = document.querySelector('.weather-info > .visibility');

city.addEventListener('keyup', (event) => {
	if (event.key === 'Enter') getWeather(city.value);
});
function getWeather(city) {
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cd6097fa38be54677f2d2cfeee13a869`;
	fetch(apiUrl, { mode: 'cors' })
		.then((response) => {
			return response.json();
		})
		.then((response) => {
			errorMsg.textContent = '';
			console.log(response);

			let currentTime;
			let city = response['name'];
			let country = response['sys']['country'];
			let kelvin = response['main']['temp']; // temperature in kelvin
			let feelsLike = response['main']['feels_like'];
			let description = response['weather'][0]['description'];
			let icon = response['weather'][0]['icon'];
			let humidity = response['main']['humidity'];
			let cloud = response['clouds']['all'];
			let visibility = response['visibility'];

			// convert temperature to celcius(and fehrenheit)
			let celcius = kelvin - 273.15;
			let fahrenheit = ((kelvin - 273.15) * 9) / 5 + 32;
			fahrenheit = Math.trunc(fahrenheit) + '॰F';

			// visibility Meter to KM
			visibility = visibility / 1000;

			displayCity.textContent = city + ', ' + country;

			displayTemp.textContent = Math.trunc(celcius) + '॰C';

			displayIcon.setAttribute(
				'src',
				`http://openweathermap.org/img/wn/${icon}@2x.png`
			);
			displayFeelsLike.textContent =
				'Feels Like ' + feelsLike + ', ' + description; // convert to celcius
			displayCloud.textContent = 'Cloudiness: ' + cloud + '%';
			displayHumidity.textContent = 'Humidity: ' + humidity + '%';
			displayVisibility.textContent = 'Visibility: ' + visibility + 'KM';
		})
		.catch((error) => {
			console.log(error);
			errorMsg.textContent = "sorry, we can't find " + city;
		});
}

// getWeather('hargeisa');
