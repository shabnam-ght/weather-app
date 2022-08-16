const input = document.querySelector(".city");
const button = document.querySelector("button");
const weatherResult = document.querySelector(".weather-container");
button.addEventListener("click", function () {
    const inputVal = input.value;
    const apiKey = '03706c7848332020321083d064b8a14f';
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+inputVal+'&units=metric&apikey='+apiKey;
    if (!input.value) {
        console.log("You should write a city name");
    }else{
            fetch(url)
            .then(response => {
                if(!response.ok || (response.status >= 400 && response.status < 600)){
                    throw response;
                }
                return response.json();
            })
            .then(data => {
                if(data.cod===200){
                    let str='';
                    str+='<h2>'+data.name+'</h2>';
                    const icon = "http://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                    str+='<img class="img" src="'+icon+'">';
                    str+='<p class="temp">'+Math.floor(data.main.temp) + "°"+'</p>';
                    str+='<p class="weather">'+data.weather[0].main+'</p>';
                    str+='<p class="wind">Wind speed: '+data.wind.speed+'</p>';
                    str+='<p class="cloudy">Cloudy: '+data.weather[0].description+'</p>';
                    const sunrise1 = new Date(data.sys.sunrise * 1000);
                    const timeChange = sunrise1.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                    str+='<p id="sunrise">Sunrise: '+timeChange+'</p>';
                    const sunset1 = new Date(data.sys.sunset * 1000);
                    const timeChange2 = sunset1.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                    });
                    str+='<p class="sunset">Sunset: '+timeChange2+'</p>';
                    weatherResult.innerHTML=str;
                }else{
                    console.log('You should write a real city name!');
                }
            })
            .catch(err => {
            })
    }
});
