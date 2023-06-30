//Renders an exit button that closes the current window
//Created by Alvin

import React from "react"

export default function ExitBtn(props) {
    const marginLeft = {
        margin: "8px"
    }
    return (
        <button id="exit" onClick={props.exit} style={marginLeft}>EXIT</button>
    )
}