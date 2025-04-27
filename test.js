const apiKey = "ee61bfae79c191667768f799a119e87e";
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBar = document.querySelector(".search-bar input");
const searchBtn = document.querySelector(".search-bar button");
const climateIcon = document.querySelector(".climate-icon");
const weatherDisplay = document.querySelector(".climate");
const errorDisplay = document.querySelector(".error");

async function checkWeather(city) {
    try {
        const response = await fetch(url + city + `&appid=${apiKey}`);
        
        if (response.status === 404) {
            errorDisplay.style.display = "block";
            weatherDisplay.style.display = "none";
            return;
        }

        const data = await response.json();
        updateWeatherUI(data);
        
    } catch (error) {
        console.error("Error fetching weather:", error);
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main;
    const iconMap = {
        "Clouds": "clouds.png",
        "Clear": "clear.png",
        "Rain": "rain.png",
        "Drizzle": "drizzle.png",
        "Mist": "mist.png",
        "Snow": "snow.png"
    };
    climateIcon.src = `weather-app-img/images/${iconMap[weatherMain] || 'clouds.png'}`;

    weatherDisplay.style.display = "block";
    errorDisplay.style.display = "none";
}

searchBtn.addEventListener("click", () => {
    if (searchBar.value.trim()) {
        checkWeather(searchBar.value);
    }
});

searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchBar.value.trim()) {
        checkWeather(searchBar.value);
    }
});

$(document).ready(function(){
    $(".search-btn").click(function(){
        $(".wrapper").addClass("active");
        $(this).hide();
        $(".search-data").fadeIn(500);
        $(".close-btn").fadeIn(500);
        setTimeout(() => $("#searchInput").focus(), 800);
    });

    $(".close-btn").click(function(){
        $(".wrapper").removeClass("active");
        $(".search-btn").fadeIn(800);
        $(".search-data").fadeOut(500);
        $(".close-btn").fadeOut(500);
        $("#searchInput").val("");
    });

    $("#searchInput").keypress(function(e){
        if (e.which === 13 && $(this).val().trim()) { 
            checkWeather($(this).val());
            $(".close-btn").click();
        }
    });

    $(".search-data span.search-submit").click(function(){
        if ($("#searchInput").val().trim()) {
            checkWeather($("#searchInput").val());
            $(".close-btn").click();
        }
    });
});