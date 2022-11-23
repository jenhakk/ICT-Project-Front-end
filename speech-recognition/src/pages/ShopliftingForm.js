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
            <label ><input {...register("vakivallanUhka")} type="radio" value="kylla" id="211" />Kyllä</label>
            <label><input {...register("vakivallanUhka")} type="radio" value="ei" id="212" />Ei</label>
            
                <br />
                <br />

                {watchVakivallanUhka === "kylla" && (
                    <div>
                        
                   
                    <label>Onko henkilövahinkoa?</label>
                        < br/>
                    <label ><input {...register("ihmisVahinkoa")} type="radio" value="kylla" id="21111" />Kyllä</label>
                    <label><input {...register("ihmisVahinkoa")} type="radio" value="ei" id="21112" />Ei</label>
                        <br />
                        <br />
                        {watchIhmisvahinkoa === "kylla" && (

                    <div>
                        <label>Kuinka monta vahingoittunutta?</label>
                        < br/>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="1" id="2111111" />1</label>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="2" id="2111112" />2</label>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="3" id="2111113" />3</label>
                        <label><input {...register("vahingoittunutlkm")} type="radio" value="useita" id="2111114" />Useita</label>
                            <br />
                            <br />
                        
                        <label>Minkälaista vahinkoa?</label>
                            < br/>
                        <label><input {...register("vahinko", { required: true })} type="radio" value="lieva" id="2111121" />Lievästi vahingoittunut</label>
                        <label><input {...register("vahinko", { required: true })} type="radio" value="vakava" id="2111122" />Vakavasti vahingoittunut</label>
                        <label><input {...register("vahinko", { required: true })} type="radio" value="eloton" id="2111123" />Eloton</label>
                            <br />
                            <br />


                    </div>)}
                    
                    <label>Onko asetta?</label>
                        < br/>
                    <label ><input {...register("ase")} type="radio" value="tera" id="21121" />Teräase</label>
                    <label><input {...register("ase")} type="radio" value="ampuma" id="21122" />Ampuma-ase</label>
                    <label><input {...register("ase")} type="radio" value="lyoma" id="21123" />Lyömäase</label>
                    <label><input {...register("ase")} type="radio" value="ei" id="21124" />Ei asetta</label>
                        <br />
                        <br />


                    </div>
                    
                )}
                <label>Onko tekijä tiedossa?</label>
                    < br/>
                <label ><input {...register("tekijaTiedossa")} type="radio" value="kylla" id="221" />Kyllä</label>
                <label><input {...register("tekijaTiedossa")} type="radio" value="ei" id="222" />Ei</label>
                
                    <br />
                    <br />
                    {watchTekijatiedossa === "kylla" && (

                    <div>
                        <label>Kuinka monta tekijää?</label>
                        < br/>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="1" id="22111" />1</label>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="2" id="22112" />2</label>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="3" id="22113" />3</label>
                        <label><input {...register("tekijoidenlkm")} type="radio" value="useita" id="22114" />Useita</label>
                            <br />
                            <br />
                        
                        <label>Onko tekijä paikalla?</label>
                            < br/>
                        <label><input {...register("tekijaPaikalla", { required: true })} type="radio" value="kylla" id="22121" />Kyllä</label>
                        <label><input {...register("tekijaPaikalla", { required: true })} type="radio" value="ei" id="22122" />Ei</label>
                        
                            <br />
                            <br />
                    </div>)}
                


    
         
          <input type="submit" />
        </form>
      );
    

}

export default ShopliftingForm;