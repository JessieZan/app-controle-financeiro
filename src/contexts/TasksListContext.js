import { createContext } from 'react'
import useTasksListProvider from '../hooks/useTasksListProvider'

const TasksListContext = createContext({})

export function TasksListProvider(props) {
  const valuesProvider = useTasksListProvider()
  return (
    <TasksListContext.Provider value={valuesProvider}>
      {props.children}
    </TasksListContext.Provider>
  )
}

export default TasksListProvider
