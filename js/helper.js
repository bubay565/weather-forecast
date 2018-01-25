const api_key = '786b6a059112fdf5f03a9982d2b6e694';
const loc = 'London,gb';
const api = 'http://api.openweathermap.org/data/2.5/forecast';
const iconSrc = 'http://openweathermap.org/img/w/';
const forecastSection = document.getElementById("forecast");

const weatherInfo = async () => {
	try {
		const response = await fetch(`${api}?q=${loc}&appid=${api_key}`);
		const json = await response.json();
		return json;
	} catch(err) {
		return 'Error occurred while fetching weather information. Please try again later';
	}
}

const kelvinToCelsius = (kelvin) => (
	Math.round(kelvin - 273.15)
)

const getDayToday = () => (
	new Date().getDay()
)

const getWeekday = (day) => {
	day = day > 6 ? day - 7 : day;

	switch(day) {
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednessday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
		default:
			return 'Sunday';
	}
}

const renderWeatherInfo = (weatherInfo) => {
	weatherInfo.map(forecast => {
		const div = document.createElement("div");
		div.setAttribute('class', 'summary');
		div.setAttribute('id', 'summary');

		const day = document.createElement("p");
		const dayNode = document.createTextNode(forecast.dt_txt);
		day.appendChild(dayNode);

		const temp = document.createElement("p");
		const tempNode = document.createTextNode(`${kelvinToCelsius(forecast.main.temp)}\u2103`);
		temp.appendChild(tempNode);

		const desc = document.createElement("p");
		const descNode = document.createTextNode(forecast.weather[0].description);
		desc.appendChild(descNode);

		const icon = document.createElement("img");
		icon.src = `${iconSrc}${forecast.weather[0].icon}.png`;
		icon.setAttribute('alt', 'weather icon');

		div.appendChild(day);
		div.appendChild(temp);
		div.appendChild(desc);
		div.appendChild(icon);
		forecastSection.appendChild(div);
		return;
	});
}

const renderButtons = (text, data) => {
	const weekday = document.getElementById("weekday");
	const button = document.createElement("button");
	button.innerHTML = text;
	button.setAttribute('class', 'dayButton');
	button.onclick = () => {
		emptyDom();
		renderWeatherInfo(data);
	}
	weekday.appendChild(button);
}

const emptyDom = () => {
	const div = document.getElementById("forecast");
	while(div.firstChild) {
		div.removeChild(div.firstChild);
	}
	return;
}

window.onload = async function() {
	const weatherData = await weatherInfo();

	const dayOneData = weatherData.list.slice(0,5);
	const dayTwoData = weatherData.list.slice(0,5);
	const dayThreeData = weatherData.list.slice(0,5);
	const dayFourData = weatherData.list.slice(0,5);
	const dayFiveData = weatherData.list.slice(0,5);

	renderButtons('Today', dayOneData);
	renderButtons('Tomorrow', dayTwoData);
	renderButtons(getWeekday(getDayToday() + 2), dayThreeData);
	renderButtons(getWeekday(getDayToday() + 3), dayFourData);
	renderButtons(getWeekday(getDayToday() + 4), dayFiveData);

  renderWeatherInfo(dayOneData);
}
