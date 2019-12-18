import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';


import Home from './pages/home';

import RankList from './pages/rankList';
import Search from './pages/search';
import SongList from './pages/songList';
import PlayList from './pages/playList';
import PlayBar from './pages/playBar/index';

import store from './store/index';

function App() {
  return (
    <Provider store={store}>
    <Router>
        <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/songList' component={SongList}/>
        <Route path='/rankList' component={RankList}/>  
        <Route path='/playList/:id' component={PlayList}/>
        <Route path='/search' component={Search}/>  
        </Switch>
    </Router>
    <PlayBar/>
    </Provider> 
 
  )
    
}

export default App;
