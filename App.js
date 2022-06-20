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

  backgroundChanger = (str) => {
    let color1 = "black";
    let color2 = "black";
    let img = "";
    const team = str;
  
    switch(team) {
      case "Lakers":
        color1 = "#552583";
        color2 = "#FDB927";
        img = "url('./photos/lakers.png')";
        break;
        case "Hawks":
          color1 = "#E03A3E";
          color2 = "#C1D32F";
          break;
          case "Celtics":
        color1 = "#007A33";
        color2 = "#BA9653";
        break;
        case "Nets":
        color1 = "#000000";
        color2 = "#777D84";
        break;
        case "Hornets":
        color1 = "#1D1160";
        color2 = "#00788C";
        break;
        case "Bulls":
        color1 = "#CE1141";
        color2 = "#000000";
        break;
        case "Cavaliers":
        color1 = "#860038";
        color2 = "#041E42";
        break;
        case "Mavericks":
        color1 = "#00538C";
        color2 = "#002B5E";
        break;
        case "Nuggets":
        color1 = "#0E2240";
        color2 = "#FEC524";
        break;
        case "Pistons":
        color1 = "#C8102E";
        color2 = "#1D42BA";
        break;
        case "Warriors":
        color1 = "#1D428A";
        color2 = "#FFC72C";
        break;
        case "Rockets":
        color1 = "#CE1141";
        color2 = "#000000";
        break;
        case "Pacers":
        color1 = "#002D62";
        color2 = "#FDBB30";
        break;
        case "Clippers":
        color1 = "#C8102E";
        color2 = "#1D428A";
        break;
        case "Grizzlies":
        color1 = "#5D76A9";
        color2 = "#12173F";
        break;
        case "Heat":
        color1 = "#98002E";
        color2 = "#F9A01B";
        break;
        case "Bucks":
        color1 = "#00471B";
        color2 = "#EEE1C6";
        break;
        case "Timberwolves":
        color1 = "#0C2340";
        color2 = "#236192";
        break;
        case "Pelicans":
        color1 = "#0C2340";
        color2 = "#C8102E";
        break;
        case "Knicks":
        color1 = "#006BB6";
        color2 = "#F58426";
        break;
        case "Thunder":
        color1 = "#007AC1";
        color2 = "#EF3B24";
        break;
        case "Magic":
        color1 = "#0077C0";
        color2 = "#C4CED4";
        break;
        case "76ers":
        color1 = "#006BB6";
        color2 = "#ED174C";
        break;
        case "Suns":
        color1 = "#1D1160";
        color2 = "#E56020";
        break;
        case "Trail blazers":
        color1 = "#E03A3E";
        color2 = "#000000";
        break;
        case "Kings":
        color1 = "#5A2D81";
        color2 = "#63727A";
        break;
        case "Spurs":
        color1 = "#C4CED4";
        color2 = "#000000";
        break;
        case "Raptors":
        color1 = "#CE1141";
        color2 = "#000000";
        break;
        case "Jazz":
        color1 = "#002B5C";
        color2 = "#00471B";
        break;
        case "Wizards":
        color1 = "#002B5C";
        color2 = "#E31837";
        break;
    }

   if(document.getElementById('head') && document.getElementById('stats') && document.getElementById('head-img-team')){
  
     const bodyOne = document.getElementById('head');
     bodyOne.style.backgroundColor = color1;
     const bodyTwo = document.getElementById('stats');
     bodyTwo.style.backgroundColor = color2;
     const bodyThree = document.getElementById('head-img-team');
    bodyThree.style.backgroundImage = img;
    
    
   }
  
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
          onSubmit={this.backgroundChanger(`${this.state.teamName}`)}
          
          ></input>
          <button type="submit" id="search-bt" ><img src={require('./search.png')} id="search-img" /></button>
          </form>
          
        </header>
      <div id="bd">
        <div id="display">
          <div id="head" >
            <div id='head-one'>
               <div id="head-name">
              <h1>{this.state.playerFirst} {this.state.playerLast}</h1>
            </div>
            <div id="head-stats">
              <p>{this.state.position} | {this.state.teamCity} {this.state.teamName}</p>
             
            </div>
            </div>
           <div id='head-two'>
              <div id="head-img-team">
                
            </div>
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
