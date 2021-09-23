import React,{useState} from 'react';

const api = {
    key : "d134835db93f4c72f445fc269fc9e5c9",
    base : "https://api.openweathermap.org/data/2.5/"
}


const WeatherApp=()=> {

    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = (e) => {
        if(e.key=== "Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                });
        }
    }

    const dateBuilder=(d)=>{
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return(
        <div className="app">
            <main>
                <div className="title">
                <img className="logo" src="https://www.freeiconspng.com/uploads/weather-icon-10.png" width="350" alt="Icon Weather Png Free" />
                <h1 className="titleName">WeatherApp</h1>
                <p className="titleCaption">The Weather Forecast</p>
                </div>
                
                <div className="searchbox">
                    <input
                        className="searchbar"
                        type="text"
                        placeholder="search"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}>
                    </input>
                </div>

                {(typeof weather.main != "undefined") ? (
                <div>
                    <div className="locationbox">
                        <div className="location">{weather.name}, {weather.sys.country}</div>
                        <div className="date">{dateBuilder(new Date())}</div>
                    </div>
                    <div className="weatherbox">
                        <div className="temp">
                            {Math.round(weather.main.temp)}°C
                        </div>
                        <div className="container">
                        <div className="row">
                            <div className="col-lg-6 mb-4 d-flex align-items-stretch">
                                <div className="card text-white bg-dark mb-3">
                                    <div className="feelsLike">
                                        Feels Like : {Math.round(weather.main.feels_like)}°C
                                    </div>
                                    <div className="maxtemp">
                                        Max Temp : {Math.round(weather.main.temp_max)}°C
                                    </div>
                                    <div className="mintemp">
                                        Min Temp : {Math.round(weather.main.temp_min)}°C
                                    </div>
                                    <div className="weather">
                                        {weather.weather[0].main}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 d-flex align-items-stretch">
                                <div className="card ">
                                    <div className="humidity">
                                        Humidity : {Math.round(weather.main.humidity)}%
                                    </div>
                                    <div className="pressure">
                                        Pressure : {Math.round(weather.main.pressure)}
                                    </div>
                                    <div className="wind">
                                        Wind Speed : {weather.wind.speed}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>):('')}
                
            </main>
        </div>
    )
}

export default WeatherApp;