
export default interface Task {
    id: number
    task_title: string
    task_description: string
    create_date: Date
    status: string
    finished_date: Date
    owner: number
}