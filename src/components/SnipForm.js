import React, { Component } from 'react';

export default class SnipForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      language: 'HTML',
      description: '',
      code: '',
      author: 'Cody Brand'
    };
  }

  handleChange = (event, field) => {
    const { value } = event.target;

    this.setState({
      [field]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <section className="forms">
        <div className="snipForm">
          <h2>Add New Snippet</h2>
          <form onSubmit={this.handleSubmit}>
            <label className="halfwidth">
              Title
              <input
                name="title"
                type="text"
                value={this.state.title}
                onChange={event => this.handleChange(event, 'title')}
              />
            </label>
            <label className="halfwidth">
              Language
              <select
                value={this.state.language}
                onChange={event => this.handleChange(event, 'language')}
              >
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="SQL">SQL</option>
              </select>
            </label>
            <label className="fullwidth">
              Description
              <textarea
                rows="4"
                value={this.state.description}
                onChange={event => this.handleChange(event, 'description')}
              />
            </label>
            <label className="fullwidth">
              Code
              <textarea
                rows="4"
                value={this.state.code}
                onChange={event => this.handleChange(event, 'code')}
              />
            </label>
            <button type="submit">Add Snippet</button>
          </form>
        </div>
      </section>
    );
  }
}
