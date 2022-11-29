import './App.css';
import React, { useEffect, useState } from 'react';
import FallentreeForm from './pages/FallentreeForm'
import ShopliftingForm from './pages/ShopliftingForm';

function App() {

  const [data, setData] = useState('');
  const [id, setId] = useState();
  const [foundWords, addFoundWords] = useState([]);
  const [jsonList, setList] = useState([]);
  const LOCAL_ADDRESS = 'http://127.0.0.1:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const [chosenIncident, setIncident] = useState("");
  const [count, setCount] = useState(0);
  const labelIds = document.getElementsByTagName("Label");
  const buttons = document.getElementsByTagName("Button");

  //Changing buttons color by given id from backend
  //For choosing incident (button)
  useEffect(() => {
    console.log("count ", count);
    if (count < 2) {
      changeButtonColor();
    }
  }, [id]);

  //Fetching data from backend with timer (every 5 sec)
  useEffect(() => {
   const interval = setInterval(() => {
      fetchData();  

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
    console.log("data effectissä", data);
    setIncident(data);
    
  }, []);  

  //Saving chosen incident after clicking incident button
  const chooseIncident = (incidentSelected) => {
    setIncident(incidentSelected);       
    buttons[id-1].style.backgroundColor = "white";
      }

  const addKeywordsToList = (id) => {
    addFoundWords(foundWords=> [...foundWords, id]);
  }

  //Fetching String data from backend
  const fetchData = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/speechservice/getvalues',
      );
      let json = await response.json();
      setData(json[0].id); 
      setId(json[0].id);
      console.log(json);
      setList(json);
      highlightAnswer(json[0].id); 
      addKeywordsToList(json[0].foundWords);
       
      console.log("onko tämä json     ",json);
    } catch (error) {
      console.log("onko tämä error", error);
    }
  };

  const changeButtonColor = () => {
    for (let i = 0; i < buttons.length; i++) {
      // console.log("button ", buttons[i].id);
      if (buttons[i].id === data) {
        
        buttons[i].style.backgroundColor = "lightblue";
      }
      setCount(1);
    }
  }

  const highlightAnswer = (id) => {
    // console.log("labels?" , labelIds);
    for (let i = 0; i < labelIds.length; i++) {
        // console.log("labels ", labelIds[i].id);
         console.log("id", id)
        if (labelIds[i].id === id) {
          // console.log("onko oikea", labelIds[i].id)
          
          labelIds[i].style.backgroundColor = "red";
        }
        }
      };



  return (
    <div className="App">
    <div className="top-content">
      <h1>Valitse oikea riskinarviopuu</h1>
  
        <button onClick={(e) => chooseIncident(e.target.value)} value="puu" id="1">Kaatunut puu</button>
        <button onClick={(e) => chooseIncident(e.target.value)} value="myymala" id="2">Myymälävarkaus</button>
      

      <p>Tämä tulee backendistä: {data}</p>


    </div>
    <div className="bottom-content">
    <div className="forms">{chosenIncident=== "puu" ? <FallentreeForm /> : chosenIncident === "myymala" ? <ShopliftingForm /> : "" }

    </div>
    <div>
    <h2>Found keywords:</h2>
   
    <ul>
    {foundWords.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
    </div>
   

    </div>
    </div>
  );
}

export default App;
