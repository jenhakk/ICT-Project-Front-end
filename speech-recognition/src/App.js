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

  //Changing buttons color by given id from backend
  //For choosing incident (button)
  useEffect(() => {
    console.log("count ", count);
    if (count < 2) {
      changeButtonColor();
    }
    
  }, [data]);

  //Fetching data from backend with timer (every 5 sec)
  useEffect(() => {
   const interval = setInterval(() => {
      fetchData();  
      highlightAnswer(); 

    }, 5000); 
    return () => {
      clearInterval(interval);
    }
    }, []);

  //Saving chosen form to localStorage (session)
  useEffect(() => {
    console.log("chosenEffect ", chosenIncident);
    window.localStorage.setItem('chosenIncident', chosenIncident);
    console.log("local ", window.localStorage.getItem('chosenIncident'));
  }, [chosenIncident]);

  //Getting saved data from localStorage after re-render
  useEffect(() => {
    console.log("chosenEffect2 ", chosenIncident);
    const data = window.localStorage.getItem('chosenIncident');
    console.log("data ", data);
    setIncident(data);
    
  }, []);  

  //Saving chosen incident after clicking incident button
  const chooseIncident = (incidentSelected) => {
    setIncident(incidentSelected);
  } 

  //Fetching String data from backend
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

  const changeButtonColor = () => {
    let buttons = document.getElementsByTagName("Button");

    for (let i = 0; i < buttons.length; i++) {
      console.log("button ", buttons[i].id);
      if (buttons[i].id === data) {
        
        buttons[i].style.backgroundColor = "lightblue";
      }
      
      setCount(1);
      
    }
  }

  const highlightAnswer = () => {
   
    //console.log("onko inputit ", inputs);

  }

  return (
    <div className="App">
    <div>
      <h1>Valitse oikea riskinarviopuu</h1>
  
        <button onClick={(e) => chooseIncident(e.target.value)} value="puu" id="1">Kaatunut puu</button>
        <button onClick={(e) => chooseIncident(e.target.value)} value="myymala" id="2">Myymälävarkaus</button>
      

      <p>Tämä tulee backendistä: {data}</p>


    </div>
    <div className="forms">{chosenIncident=== "puu" ? <FallentreeForm /> : chosenIncident === "myymala" ? <ShopliftingForm /> : "" }

    </div>

    
   


    </div>
  );
}

export default App;
