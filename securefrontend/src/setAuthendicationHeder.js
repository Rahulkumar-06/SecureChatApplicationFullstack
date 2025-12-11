import axios from "axios";

export function setAuthendication(token){
    if(token){
        axios.defaults.headers.common['Authorization']=`Bearer ${token}`
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}