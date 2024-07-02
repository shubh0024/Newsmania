import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/news';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




export  class App extends Component {
pageSize=15;
apikey=process.env.ApiKey

state={
  progress:0
}
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          
        <Navbar/>
        <LoadingBar
        color='#4546d6'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(100)}
      />
          {/* <News setProgress={this.setProgress} pageSize={this.pageSize} country="in" category="sports"/> */}
      <Switch>
          <Route exact path="/"><News setProgress={this.setProgress}   apikey={this.apikey} key="general" pageSize={this.pageSize} country="in" category="general"/></Route>
          <Route exact path="/business"><News setProgress={this.setProgress}  apikey={this.apikey}  key="business" pageSize={this.pageSize} country="in" category="business"/></Route>
          <Route exact path="/entertainment"><News setProgress={this.setProgress}   apikey={this.apikey}  key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/></Route>
          <Route exact path="/sports"><News setProgress={this.setProgress}  apikey={this.apikey}  key="sports" pageSize={this.pageSize} country="in" category="sports"/></Route>
          <Route exact path="/health"><News setProgress={this.setProgress}   apikey={this.apikey} key="health" pageSize={this.pageSize} country="in" category="health"/></Route>
          <Route exact path="/science"><News setProgress={this.setProgress}  apikey={this.apikey}  key="science" pageSize={this.pageSize} country="in" category="science"/></Route>
          <Route exact path="/technology"><News setProgress={this.setProgress}   apikey={this.apikey}  key="technology" pageSize={this.pageSize} country="in" category="technology"/></Route>
         


        </Switch>
        
      </Router>
      </div>
      
    )
  }
}


export default  App  

