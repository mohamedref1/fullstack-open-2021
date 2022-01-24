import React from "react";

const PersonForm = ({onSubmit, onChange, fieldsInfo: [name, number]}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input name={name.name} 
                             type="text"
                             value={name.value} 
                             onChange={onChange}/>
            </div>
            <div>
                number: <input name={number.name} 
                               type="tel"
                               pattern="[0-9]{2,3}-[0-9]{2,3}-?[0-9]{4,}"
                               value={number.value} 
                               onChange={onChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>  
    )
}

export default PersonForm