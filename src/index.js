import React from 'react';
import ReactDOM from 'react-dom';
import './CSS/index.css';
import Checklist from './Components/Checklist.jsx';
import ChecklistSample from './Components/ChecklistSample.js';

const props = {
  checklistTitle: "To-Do list.",
  addItemPlaceholder: "Add another task...",
  incomingChecklistObject: ChecklistSample,
};

ReactDOM.render(<Checklist {...props}/>, document.getElementById('root'));

if (module.hot) { module.hot.accept() }
