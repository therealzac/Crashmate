var React = require('react');
var ReactDOM = require('react-dom');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;

var App = require('./components/App.jsx');
var Index = require('./components/index.jsx');
var Splash = require('./components/splash.jsx')

var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Splash}/>
    <Route path="/index" component={Index}/>
  </Route>
)

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById('root'));
});
