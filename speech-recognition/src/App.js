import './App.css';
import React, { useEffect, useState } from 'react';
import FallentreeForm from './pages/FallentreeForm'
import ShopliftingForm from './pages/ShopliftingForm';

function App() {

  const [data, setData] = useState('');
  const LOCAL_ADDRESS = 'http://127.0.0.1:8081';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const [chosenIncident, setIncident] = useState("");
  const [count, setCount] = useState(0);



  useEffect(() => {
   const interval = setInterval(() => {
      fetchData();   
      console.log("count ",count);

    }, 5000); 
    return () => {
      clearInterval(interval);
    }
    }, []);


  useEffect(() => {
    console.log("chosenEffect ", chosenIncident);
    window.localStorage.setItem('chosenIncident', chosenIncident);
     console.log("local ", window.localStorage.getItem('chosenIncident'));
  }, [chosenIncident]);

  useEffect(() => {
    console.log("chosenEffect2 ", chosenIncident);
    const data = window.localStorage.getItem('chosenIncident');
     console.log("data ", data);
    setIncident(data);
  }, []);  

  const chooseIncident = (incidentSelected) => {
    setIncident(incidentSelected);
  } 

  const fetchData = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/speechservice/getdata',
      );
      let json = await response.text();
      setData(json);
      console.log("onko tämä json     ",json);
     
  
    } catch (error) {
      console.log("onko tämä error", error);
    }
  };

  return (
    <div className="App">
    <div>
      <h1>Valitse oikea riskinarviopuu</h1>
  
        <button onClick={(e) => chooseIncident(e.target.value)} value="puu">Kaatunut puu</button>
        <button onClick={(e) => chooseIncident(e.target.value)} value="myymala">Myymälävarkaus</button>
      

      <p>Tämä tulee backendistä: {data}</p>


    </div>
    <div>{chosenIncident=== "puu" ? <FallentreeForm /> : chosenIncident === "myymala" ? <ShopliftingForm /> : "" }

    </div>

    
   


    </div>
  );
}

export default App;
