import React from "react";

const Persons = ({persons, filter, onClick}) => {
    return (
        <div>
            {filter
              ? persons
                  .filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
                  .map(person => 
                    <Person key={person.name}
                            name={person.name}
                            number={person.number}
                            id={person.id}
                            onClick={onClick}/>)

              : persons.map(person => 
                    <Person key={person.name}
                            name={person.name}
                            number={person.number}
                            id={person.id}
                            onClick={onClick}/>)}
        </div>
    )
}

const Person = ({name, number, id, onClick}) => {
    return (
        <div>
            <span>{name} {number}</span>
            <button id={id} name={name} onClick={onClick}>delete</button>
        </div>
    )
}

export default Persons