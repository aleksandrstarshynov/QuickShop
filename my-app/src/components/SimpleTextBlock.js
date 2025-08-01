import '../styles/SimpleTextBlock.css';
import React from 'react';

export default function SimpleTextBlock() {
  return (
    <section className="simple-text-block">
      <p className="simple-text-block__paragraph">
        This is a temporary text, placed here for the period of project delivery. Components where the functionality is not ready were removed from the first page and simply locked in the code. In the next release, there will be an intelligent search in two databases: Mongo and Qdrant.
      </p>
    </section>
  );
}
