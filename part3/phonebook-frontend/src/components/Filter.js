import React from "react"

const Filter = ({fieldInfo: {name, value}, onChange}) => {
    return (
        <div>
            filter shown with: <input name={name}
                                      value={value}
                                      onChange={onChange} />
        </div>

    )
}

export default Filter