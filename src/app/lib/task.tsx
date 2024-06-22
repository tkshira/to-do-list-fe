import axios from 'axios'
import Task from '../interface/task'

const url = 'http://localhost:8000/tasks'

export async function getTaskList(){
    return axios.get(`${url}/?format=json`)
        .then(response => response.data)
}

export async function getTask(id: number){
    return axios.get(`${url}/${id}/?format=json`)
        .then(response => response.data)
}

export async function putTask(task: Task){
    return axios.put(`${url}/${task.id}/`, task)
}