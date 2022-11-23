import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';


function FallentreeForm() {
  
    const [formData, saveFormData] = useState();
    const { register, handleSubmit, watch, setValue} = useForm();
    // const [inputListTree, setInputsTree] = useState([]);
    
    const onSubmit = data => {saveFormData(data)};

    useFormPersist("storageKey", {
      watch, 
      setValue,
      storage: window.localStorage, // default window.sessionStorage
    });

    useEffect (() => 
      {
        let inputs = document.getElementsByTagName("Input");
        console.log("inputTree", inputs);
    },[]);
    // setInputsTree(document.getElementsByTagName("Input"));
    // console.log(inputListTree);
    
    const watchEstaakoLiikennetta = watch("estaakoLiikennetta");
    const watchIhmisvahinkoa = watch("ihmisvahinko");
      
      return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Mikä on puiden lukumäärä?</label>
                < br/>
            <label><input {...register("puidenlkm")} type="radio" value="1" id="111"/>1</label>
            <label><input {...register("puidenlkm")} type="radio" value="2" id="112"/>2</label>
            <label><input {...register("puidenlkm")} type="radio" value="3" id="113"/>3</label>
            <label><input {...register("puidenlkm")} type="radio" value="monta" id="114"/>Monta</label>
                <br />
                <br />

            <label>Missä puu sijaitsee?</label>
                < br/>
            <label><input {...register("sijainti")} type="radio" value="yksityinen" id="121"/>Yksityinen alue</label>
            <label><input {...register("sijainti")} type="radio" value="julkinen" id="122"/>Julkinen alue</label>
           
                <br />
                <br />    
    
          <label>Estääkö tapahtuma liikennettä?</label>
                < br/>
          <label><input {...register("estaakoLiikennetta", { required: true })} type="radio" value="kylla" id="131" /> Kyllä</label>
          <label><input {...register("estaakoLiikennetta", { required: true })} type="radio" value="ei" id="132" /> Ei</label>

                <br />
                <br />

          {watchEstaakoLiikennetta === "kylla" && (
            <div>

                <label>Mitä liikennettä?</label>
                    < br/>
                <label><input {...register("mitaLiikennetta")} type="radio" value="moottoritie" id="13111"/>Moottoritie</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="maantie" id="13112" />Maantie</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="taajama" id="13113" />Taajama</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="junaraiteet" id="13114" />Junaraiteet</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="pihatie" id="13115" />Pihatie</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="kevyt" id="13116" />Kevyen liikenteen väylä</label>
                    <br />
                    <br />
              </div>
          )}
          
          <label>Onko ihmisvahinkoa?</label>
              < br/>
          <label><input {...register("ihmisvahinko", { required: true })} type="radio" value="kylla" id="141" />Kyllä</label>
          <label><input {...register("ihmisvahinko", { required: true })} type="radio" value=" ei" id="142" />Ei</label>
              <br />
              <br />

          {watchIhmisvahinkoa === "kylla" && (
          <div>
              
              <label>Monta ihmistä on vahingoittunut?</label>
                  < br/>
              <label><input {...register("ihmistenlkm")} type="radio" value="1" id="14111" />1</label>
              <label><input {...register("ihmistenlkm")} type="radio" value=" 2" id="14112" />2</label>
              <label><input {...register("ihmistenlkm")} type="radio" value=" 3" id="14113" />3</label>
              <label><input {...register("ihmistenlkm")} type="radio" value=" useita" id="14114" />Useita</label>
                  <br />
                  <br />

                  <label>Millaista vahinkoa?</label>
                  < br/>
              <label><input {...register("mitaVahinkoa")} type="radio" value="lieva" id="14121" />Lievästi loukkaantunut</label>
              <label><input {...register("mitaVahinkoa")} type="radio" value=" vakava" id="14122" />Vakavasti loukkaantunut</label>
              <label><input {...register("mitaVahinkoa")} type="radio" value=" eloton" id="14123" />Eloton</label>
            
                  <br />
                  <br />
          </div>
          )}
          <input type="submit" />
        </form>
      );
    
}

export default FallentreeForm;