import React from "react";

const CountryForm = ({onSubmit, onChange, value}) => {
    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="search">find countries </label>
            <input id="search" 
                name="search"
                value={value}
                onChange={onChange} />
        </form>
    )
}

export default CountryForm