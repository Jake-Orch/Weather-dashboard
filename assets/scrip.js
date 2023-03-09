$(function () {
var btn = document.getElementById('btn');
var listGroup = $('.group-list');
var currentForecastSection = document.body.children[1].children[0].children[1];
var fiveDayForecastSection = document.body.children[1].children[1];
var apiKey = 'bec4025b9704b04bb71486ebf08243fd';


    function currentWeather() {
        var input = $('#location').innerHTML;
        var currentForecast = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&appid=' + apiKey + '&units=metric';
        console.log('current ok');
        console.log(input);
        fetch(currentForecast)
        .then(function (r) {
            return r.json();
        })
       // .then(console.log(data))
    };

    function fiveDay() {
        var input = $('#location').innerHTML;
        var fiveDayForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&appid=' + apiKey + '&units=metric';
        console.log('five day ok');
        fetch(fiveDayForecast)
        .then(function(r) {
            return r.json();
        })
       // .then(console.log(data))
    }

    btn.addEventListener('click', currentWeather(), fiveDay());
});