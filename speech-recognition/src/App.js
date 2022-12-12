import './App.css';
import React, { useEffect, useState } from 'react';
import FallentreeForm from './pages/FallentreeForm'
import ShopliftingForm from './pages/ShopliftingForm';

function App() {

  //Addresses for server
  const LOCAL_ADDRESS = 'http://127.0.0.1:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  //States for saving id from backend
  const [data, setData] = useState('');
  const [id, setId] = useState();
  //State for found words list
  const [foundWords, addFoundWords] = useState([]);
  //State for chosen incident
  const [chosenIncident, setIncident] = useState("");
  //State for useEffect, checking if incident has been suggested
  const [count, setCount] = useState(0);
  //getting labels and buttons ids
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

  //Fetching data from backend with timer (every 0.5 sec)
  useEffect(() => {
   const interval = setInterval(() => {
      fetchData();  

    }, 500); 
    return () => {
      clearInterval(interval);
    }
    }, []);

  //Saving chosen form to localStorage (session)
  useEffect(() => {
    window.sessionStorage.setItem('chosenIncident', chosenIncident);
  }, [chosenIncident]);

  //Getting saved data from localStorage after re-render
  useEffect(() => {
    const data = window.sessionStorage.getItem('chosenIncident');
    setIncident(data);
    
  }, []);  

  //Saving chosen incident after clicking incident button
  const chooseIncident = (incidentSelected) => {
    setIncident(incidentSelected);   
    buttons[id-1].style.backgroundColor = "white";      
      }
  

  //Fetching String data from backend
  const fetchData = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/speechservice/getvalues',
      );
      let json = await response.json();
      //saving ids from backend to data
      setData(json[0].id); 
      setId(json[0].id);

      //adding found words to list
      addKeywordsToList(json[0].foundWords);
      //calling highlightAnswer and sending answer id to it
      highlightAnswer(json[0].id);

    } catch (error) {
    
    }
  };


  //Sending selected incident's id to backend
  async function selectInc(id){
    try {
      let response = await fetch(
        'http://127.0.0.1:8080/rest/speechservice/selectincident',
        {
          method: 'POST',
          headers: {'Content-Type': 'text/plain'},
          body: id,
        },
      );
      
    } catch (error) {
      console.log(error);
    }

  }

  //Method for changing suggested incident button's color
  const changeButtonColor = () => {
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].id === data) {
        
        buttons[i].style.backgroundColor = "#98E78A";
      }
      setCount(1);
    }
  }

  //Method for highlighting answer from form by it's id
  const highlightAnswer = (id) => {
    
    for (let i = 0; i < labelIds.length; i++) {
        console.log("id", id)
        if (labelIds[i].id === id) {
         
          labelIds[i].style.backgroundColor = '#98E78A';
        }
      }
   };

  //Adding found words from backend to list
  const addKeywordsToList = (id) => {
  
    if(id != null) {
      addFoundWords(id);
    } 
  };

  return (
    <div className="App">
      <div className="top-content">
        <h1>Valitse oikea riskinarviopuu</h1>
    
      {/* Buttons for incidents, when user clicks button, the id of chosen incident will be sent to backend */}
      <div className="buttons">
          <button className="button" onClick={(e) => {
            {chooseIncident(e.target.value)}; {selectInc("1")}}} value="Kaatunut puu" id="1">Kaatunut puu</button>
          <button className="button" onClick={(e) => {{chooseIncident(e.target.value)}; {selectInc("2")}}} value="Myymälävarkaus" id="2">Myymälävarkaus</button>
      </div>

        <h3>Valittu riskinarvio: {chosenIncident}</h3>
        <p>Tämä tulee backendistä: {data}</p>


      </div>
      
      {/* Showing chosen incident's form */}
      <div className="bottom-content">
          <div className="forms">{chosenIncident=== "Kaatunut puu" ? <FallentreeForm /> : chosenIncident === "Myymälävarkaus" ? <ShopliftingForm /> : "" }

      </div>
       {/* Printing found keywords list */}
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
