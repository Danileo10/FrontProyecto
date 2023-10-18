import {createContext, useState, useEffect} from 'react';

import axios from "axios";

export const dataContext = createContext();

export const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);
    

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api-comercio/mostrar_producto')
        .then((res)=> setData(res.data));
    }, []);


    return <dataContext.Provider value={{ data, cart, setCart }}>{children}</dataContext.Provider>;
    
};

	