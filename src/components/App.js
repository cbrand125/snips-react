import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import '../styles/style.css';
import Header from './Header';
import Home from './Home';
import About from './About';
import Account from './Account';
import Snippets from './Snippets';
import FourOFour from './FourOFour';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { message: '' };
  }

  insertAuthor = async author =>
    axios.post('http://localhost:5000/api/signup', author);

  loginAuthor = async author => {
    const { data } = await axios.patch(
      'http://localhost:5000/api/login',
      author
    );
    this.setState({ message: data.message });
  };

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/about" exact render={() => <About />} />
          <Route path="/account" exact render={() => <Account />} />
          <Route path="/snippets" render={() => <Snippets />} />
          <Route
            path="/signup"
            render={() => <SignupForm onSubmit={this.insertAuthor} />}
          />
          <Route
            path="/login"
            render={() => (
              <LoginForm
                onSubmit={this.loginAuthor}
                success={this.state.message}
              />
            )}
          />
          <Route render={() => <FourOFour />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
