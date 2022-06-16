import React, {Component} from 'react';
import './App.css';
import axios from 'axios';




class App extends Component {
  constructor(props){
    super(props)
    this.state={
      playerName: null,
      playerStats: {},
      playerFirst: [],
      playerLast: [],
      teamCity: [],
      teamName: [],
      position: [],
      heightF: [],
      heightI: [],
      weight: [],
      conference: [],
      division: []
    }
  }

 

  handleSubmit = (e) => {
    e.preventDefault();
    this.getPlayerId();
    console.log(this.state.playerName);
  }

  handleChange = (event) => {
    const replace = event.target.value.split(" ").join("_");
    if(replace.length > 0) {
      this.setState({playerName: replace})
    } else {
      alert("Please type players name!")
    }
  }

  getPlayerId = () => {
    const url = `https://www.balldontlie.io/api/v1/players?search=${this.state.playerName}`;
   axios.get(url)
   .then(async res => {
     console.log(res.data.data)
     this.setState({playerFirst: res.data.data[0].first_name})
     this.setState({playerLast: res.data.data[0].last_name})
     this.setState({teamCity: res.data.data[0].team.city})
     this.setState({teamName: res.data.data[0].team.name})
     this.setState({position: res.data.data[0].position})
     this.setState({heightF: res.data.data[0].height_feet})
     this.setState({heightI: res.data.data[0].height_inches})
     this.setState({weight: res.data.data[0].weight_pounds})
     this.setState({conference: res.data.data[0].team.conference})
     this.setState({division: res.data.data[0].team.division})
     if(res.data.data[0] === undefined){
       alert("This player is either injured or has not played this season!")
     } else if(res.data.data.length > 1) {
        alert("Please specify the name!")
     } else {
       await this.getPlayerStats(res.data.data[0].id)
     }
     
   }).catch(err => {
     console.log(err)
   })
   
  }

  getPlayerStats = (playerId) => {
    const statsurl = `https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=${playerId}`
    axios.get(statsurl)
    .then(async res => {
      console.log(res.data.data)
      this.setState({ playerStats: res.data.data[0]})
    }).catch(err => {
      console.log(err)
    })
  }

backgroundChanger = () => {
  const color = "";
  const team = this.state.teamName;

  switch(team) {
    case "lakers":
      color = "purple";
      break;
      case "hawks":
        color = "red";
        break;
        case "celtics":
      color = "green";
      break;
      case "nets":
      color = "black";
      break;
      case "hornets":
      color = "teal";
      break;
      case "bulls":
      color = "red";
      break;
      case "cavaliers":
      color = "red";
      break;
      case "mavericks":
      color = "blue";
      break;
      case "nuggets":
      color = "gold";
      break;
      case "pistons":
      color = "blue";
      break;
      case "warriors":
      color = "gold";
      break;
      case "rockets":
      color = "red";
      break;
      case "pacers":
      color = "yellow";
      break;
      case "clippers":
      color = "blue";
      break;
      case "grizzlies":
      color = "blue";
      break;
      case "heat":
      color = "red";
      break;
      case "bucks":
      color = "green";
      break;
      case "timberwolves":
      color = "blue";
      break;
      case "pelicans":
      color = "red";
      break;
      case "knicks":
      color = "orange";
      break;
      case "thunder":
      color = "blue";
      break;
      case "magic":
      color = "blue";
      break;
      case "76ers":
      color = "blue";
      break;
      case "suns":
      color = "orange";
      break;
      case "trail blazers":
      color = "black";
      break;
      case "kings":
      color = "purple";
      break;
      case "spurs":
      color = "black";
      break;
      case "raptors":
      color = "red";
      break;
      case "jazz":
      color = "purple";
      break;
      case "wizards":
      color = "red";
      break;
  }

   const body = document.querySelector('#display');
   body.style.backgroundColor = color;

}



 

  render(){
  
  return (
    <div className="App">
      
        <header id="header">
          <img src={require('./logo.png') } />
          <form action="" 
          id="searchbar"
          onSubmit={this.handleSubmit}
          >
          <input 
          type="search" 
          id="search" 
          placeholder="Search Player" 
          value={this.state.value} 
          onChange={this.handleChange}
          onSubmit={this.backgroundChanger}
          ></input>
          <button type="submit" id="search-bt" ><img src={require('./search.png')} id="search-img" /></button>
          </form>
          
        </header>
      <div id="bd">
        <div id="display">
          <div id="head" >
            <div id="head-name">
              <h1>{this.state.playerFirst} {this.state.playerLast}</h1>
            </div>
            
            <div id="head-stats">
              <p>{this.state.position} | {this.state.teamCity} {this.state.teamName}</p>
             
            </div>
          
          </div>


          <div id="stats">
            <div id="stats-in" className='group'>
              <p> PTS <br/> {this.state.playerStats["pts"]}</p>
              <p> REB <br/> {this.state.playerStats["reb"]}</p>
              <p> AST <br/> {this.state.playerStats["ast"]}</p>
              <p> FG% <br/> {this.state.playerStats["fg_pct"]}</p>
            </div>
          


          <div id="group">
              <div id="title">
                <p>Season <br/> {this.state.playerStats["season"]}</p>
              </div>
              <div id='title'>
                <p> Games Played <br/> {this.state.playerStats["games_played"]}</p>
              </div>
              <div id='title'>
                  <p>Height <br/> {this.state.heightF}' {this.state.heightI}</p>
              </div>
              <div id='title' className='bordl'>
                  <p>Weight <br/> {this.state.weight} lbs</p>
              </div>
              <div id='title'>
                  <p>Conference <br/> {this.state.conference}</p>
              </div>
              <div id='title' className='bordr'>
                  <p>Division <br/> {this.state.division}</p>
              </div>
            </div>
          </div>
         
        </div>
        </div>
    </div>
  );
}
}




export default App;
