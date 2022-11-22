import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';


function FallentreeForm() {

    
    const [formData, saveFormData] = useState();
    const { register, handleSubmit, watch, setValue} = useForm();
    
    const onSubmit = data => {saveFormData(data)};
    console.log("mikä tämä on ",formData);

    useFormPersist("storageKey", {
      watch, 
      setValue,
      storage: window.localStorage, // default window.sessionStorage
    });
    
    const watchEstaakoLiikennetta = watch("estaakoLiikennetta");
    const watchIhmisvahinkoa = watch("ihmisvahinko");
      
      return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Mikä on puiden lukumäärä?</label>
                < br/>
            <label htmlFor='puidenlkm'><input {...register("puidenlkm")} type="radio" value="1"/>1</label>
            <label><input {...register("puidenlkm")} type="radio" value="2"/>2</label>
            <label><input {...register("puidenlkm")} type="radio" value="3"/>3</label>
            <label><input {...register("puidenlkm")} type="radio" value="monta"/>Monta</label>
                <br />
                <br />
    
          <label>Estääkö tapahtuma liikennettä?</label>
                < br/>
          <label><input {...register("estaakoLiikennetta", { required: true })} type="radio" value="kylla" /> Kyllä</label>
          <label><input {...register("estaakoLiikennetta", { required: true })} type="radio" value="ei" /> Ei</label>

                <br />
                <br />

          {watchEstaakoLiikennetta === "kylla" && (
            <div>

                <label>Mitä liikennettä?</label>
                    < br/>
                <label><input {...register("mitaLiikennetta")} type="radio" value="moottoritie" />Moottoritie</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="maantie" />Maantie</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="taajama" />Taajama</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="junaraiteet" />Junaraiteet</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="pihatie" />Pihatie</label>
                <label><input {...register("mitaLiikennetta")} type="radio" value="kevyt" />Kevyen liikenteen väylä</label>
                    <br />
                    <br />
              </div>
          )}
          
          <label>Onko ihmisvahinkoa?</label>
              < br/>
          <label><input {...register("ihmisvahinko", { required: true })} type="radio" value="kylla" />Kyllä</label>
          <label><input {...register("ihmisvahinko", { required: true })} type="radio" value=" ei" />Ei</label>
              <br />
              <br />

          {watchIhmisvahinkoa === "kylla" && (
          <div>
              <label>Millaista vahinkoa?</label>
                  < br/>
              <label><input {...register("mitaVahinkoa")} type="radio" value="lieva" />Lievästi loukkaantunut</label>
              <label><input {...register("mitaVahinkoa")} type="radio" value=" vakava" />Vakavasti loukkaantunut</label>
              <label><input {...register("mitaVahinkoa")} type="radio" value=" eloton" />Eloton</label>
            
                  <br />
                  <br />
              <label>Monta ihmistä on vahingoittunut?</label>
                  < br/>
              <label><input {...register("ihmistenlkm")} type="radio" value="1" />1</label>
              <label><input {...register("ihmistenlkm")} type="radio" value=" 2" />2</label>
              <label><input {...register("ihmistenlkm")} type="radio" value=" 3" />3</label>
              <label><input {...register("ihmistenlkm")} type="radio" value=" useita" />Useita</label>
                  <br />
                  <br />
          </div>
          )}
          <input type="submit" />
        </form>
      );
    
}

export default FallentreeForm;