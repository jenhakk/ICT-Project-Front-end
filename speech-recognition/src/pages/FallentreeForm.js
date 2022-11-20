import React from 'react';
import Form from '../components/Form';

function FallentreeForm(props) {

    let template = {
        title: 'Kaatunut puu',
        fields: [
            {
                title: 'Mikä on puiden lukumäärä?',
                type: 'radio',
                name:'puidenlkm',
               
                
            },
            {
                title: 'Mikä on puiden lukumäärä?',
                type: 'radio',
                register: 'puidenlkm',
                value: '2'
                
            },
            {
                title: 'Email',
                type: 'email',
                name: 'email'
            },
            {
                title: 'Include Portfolio',
                type: 'checkbox',
                name: 'include_portfolio'
            },
            {
                title: 'Portfolio Link',
                type: 'url',
                name: 'portfolio_link',
                dynamic: {
                    field: 'include_portfolio',
                    value: true
                }
            }
        ]
    }

    return (
        <Form
            template={template}
            watchFields={['include_portfolio']}
            onSubmit={onSubmit}
        
        />
    );
}


function onSubmit(values) {
    console.log(values);
}




export default FallentreeForm;