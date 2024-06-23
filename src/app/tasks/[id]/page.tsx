'use client'

import { getTask, putTask } from "@/app/lib/task"
import Task from '@/app/interface/task'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function Page({ params }: { params: { id: number } }) {
    const [task, setTask] = useState<Task>()

    useEffect(() => {
        getTask(params.id).then((task: Task) => {
            task.create_date = task.create_date
            setTask(task)
        })
    }, [])

    const saveTask = (e: any) => {
        if (task){
            putTask(task).then(() => {
                alert('saved')
            })
            e.preventDefault();
        }
    }

    const handleChange = (e: any) => {
        const updatedTask = {
            ...task, 
            [e.target.name]: e.target.value
        } as Task
        setTask(updatedTask)
    }

    const formatDate = (date: string) => {
        if (date){
            return date.slice(0, 16)
        }
        return ''
    }

    return (
        <div>
            <button type="button" className="custom-button" onClick={() => useRouter().back()}>Back</button>
        {
            task ? (
                <form>
                    <div className="custom-form">
                        <div className="custom-form-div">
                            <p>Title</p>
                            <input className="custom-input" type="text" name="task_title" value={task.task_title} onChange={handleChange}></input>
                        </div>
                        <div className="custom-form-div">
                            <p>Description</p>
                            <input className="custom-input" type="text" name="task_description" value={task.task_description} onChange={handleChange}></input>
                        </div>
                        <div className="custom-form-div">
                            <p>Create Date</p>
                            <input className="custom-input" type="datetime-local" name="create_date" value={formatDate(task.create_date)} onChange={handleChange}></input>
                        </div>
                        <div className="custom-form-div">
                            <p>Status</p>
                            <select className="custom-input" name="status" value={task.status} onChange={handleChange}>
                                <option value="0">Not Started</option>
                                <option value="1">In Progress</option>
                                <option value="2">Finished</option>
                            </select>
                        </div>
                        <div className="custom-form-div">
                            <p>Finished Date</p>
                            <input className="custom-input" type="datetime-local" name="finished_date" value={formatDate(task.finished_date)} onChange={handleChange}></input>
                        </div>
                        <div className="custom-form-div">
                            <p>Owner</p>
                            <input className="custom-input" type="text" name="owner" value={task.owner} onChange={handleChange}></input>
                        </div>
                        <button className="custom-button" onClick={saveTask}>Save</button>
                    </div>
                </form>
            ) : (<p>no data</p>)
        }
        </div>
    )
}