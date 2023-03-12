$(function () {
    var btn = document.getElementById('search');
    var list = document.getElementById('list');
    // var btn = document.getElementById('search');
    var currentSec = document.getElementById('current');
    var fiveDaySec = document.getElementById('fiveday');
    var apiKey = 'bec4025b9704b04bb71486ebf08243fd';
    var div = document.createElement('div');
    var name1 = document.createElement('p');
    var wind = document.createElement('p');
    var temper = document.createElement('p');
    var weathers = document.createElement('p');
    var date = document.createElement('p');
    var icon1 = document.createElement('img');
    var inputVal = $('.input');
    var locations = JSON.parse(localStorage.getItem("Locations")) || [];

    // This gets the current weather forecast using the input and syntax provided by openweathermap API
    function currentWeather(input) {
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
                // Here I am getting all of the information I want from the retrieved data and appending it where i want on the document
                var weather = d.weather[0].main;
                var temp = d.main.temp; // celcius
                var windSpeed = d.wind.speed;  //meters per second
                var name = d.name;
                var iconCode = d.weather[0].icon;
                weathers.textContent = 'weather: ' + weather;
                temper.textContent = 'temp: ' + temp + '°C';
                wind.textContent = 'wind: ' + windSpeed + ' m/s';
                name1.textContent = name;
                icon1.setAttribute('src', 'http://openweathermap.org/img/w/' + iconCode + '.png');
                currentSec.appendChild(icon1)
                currentSec.appendChild(name1);
                currentSec.appendChild(wind);
                currentSec.appendChild(temper);
                currentSec.appendChild(weathers);
                console.log(weather);
                addToLocation(input);
                $(inputVal).val('');
            })
    };
    // This is where I shall add the function for the 5 day forecast
    function fiveDay(input) {
        var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&appid=' + apiKey + '&units=metric';
        console.log(fiveDayForecast);
        fetch(fiveDayForecast)
            .then(function (r) {
                console.log(r);
                return r.json()
            })
            .then(function (d) {
                console.log(d);
                while (fiveDaySec.hasChildNodes()) {
                    fiveDaySec.removeChild(fiveDaySec.firstChild);
                }
                for (let i = 6; i < d.list.length; i += 8) {
                    var div = document.createElement('div');
                    var name12 = document.createElement('p');
                    var wind2 = document.createElement('p');
                    var temper2 = document.createElement('p');
                    var weathers2 = document.createElement('p');
                    var icon12 = document.createElement('img');

                    var dates = new Date(d.list[i].dt * 1000);
                    var weather = d.list[i].weather[0].main;
                    var temp = d.list[i].main.temp;
                    var windSpeed = d.list[i].wind.speed;
                    var name = d.city.name;
                    var iconCode = d.list[i].weather[0].icon

                    weathers2.textContent = 'weather: ' + weather;
                    temper2.textContent = 'temp: ' + temp + '°C';
                    wind2.textContent = 'wind: ' + windSpeed + ' m/s';
                    name12.textContent = name;
                    date.textContent = dates.toLocaleDateString()
                    icon12.setAttribute('src', 'https://openweathermap.org/img/wn/' + iconCode + '@2x.png');
                    div.setAttribute('class', 'text-center bg-secondary text-light m-2 rounded-2');
                    div.setAttribute('id', 'div');
                    div.setAttribute('style', 'height: 320px; width: 230px;');
                    fiveDaySec.appendChild(div);
                    div.appendChild(icon12);
                    div.appendChild(date);
                    div.appendChild(name12);
                    div.appendChild(wind2);
                    div.appendChild(temper2);
                    div.appendChild(weathers2);
                }
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
        setLocations(locations);
        return locations;
    }

    function reSearch(e) {
        if (locations.length > 0) {
            var input = $(e).val();
            console.log(value);
            currentWeather(input);
            fiveDay(input);
        } else {
            return;
        }
    }

    function displayLocations(locations) {
        console.log(locations)
        list.querySelectorAll('*').forEach(n => n.remove());
        if (locations.length > 0) {
            console.log(locations);
            for (let i = 0; i < locations.length; i++) {
                var li = document.createElement('li');
                li.setAttribute('id', 'search');
                li.className = 'list-group-item m-1 p-1 border rounded-pill bg-secondary text-light align-self-center shadow w-75'
                li.innerHTML = locations[i];
                list.appendChild(li);
                li.addEventListener('click', function () {
                    currentWeather(locations[i]);
                    fiveDay(locations[i]);
                })
            }
        } else {
            return;
        }
    }

    function setLocations(locations) {
        // here i am saving the recent search onto the local storage
        localStorage.setItem('Locations', JSON.stringify(locations));
        displayLocations(locations);
    }

    function getLocations() {
        var locations2 = JSON.parse(localStorage.getItem('Locations'));
        displayLocations(locations2);
    }

    // Here im adding the eventlisteners to call the previous 2 functions
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        var input = $('.input').val();

        currentWeather(input);
        fiveDay(input);
        reSearch();
    });

    setLocations(locations);
    getLocations();
})
