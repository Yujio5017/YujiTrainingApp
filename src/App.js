// App.js
// Import React dependencies
const React = require('react');
const ReactDOM = require('react-dom');

const{ BrowserRouter, Router, Route, Switch } = require('react-router-dom');
const Home = require('./pages/Home');
// Import other components and routes as needed

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          {/* Define other routes as needed */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
