$(function () {
    var btn = document.getElementById('btn');
    var list = document.getElementById('list')
    var currentSec = document.getElementById('current');
    var fiveDaySec = document.getElementById('fiveday');
    var apiKey = 'bec4025b9704b04bb71486ebf08243fd';
    var name1 = document.createElement('p');
    var wind = document.createElement('p');
    var temper = document.createElement('p');
    var weathers = document.createElement('p');
    var icon1 = document.createElement('img');
    var locations = [];

    // This gets the current weather forecast using the input and syntax provided by openweathermap API
    function currentWeather(e) {
        e.preventDefault();
        var input = $('.input').val();
        var currentForecast = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey + '&units=metric';
        console.log(currentForecast);
        console.log(input);
        fetch(currentForecast)
            .then(function (r) {
                if (!r.ok) {
                    alert('insert valid location');
                } else
                    console.log(r);
                return r.json()
            })
            .then(function (d) {
                console.log(d);
                // Here I am getting all of the information I want from the retrieved data and appending it where i want on the document
                var weather = d.weather[0].main;
                var temp = d.main.temp; // celcius
                var windSpeed = d.wind.speed;  //meters per second
                var name = d.name;
                var iconCode = d.weather[0].icon;
                weathers.textContent = 'weather: ' + weather;
                temper.textContent = 'temp: ' + temp + '°C';
                wind.textContent = 'wind: ' + windSpeed + 'm/s';
                name1.textContent = name;
                icon1.setAttribute('src', 'http://openweathermap.org/img/w/' + iconCode + '.png');
                currentSec.appendChild(icon1)
                currentSec.appendChild(name1);
                currentSec.appendChild(wind);
                currentSec.appendChild(temper);
                currentSec.appendChild(weathers);
                console.log(weather);
                addToLocation(input);
                setLocation();
            })
    };
    // This is where I shall add the function for the 5 day forecast
    function fiveDay(e) {
        e.preventDefault();
        var input = $('.input').val();
        var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&appid=' + apiKey + '&units=metric';
        console.log(fiveDayForecast);
        fetch(fiveDayForecast)
            .then(function (r) {
                console.log(r);
                return r.json()
            })
            .then(function (d) {
                console.log(d);
                console.log(d)
            })
    };

    function addToLocation(input) {
        if (locations.includes(input)) {
            var indexOf = locations.indexOf(input);
            var splice = locations.splice(indexOf, 1);
            var recent = splice.pop();
            locations.unshift(recent);
        } else if (locations.length == 5) {
            locations.pop();
            locations.unshift(input);
        } else {
            locations.unshift(input);
        }
        displayLocations(locations);
        console.log(locations);
    }

    function displayLocations(locations) {
        console.log(locations)
        list.querySelectorAll('*').forEach(n => n.remove());
        if (locations.length > 0) {
            console.log(locations);
            for (let i = 0; i < locations.length; i++) {
                var li = document.createElement('li');
                li.className = 'list-group-item m-1 p-1 border rounded-pill bg-secondary text-light align-self-center shadow w-75'
                li.innerHTML = locations[i];
                list.appendChild(li);
                console.log(locations[i]);
                li.addEventListener('click', function () {
                    currentWeather(locations[i]);
                    fiveDay(locations[i]);
                })
            }
        } else {
            return;
        }
    }

    function setLocation() {
        // here i am saving the recent search onto the local storage
        localStorage.setItem('Locations', JSON.stringify(locations));
    }

    // Here im adding the eventlisteners to call the previous 2 functions
    btn.addEventListener('click', currentWeather);
    btn.addEventListener('click', fiveDay);
    displayLocations(locations);

})
