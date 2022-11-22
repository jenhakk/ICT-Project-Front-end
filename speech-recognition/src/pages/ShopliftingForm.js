import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';

function ShopliftingForm() {
    const [formData, saveFormData] = useState();
    const { register, handleSubmit, watch, setValue} = useForm();
    
    const onSubmit = data => {saveFormData(data)};
    console.log("mikä tämä on ",formData);

    useFormPersist("storageKey", {
      watch, 
      setValue,
      storage: window.localStorage, // default window.sessionStorage
    });
    
    const watchVakivallanUhka = watch("vakivallanUhka");
    const watchIhmisvahinkoa = watch("ihmisVahinkoa");
    const watchTekijatiedossa = watch("tekijaTiedossa");

      
      return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <label>Onko väkivallan uhkaa?</label>
                < br/>
            <label ><input {...register("vakivallanUhka")} type="radio" value="kylla"/>Kyllä</label>
            <label><input {...register("vakivallanUhka")} type="radio" value="ei"/>Ei</label>
            
                <br />
                <br />

                {watchVakivallanUhka === "kylla" && (
                    <div>
                        
                   
                    <label>Onko henkilövahinkoa?</label>
                        < br/>
                    <label ><input {...register("ihmisVahinkoa")} type="radio" value="kylla"/>Kyllä</label>
                    <label><input {...register("ihmisVahinkoa")} type="radio" value="ei"/>Ei</label>
                        <br />
                        <br />
                        {watchIhmisvahinkoa === "kylla" && (

                    <div>
                        <label>Kuinka monta vahingoittunutta?</label>
                        < br/>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="1"/>1</label>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="2"/>2</label>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="3"/>3</label>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="useita"/>Useita</label>
                            <br />
                            <br />
                        
                        <label>Minkälaista vahinkoa?</label>
                            < br/>
                        <label><input {...register("vahinko", { required: true })} type="radio" value="lieva" />Lievästi vahingoittunut</label>
                        <label><input {...register("vahinko", { required: true })} type="radio" value="vakava" />Vakavasti vahingoittunut</label>
                        <label><input {...register("vahinko", { required: true })} type="radio" value="eloton" />Eloton</label>
                            <br />
                            <br />


                    </div>)}
                    
                    <label>Onko asetta?</label>
                        < br/>
                    <label ><input {...register("ase")} type="radio" value="tera"/>Teräase</label>
                    <label><input {...register("ase")} type="radio" value="ampuma"/>Ampuma-ase</label>
                    <label><input {...register("ase")} type="radio" value="lyoma"/>Lyömäase</label>
                    <label><input {...register("ase")} type="radio" value="ei"/>Ei asetta</label>
                        <br />
                        <br />


                    </div>
                    
                )}
                <label>Onko tekijä tiedossa?</label>
                    < br/>
                <label ><input {...register("tekijaTiedossa")} type="radio" value="kylla"/>Kyllä</label>
                <label><input {...register("tekijaTiedossa")} type="radio" value="ei"/>Ei</label>
                
                    <br />
                    <br />
                    {watchTekijatiedossa === "kylla" && (

                    <div>
                        <label>Kuinka monta tekijää?</label>
                        < br/>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="1"/>1</label>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="2"/>2</label>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="3"/>3</label>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="useita"/>Useita</label>
                            <br />
                            <br />
                        
                        <label>Onko tekijä paikalla?</label>
                            < br/>
                        <label><input {...register("tekijaPaikalla", { required: true })} type="radio" value="kylla" />Kyllä</label>
                        <label><input {...register("tekijaPaikalla", { required: true })} type="radio" value="ei" />Ei</label>
                        
                            <br />
                            <br />
                    </div>)}
                


    
         
          <input type="submit" />
        </form>
      );
    

}

export default ShopliftingForm;