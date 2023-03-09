$(function () {
    var btn = document.getElementById('btn');
    var listGroup = $('.group-list');
    var currentSec = document.getElementById('current');
    var fiveDaySec = document.getElementById('fiveday');
    var apiKey = 'bec4025b9704b04bb71486ebf08243fd';
    var addLI = $(listGroup).append('<li>');
    var name1 = document.createElement('p');
    var wind = document.createElement('p');
    var temper = document.createElement('p');
    var weathers = document.createElement('p');
    var icon1 = document.createElement('img')

    function currentWeather(e) {
        e.preventDefault();
        var input = $('.input').val();
        var currentForecast = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey + '&units=metric';
        console.log(currentForecast);
        console.log(input);
        fetch(currentForecast)
            .then(function (r) {
                console.log(r);
                return r.json()
            })
            .then(function (d) {
                console.log(d);
                var weather = d.weather[0].main;
                var temp = d.main.temp; // celcius
                var windSpeed = d.wind.speed;  //meters per second
                var name = d.name;
                var iconCode = d.weather[0].icon;
                weathers.textContent = weather;
                temper.textContent = temp;
                wind.textContent = windSpeed;
                name1.textContent = name;
                icon1.setAttribute('src', 'http://openweathermap.org/img/w/' + iconCode + '.png');
                currentSec.appendChild(icon1)
                currentSec.appendChild(name1);
                currentSec.appendChild(wind);
                currentSec.appendChild(temper);
                currentSec.appendChild(weathers);
                console.log(weather)
            })
        };

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
                function getAndSet() {
                    localStorage.setItem
                }
            
                btn.addEventListener('click', currentWeather)
                btn.addEventListener('click', fiveDay)



            })
