import React from 'react';

const h1 = React.createElement(
  'h1',
  {className: 'heading'},
  'Learning react'
);

const description = React.createElement(
  'div',
  {id: 'desc', className: 'content'},
  'That is a plain div block with some text and just it.'
);

const composed = React.createElement(
  'main', null, h1, description
)

export default composed;
