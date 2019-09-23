import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      password: ''
    };
  }

  handleChange = (event, field) => {
    const { value } = event.target;

    this.setState({
      [field]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <section className="forms">
        <div className="loginForm">
          <h2>Log In</h2>
          <form onSubmit={this.handleSubmit}>
            <label className="halfwidth">
              Name
              <input
                name="name"
                type="text"
                value={this.state.name}
                onChange={event => this.handleChange(event, 'name')}
              />
            </label>
            <label className="halfwidth">
              Password
              <input
                name="password"
                type="text"
                value={this.state.password}
                onChange={event => this.handleChange(event, 'password')}
              />
            </label>
            <button type="submit">Log In</button>
          </form>
        </div>
        <p>{this.props.success}</p>
      </section>
    );
  }
}
