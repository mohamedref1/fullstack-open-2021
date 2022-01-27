import React from "react";

const Notification = ({notify}) => {
    if (notify === null) {
        return null
    }

    return (
        <div className={notify.type}>
            <p>{notify.message}</p>
        </div>
    )
}

export default Notification