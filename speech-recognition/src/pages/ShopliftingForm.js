import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';

function ShopliftingForm() {
    const [formData, saveFormData] = useState();
    const { register, handleSubmit, watch, setValue} = useForm();
    
    const onSubmit = data => {saveFormData(data)};
    console.log("Submitted data ",formData);

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
            <label id="211" ><input {...register("vakivallanUhka")} type="radio" value="kylla" />Kyllä</label>
            <label id="212"><input {...register("vakivallanUhka")} type="radio" value="ei" />Ei</label>
            
                <br />
                <br />

                {watchVakivallanUhka === "kylla" && (
                    <div>
                        
                   
                    <label>Onko henkilövahinkoa?</label>
                        < br/>
                    <label id="21111" ><input {...register("ihmisVahinkoa")} type="radio" value="kylla" />Kyllä</label>
                    <label id="21112"><input {...register("ihmisVahinkoa")} type="radio" value="ei" />Ei</label>
                        <br />
                        <br />
                        {watchIhmisvahinkoa === "kylla" && (

                    <div>
                        <label>Kuinka monta vahingoittunutta?</label>
                        < br/>
                        <label id="2111111"><input {...register("vahingoittunutlkm")} type="radio" value="1" />1</label>
                        <label id="2111112"><input {...register("vahingoittunutlkm")} type="radio" value="2" />2</label>
                        <label id="2111113"><input {...register("vahingoittunutlkm")} type="radio" value="3" />3</label>
                        <label id="2111114"><input {...register("vahingoittunutlkm")} type="radio" value="useita" />Useita</label>
                            <br />
                            <br />
                        
                        <label>Minkälaista vahinkoa?</label>
                            < br/>
                        <label id="2111121"><input {...register("vahinko", { required: true })} type="radio" value="lieva" />Lievästi vahingoittunut</label>
                        <label id="2111122"><input {...register("vahinko", { required: true })} type="radio" value="vakava" />Vakavasti vahingoittunut</label>
                        <label id="2111123"><input {...register("vahinko", { required: true })} type="radio" value="eloton"  />Eloton</label>
                            <br />
                            <br />


                    </div>)}
                    
                    <label>Onko asetta?</label>
                        < br/>
                    <label  id="21121"><input {...register("ase")} type="radio" value="tera" />Teräase</label>
                    <label id="21122"><input {...register("ase")} type="radio" value="ampuma" />Ampuma-ase</label>
                    <label id="21123"><input {...register("ase")} type="radio" value="lyoma" />Lyömäase</label>
                    <label id="21124"><input {...register("ase")} type="radio" value="ei" />Ei asetta</label>
                        <br />
                        <br />


                    </div>
                    
                )}
                <label>Onko tekijä tiedossa?</label>
                    < br/>
                <label id="221"><input {...register("tekijaTiedossa")} type="radio" value="kylla" />Kyllä</label>
                <label id="222"><input {...register("tekijaTiedossa")} type="radio" value="ei" />Ei</label>
                
                    <br />
                    <br />
                    {watchTekijatiedossa === "kylla" && (

                    <div>
                        <label>Kuinka monta tekijää?</label>
                        < br/>
                        <label id="22111"><input {...register("tekijoidenlkm")} type="radio" value="1" />1</label>
                        <label id="22112"><input {...register("tekijoidenlkm")} type="radio" value="2" />2</label>
                        <label id="22113"><input {...register("tekijoidenlkm")} type="radio" value="3" />3</label>
                        <label id="22114"><input {...register("tekijoidenlkm")} type="radio" value="useita" />Useita</label>
                            <br />
                            <br />
                        
                        <label>Onko tekijä paikalla?</label>
                            < br/>
                        <label id="22121"><input {...register("tekijaPaikalla", { required: true })} type="radio" value="kylla" />Kyllä</label>
                        <label id="22122"><input {...register("tekijaPaikalla", { required: true })} type="radio" value="ei" />Ei</label>
                        
                            <br />
                            <br />
                    </div>)}
                


    
         
          <input type="submit" />
        </form>
      );
    

}

export default ShopliftingForm;