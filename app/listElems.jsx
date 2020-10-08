import React from "react";
import ReactDOM from 'react-dom';

const data = ['point1', 'point2', 'point3'];
const List = () => <ul>
  {data.map(v => <li>{v}</li>)}
</ul>

ReactDOM.render(<List />, document.getElementById('root'));

export default List;
