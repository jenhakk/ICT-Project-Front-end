import './App.css';
import { person } from '@jsonforms/examples';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';

function App() {

  const schema = person.schema;
  const uischema = person.uischema;
  const initialData = person.data;

  const [data, setData] = useState(initialData);


  return (
    <div className="App">
    <div>
      <h1>Valitse oikea riskinarviopuu</h1>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data, errors }) => setData(data)}
      />

    </div>

    <div>
      <li style={{listStyleType:"none"}}>
        <ul>Kaatunut puu</ul>
        <ul>Myymälävarkaus</ul>
      </li>
    </div>
   


    </div>
  );
}

export default App;
