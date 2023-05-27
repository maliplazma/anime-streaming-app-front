
import './App.css';
import Login from './Login';
import Homepage from './Homepage';
import Signup from './Signup'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./font/Japanese3017-Eljn.ttf";
import Home from './Home';
import Anime from './Anime';
import Profile from './Profile';
import Explore from './Explore';
import Genre from './Genre'
import Admin from './Admin'
import Watchlist from './Watchlist';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Homepage/>}/>
        <Route path={"/login"} element={<Login/>}/>
        <Route path={"/signup"} element={<Signup/>}/>
        <Route path={"/admin"} element={<Admin/>}/>
        <Route path={"/home"} element={<Home/>}/>
        <Route path={"/anime/:id"} element={<Anime/>}/>
        <Route path={"/genre/:name"} element={<Genre/>}/>
        <Route path={'/profile/:id'} element={<Profile/>}/>
        <Route path={'/explore'} element={<Explore/>}/>
        <Route path={'/watchlist'} element={<Watchlist/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
