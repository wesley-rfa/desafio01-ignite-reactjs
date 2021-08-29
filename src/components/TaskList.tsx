import { useState } from 'react'
import '../styles/tasklist.scss'
import { FiTrash, FiCheckSquare } from 'react-icons/fi'
interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [idsArray, setIdsArray] = useState<number[]>([]);

  function getRandom(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function handleCreateNewTask() {

    if (!newTaskTitle) return
    let newId = getRandom(1, 100)

    if (!idsArray.includes(newId)) {
      setIdsArray(oldIds => [...oldIds, newId])
      console.log(idsArray)
      const newTask = {
        id: getRandom(1, 50),
        title: newTaskTitle,
        isComplete: false,
      }

      setTasks(oldTask => [...oldTask, newTask])
      setNewTaskTitle('')
    }

  }

  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(task => task.id == id ? {
      ...task,
      isComplete: !task.isComplete
    } : task)

    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => { task.id !== id })
    setTasks(filteredTasks)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}