import { createContext } from 'react'
import useTasksListProvider from '../hooks/useTasksListProvider'

const TasksListContext = createContext({})

export function TasksListProvider(props) {
  const tasksListProvider = useTasksListProvider()
  return (
    <TasksListContext.Provider value={tasksListProvider}>
      {props.children}
    </TasksListContext.Provider>
  )
}

export default TasksListContext
