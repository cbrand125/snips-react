import React, { Component } from 'react';
import axios from 'axios';
import SnipList from './SnipList';
import SearchBar from './SearchBar';
import SnipForm from './SnipForm';

export default class Snippets extends Component {
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
        <SearchBar onSearch={this.fetchSnippets} />
        <SnipForm onSubmit={this.insertSnippet} />
        <SnipList snippets={this.state.snippets} />
      </React.Fragment>
    );
  }
}
