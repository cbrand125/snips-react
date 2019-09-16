import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import 'highlight.js/styles/agate.css';

export default class Snip extends React.Component {
  static propTypes = {
    snippet: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      language: PropTypes.string,
      code: PropTypes.string
    })
  };

  constructor(props) {
    super(props);

    this.codeRef = React.createRef();
  }

  componentDidMount() {
    hljs.highlightBlock(this.codeRef.current);
  }

  render() {
    const { snippet } = this.props;
    const { title, description, language, code } = snippet;

    return (
      <div className="snip">
        <div className="text">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <pre>
          <code ref={this.codeRef} className={language}>
            {code}
          </code>
        </pre>
      </div>
    );
  }
}
