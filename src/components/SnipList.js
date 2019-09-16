import React from 'react';
import Snip from './snip';

export default function SnipList(props) {
  return (
    <section id="snippets">
      {props.snippets.reverse().map(snippet => (
        <Snip key={snippet.id} snippet={snippet} />
      ))}
    </section>
  );
}
