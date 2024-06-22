"use client"

import { getTaskList } from '@/app/lib/task'
import getUsers from '../lib/users'
import { useEffect, useState } from 'react'
import { parseISO, format } from 'date-fns'
import Task from '../interface/task'
import User from '../interface/user'
import Link from 'next/link'


export default function Page() {
    const [taskList, setTaskList] = useState<Task[]>([])
    const [userList, setUserList] = useState<User[]>([])

    function parseDate(dateTime: string){
        return format(dateTime, 'yyyy/MM/dd')
    }
    

    useEffect(() => {
        getTaskList().then((tasks) => {
            setTaskList(tasks)
        })
        getUsers().then((users) => {
            setUserList(users)
        })
    }, [])

    return (
        <div className="flex flex-row justify-items-center">
            {
                userList.map((user: User) => (
                        <div className="w-56 h-screen border border-black mx-1">
                        <h1 className="text-2xl text-center font-bold">{user.username}</h1>
                            <ul className="grid justify-items-center">
                                {
                                    taskList.filter((task) => task.owner === user.id).map((task: any) => (
                                        <li>
                                            <div className="min-w-48 w-5/6 bg-yellow-300 border border-black m-2">
                                                <h1 className="text-xl text-center font-semibold">{task.task_title}</h1>
                                                <p>{task.task_description}</p>
                                                <p>{parseDate(task.create_date)}</p>
                                                <Link href={`/tasks/${task.id}`}>Open</Link>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                ))
            }
        </div>)
}