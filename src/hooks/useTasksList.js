import { useContext } from 'react'
import TasksListContext from '../contexts/TasksListContext'

function useTasksList() {
  return useContext(TasksListContext)
}

export default useTasksList
