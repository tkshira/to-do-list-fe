import axios from "axios";

export default function getUsers(){
    return axios.get('http://localhost:8000/users/?format=json')
        .then(response => response.data)
}