import React from 'react';
import axios from 'axios';
import './App.css';
import '../styles/style.css';
import SnipList from './SnipList';
import SearchBar from './SearchBar';
import SnipForm from './SnipForm';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snippets: []
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('http://localhost:5000/api/snippets');
    this.setState({ snippets: data });
  }

  fetchSnippets = async text => {
    const { data } = await axios.get('http://localhost:5000/api/snippets');

    if (!text) {
      this.setState({ snippets: data });
      return;
    }

    function stringsMatch(first, second) {
      if (!first) return false;
      if (!second) return false;

      return first.toUpperCase().includes(second.toUpperCase());
    }

    const filteredSnips = data.filter(
      snippet =>
        stringsMatch(snippet.title, text) ||
        stringsMatch(snippet.description, text) ||
        stringsMatch(snippet.language, text) ||
        stringsMatch(snippet.code, text)
    );

    this.setState({ snippets: filteredSnips });
  };

  insertSnippet = async snippet => {
    await axios.post('http://localhost:5000/api/snippets', snippet);
    const { data } = await axios.get('http://localhost:5000/api/snippets');
    this.setState({ snippets: data });
  };

  render() {
    return (
      <React.Fragment>
        <header>
          <nav>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/pages/about.html">About</a>
              </li>
              <li>
                <a href="/pages/snippets.html">Snippets</a>
              </li>
              <li>
                <a href="/pages/account.html">Account</a>
              </li>
            </ul>
          </nav>
        </header>
        <SearchBar onSearch={this.fetchSnippets} />
        <SnipForm onSubmit={this.insertSnippet} />
        <SnipList snippets={this.state.snippets} />
      </React.Fragment>
    );
  }
}

export default App;
