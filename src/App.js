import React from "react";
import Info from "./componets/info";
import Form from "./componets/form";
import Weather from "./componets/Weather";

const API_KEY="ced1bfca11f36846cb3b33a3e45e862e";
class App extends React.Component {
  state={
    temp: undefined,
    city: undefined,
    country: undefined,
    sunrise: undefined,
    sunset: undefined,
    error: undefined
  }
  gettingWeather= async (e) => {
    e.preventDefault();
    const city= e.target.elements.city.value;
    
    
if(city) {
  const api_url= await 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data=await api_url.json();
    
    var date = new Date(data.sys.sunset*1000);
          var hours = date.getHours(); // Minutes part from the timestamp
          var minutes = "0" + date.getMinutes(); // Seconds part from the timestamp
          var seconds = "0" + date.getSeconds();
        var sunset_date = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

     var date_2=new Date(data.sys.sunrise*1000);
     var hours_1 = date_2.getHours(); // Minutes part from the timestamp
     var minutes_1 = "0" + date_2.getMinutes(); // Seconds part from the timestamp
     var seconds_1 = "0" + date_2.getSeconds();
   var sunset_date2 = hours_1 + ':' + minutes_1.substr(-2) + ':' + seconds_1.substr(-2);
    

    this.setState({
      temp: parseInt(data.main.temp),
      city: data.name,
      country: data.sys.country,
      sunrise: sunset_date2,
      sunset: sunset_date,
      error: ""
    });
     }
   }
  render()  {
      return(<div> 
              <Info/>
              <Form weatherMethod={this.gettingWeather}/>
              <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                sunrise={this.state.sunrise}
                sunset={this.state.sunset}
                error={this.state.error}

              />
      </div>
      );
  }
}
export default App;