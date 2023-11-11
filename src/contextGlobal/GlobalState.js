import React, { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";

const GlobalState = (props) => {

    const [userData, setUserData] = useState({})
    //Dados dos Registros
   
    const datas = {
        userData,
        setUserData
    }


    return(
        <GlobalStateContext.Provider value={datas}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalState;