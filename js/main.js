// Weather API endpoint
var api_root = 'http://api.openweathermap.org/data/2.5/weather?zip='

// API key
var api_key = 'cbf1cd0fdfbf75dc22567e3b4765906f'

// Select elements from the DOM
var city_name = document.querySelector('#city_name')
var zip = document.querySelector('.searchBox')
var weather = document.querySelector('.weather')
var temp = document.querySelector('.temp')
var humid = document.querySelector('.humid')
var convert = document.querySelector('.convert')
var icon = document.querySelector('#iconBox')
var temper
var state = true
var desc = document.querySelector('.description');

function kelvinToFahrenheit(kelvin){
        return Math.round(kelvin * (9/5) - 459.67)
}
function fahrenheitToCelsius(fahrenheit){
        return Math.round((fahrenheit - 32) * 5/9)
}

function addIcon(w){
    // if (w == "Cloudy") {
    //     icon.setAttribute('src', 'img\cloudy.png')
    // }
    if (w == "Clouds") {
        icon.src = 'img/cloudy.png'
    }
    if (w == "Partly-cloudy" || w == "Smoke") {
        icon.src = 'img/partlyCloudy.png'
    }
    if (w == "Rain" || w == "Drizzle") {
        icon.src ="img/rain.png"
    }
    if (w == "Snow") {
        icon.src ="img/snow.png"
    }
    if (w == "Clear" || w == "Sun") {
        icon.src ="img/sun.png"
    }
    if (w == "Thunderstorm") {
        icon.src ="img/thunderstorm.png"
    }
}

function getWeather(zipCode){
    $.ajax({
        type: 'GET',
        url: `${api_root}${zipCode},us&appid=${api_key}`,
        dataType: 'json',
        success: function(data){
            desc.innerHTML = data.weather["0"].description;
            addIcon(data.weather["0"].main)
            // console.log(data)
            temper = kelvinToFahrenheit(data.main.temp)
            // console.log(data.weather["0"].main)
            weather.textContent = data.weather["0"].main
            city_name.textContent = data.name
            temp.innerHTML = `${temper} &deg F`
            humid.textContent = `${data.main.humidity}%`

        },
        error: function(error){
            console.log(error)
        }
    })
}

console.log(convert)
getWeather(33196)

zip.addEventListener('keypress', function(e){
    if(e.keyCode == 13){
        getWeather(this.value)
    }
})

convert.addEventListener('click', function(e){
//    console.log(fahrenheitToCelsius(temper))
    if(state == true) {
    temp.innerHTML = `${fahrenheitToCelsius(temper)} &deg C`
    state = false
    } else {
        temp.innerHTML = `${temper} &deg F`
        state = true
    }
})