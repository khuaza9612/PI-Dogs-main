import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateBreed from './components/Create';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
        <Route path='/create' component={CreateBreed}/>
        <Route exact path="/dogs/:id" component={Detail} />
        </Switch>
      <h1>Henry Dogs</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;


