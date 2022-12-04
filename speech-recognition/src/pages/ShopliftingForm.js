import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import '../App.css';

function ShopliftingForm() {
    const [formData, saveFormData] = useState();
    const { register, handleSubmit, watch, setValue} = useForm();
    
    const onSubmit = data => {saveFormData(data);sessionStorage.clear();}
    console.log("Submitted data ",formData);

    useFormPersist("storageKey", {
      watch, 
      setValue,
      storage: window.sessionStorage, // default window.sessionStorage
    });
    
    const watchVakivallanUhka = watch("vakivallanUhka");
    const watchIhmisvahinkoa = watch("ihmisVahinkoa");
    const watchTekijatiedossa = watch("tekijaTiedossa");

      
      return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>

            <label className='label'>Onko väkivallan uhkaa?</label>
                < br/>
            <label id="211" ><input {...register("vakivallanUhka")} type="radio" value="kylla" />Kyllä</label>
            <label id="212"><input {...register("vakivallanUhka")} type="radio" value="ei" />Ei</label>
            
                <br />
                <br />

                {watchVakivallanUhka === "kylla" && (
                    <div>
                        
                   
                    <label className='label'>Onko henkilövahinkoa?</label>
                        < br/>
                    <label id="221" ><input {...register("ihmisVahinkoa")} type="radio" value="kylla" />Kyllä</label>
                    <label id="222"><input {...register("ihmisVahinkoa")} type="radio" value="ei" />Ei</label>
                        <br />
                        <br />
                        {watchIhmisvahinkoa === "kylla" && (

                    <div>
                        <label className='label'>Kuinka monta vahingoittunutta?</label>
                        < br/>
                        <label id="231"><input {...register("vahingoittunutlkm")} type="radio" value="1" />1</label>
                        <label id="232"><input {...register("vahingoittunutlkm")} type="radio" value="2" />2</label>
                        <label id="233"><input {...register("vahingoittunutlkm")} type="radio" value="3" />3</label>
                        <label id="234"><input {...register("vahingoittunutlkm")} type="radio" value="useita" />Useita</label>
                            <br />
                            <br />
                        
                        <label className='label'>Minkälaista vahinkoa?</label>
                            < br/>
                        <label id="241"><input {...register("vahinko", { required: true })} type="radio" value="lieva" />Lievästi vahingoittunut</label>
                        <label id="242"><input {...register("vahinko", { required: true })} type="radio" value="vakava" />Vakavasti vahingoittunut</label>
                        <label id="243"><input {...register("vahinko", { required: true })} type="radio" value="eloton"  />Eloton</label>
                            <br />
                            <br />


                    </div>)}
                    
                    <label className='label'>Onko asetta?</label>
                        < br/>
                    <label  id="251"><input {...register("ase")} type="radio" value="tera" />Teräase</label>
                    <label id="252"><input {...register("ase")} type="radio" value="ampuma" />Ampuma-ase</label>
                    <label id="253"><input {...register("ase")} type="radio" value="lyoma" />Lyömäase</label>
                    <label id="254"><input {...register("ase")} type="radio" value="ei" />Ei asetta</label>
                        <br />
                        <br />


                    </div>
                    
                )}
                <label className='label'>Onko tekijä tiedossa?</label>
                    < br/>
                <label id="261"><input {...register("tekijaTiedossa")} type="radio" value="kylla" />Kyllä</label>
                <label id="262"><input {...register("tekijaTiedossa")} type="radio" value="ei" />Ei</label>
                
                    <br />
                    <br />
                    {watchTekijatiedossa === "kylla" && (

                    <div>
                        <label className='label'>Kuinka monta tekijää?</label>
                        < br/>
                        <label id="271"><input {...register("tekijoidenlkm")} type="radio" value="1" />1</label>
                        <label id="272"><input {...register("tekijoidenlkm")} type="radio" value="2" />2</label>
                        <label id="273"><input {...register("tekijoidenlkm")} type="radio" value="3" />3</label>
                        <label id="274"><input {...register("tekijoidenlkm")} type="radio" value="useita" />Useita</label>
                            <br />
                            <br />
                        
                        <label className='label'>Onko tekijä paikalla?</label>
                            < br/>
                        <label id="281"><input {...register("tekijaPaikalla", { required: true })} type="radio" value="kylla" />Kyllä</label>
                        <label id="282"><input {...register("tekijaPaikalla", { required: true })} type="radio" value="ei" />Ei</label>
                        
                            <br />
                            <br />
                    </div>)}
                


    
         
          <input onSubmit={sessionStorage.clear()}className='submit' type="submit" />
        </form>
      );
    

}

export default ShopliftingForm;