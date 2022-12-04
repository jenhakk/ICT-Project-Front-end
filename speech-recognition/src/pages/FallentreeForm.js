import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import '../App.css';


function FallentreeForm() {
  
    const [formData, saveFormData] = useState();
    const { register, handleSubmit, watch, setValue} = useForm();
      
    const onSubmit = data => {saveFormData(data);sessionStorage.clear();}
    
    console.log("Submitted data ",formData);

    useFormPersist("storageKey", {
      watch, 
      setValue,
      storage: window.sessionStorage, // default window.sessionStorage
    });


    const watchEstaakoLiikennetta = watch("estaakoLiikennetta");
    const watchIhmisvahinkoa = watch("ihmisvahinko");
      
      return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>

            <label className='label'>Mikä on puiden lukumäärä?</label>
                < br/>
            <label id="111"><input {...register("puidenlkm")} type="radio" value="1" />1</label>
            <label id="112"><input {...register("puidenlkm")} type="radio" value="2" />2</label>
            <label id="113"><input {...register("puidenlkm")} type="radio" value="3"  style={{color:'red'}}/>3</label>
            <label id="114"><input {...register("puidenlkm")} type="radio" value="monta" />Monta</label>
                <br />
                <br />

            <label className='label' >Missä puu sijaitsee?</label>
                < br/>
            <label id="121"><input {...register("sijainti")} type="radio" value="yksityinen" />Yksityinen alue</label>
            <label id="122"><input {...register("sijainti")} type="radio" value="julkinen" />Julkinen alue</label>
           
                <br />
                <br />    
    
          <label className='label'>Estääkö tapahtuma liikennettä?</label>
                < br/>
          <label id="131"><input {...register("estaakoLiikennetta", { required: true })} type="radio" value="kylla" /> Kyllä</label>
          <label id="132"><input {...register("estaakoLiikennetta", { required: true })} type="radio" value="ei" /> Ei</label>

                <br />
                <br />

          {watchEstaakoLiikennetta === "kylla" && (
            <div>

                <label className='label'>Mitä liikennettä?</label>
                    < br/>
                <label id="141"><input {...register("mitaLiikennetta")} type="radio" value="moottoritie"/>Moottoritie</label>
                <label id="142"><input {...register("mitaLiikennetta")} type="radio" value="maantie" />Maantie</label>
                <label id="143"><input {...register("mitaLiikennetta")} type="radio" value="taajama" />Taajama</label>
                <label id="144"><input {...register("mitaLiikennetta")} type="radio" value="junaraiteet" />Junaraiteet</label>
                <label id="145" ><input {...register("mitaLiikennetta")} type="radio" value="pihatie"/>Pihatie</label>
                <label id="146"><input {...register("mitaLiikennetta")} type="radio" value="kevyt" />Kevyen liikenteen väylä</label>
                    <br />
                    <br />
              </div>
          )}
          
          <label className='label'>Onko ihmisvahinkoa?</label>
              < br/>
          <label id="151"><input {...register("ihmisvahinko", { required: true })} type="radio" value="kylla" />Kyllä</label>
          <label  id="152"><input {...register("ihmisvahinko", { required: true })} type="radio" value=" ei" />Ei</label>
              <br />
              <br />

          {watchIhmisvahinkoa === "kylla" && (
          <div>
              
              <label className='label'>Monta ihmistä on vahingoittunut?</label>
                  < br/>
              <label id="161"><input {...register("ihmistenlkm")} type="radio" value="1" />1</label>
              <label id="162"><input {...register("ihmistenlkm")} type="radio" value=" 2" />2</label>
              <label id="163"><input {...register("ihmistenlkm")} type="radio" value=" 3" />3</label>
              <label id="164"><input {...register("ihmistenlkm")} type="radio" value=" useita"/>Useita</label>
                  <br />
                  <br />

                  <label className='label'>Millaista vahinkoa?</label>
                  < br/>
              <label id="171" ><input {...register("mitaVahinkoa")} type="radio" value="lieva"/>Lievästi loukkaantunut</label>
              <label id="172"><input {...register("mitaVahinkoa")} type="radio" value=" vakava" />Vakavasti loukkaantunut</label>
              <label id="173"><input {...register("mitaVahinkoa")} type="radio" value=" eloton" />Eloton</label>
            
                  <br />
                  <br />
          </div>
          )}
          <input onSubmit={sessionStorage.clear()} className='submit' type="submit" />
        </form>
      );
    
}

export default FallentreeForm;