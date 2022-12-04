import './App.css';
import React, { useEffect, useState } from 'react';
import FallentreeForm from './pages/FallentreeForm'
import ShopliftingForm from './pages/ShopliftingForm';

function App() {

  const [data, setData] = useState('');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [id, setId] = useState();
  const [foundWords, addFoundWords] = useState([]);
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

  //Fetching data from backend with timer (every 3 sec)
  useEffect(() => {
   const interval = setInterval(() => {
      fetchData();  

    }, 3000); 
    return () => {
      clearInterval(interval);
    }
    }, []);

  //Saving chosen form to localStorage (session)
  useEffect(() => {
    console.log("chosenEffect ", chosenIncident);
    window.sessionStorage.setItem('chosenIncident', chosenIncident);
    console.log("local ", window.sessionStorage.getItem('chosenIncident'));
  }, [chosenIncident]);

  //Getting saved data from localStorage after re-render
  useEffect(() => {
    console.log("chosenEffect2 ", chosenIncident);
    const data = window.sessionStorage.getItem('chosenIncident');
    console.log("data effectissä", data);
    setIncident(data);
    
  }, []);  

  //Saving chosen incident after clicking incident button
  const chooseIncident = (incidentSelected) => {
    setIncident(incidentSelected);   
    buttons[id-1].style.backgroundColor = "white";      
    console.log("61", chosenIncident);
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
      addKeywordsToList(json[0].foundWords);
      highlightAnswer(json[0].id);
      setName(json[0].value);
    
     
      console.log("onko tämä json     ",json);
    } catch (error) {
      console.log("onko tämä error", error);
    }
  };

  async function selectInc(id){
    console.error("chosen incident is ", id);
    try {
      let response = await fetch(
        'http://127.0.0.1:8080/rest/speechservice/selectincident',
        {
          method: 'POST',
          headers: {'Content-Type': 'text/plain'},
          body: id,
        },
      );

      // let responseData = await response.json();
      
    } catch (error) {
      console.log(error);
    }

  }

  const changeButtonColor = () => {
    for (let i = 0; i < buttons.length; i++) {
      // console.log("button ", buttons[i].id);
      if (buttons[i].id === data) {
        
        buttons[i].style.backgroundColor = "#98E78A";
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
          
          labelIds[i].style.backgroundColor = '#98E78A';
        }
        }
      };

      const addKeywordsToList = (id) => {
     
        if(id != null) {
          addFoundWords(id);
        } 
        };

  return (
    <div className="App">
    <div className="top-content">
      <h1>Valitse oikea riskinarviopuu</h1>
  
    <div className="buttons">
        <button className="button" onClick={(e) => {
          {chooseIncident(e.target.value)}; {selectInc("1")}}} value="Kaatunut puu" id="1">Kaatunut puu</button>
        <button className="button" onClick={(e) => {{chooseIncident(e.target.value)}; {selectInc("2")}}} value="Myymälävarkaus" id="2">Myymälävarkaus</button>
      </div>

      <h3>Valittu riskinarvio: {chosenIncident}</h3>
      <p>Tämä tulee backendistä: {data}</p>


    </div>
    <div className="bottom-content">
    <div className="forms">{chosenIncident=== "Kaatunut puu" ? <FallentreeForm /> : chosenIncident === "Myymälävarkaus" ? <ShopliftingForm /> : "" }

    </div>
    <div>
    <h3>Löytyneitä avainsanoja:</h3>
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
