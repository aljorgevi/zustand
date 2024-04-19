import { create } from 'zustand'
import { Task, TaskStatus } from '../../types'
import { devtools } from 'zustand/middleware'

interface taskState {
	draggingTaskId?: string
	tasks: Record<string, Task>
	getTaskByStatus: (status: TaskStatus) => Task[]
	setDraggingTaskId: (id: string) => void
	removeDraggingTaskId: () => void
	updateTaskProgress: (id: string, status: TaskStatus) => void
	onTaskDrop: (status: TaskStatus) => void
	createTask: (title: string, status: TaskStatus) => void
}

export const useTasksStore = create<taskState>()(
	devtools(
		(set, get) => ({
			createTask: (title: string, status: TaskStatus) => {
				const id = crypto.getRandomValues(new Uint32Array(1))[0].toString()
				const newTask = { id, title, status }

				set(state => ({
					tasks: { ...state.tasks, [id]: newTask }
				}))
			},
			onTaskDrop: (status: TaskStatus) => {
				const draggingTaskId = get().draggingTaskId
				if (!draggingTaskId) return

				get().updateTaskProgress(draggingTaskId, status)
				get().removeDraggingTaskId()
			},
			updateTaskProgress: (id: string, status: TaskStatus) => {
				set(state => ({
					tasks: { ...state.tasks, [id]: { ...state.tasks[id], status } }
				}))
			},
			draggingTaskId: undefined,
			setDraggingTaskId: (id: string) => set({ draggingTaskId: id }, false, 'setDraggingTaskId'),
			removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId'),

			tasks: {
				'1': { id: '1', title: 'Task 1', status: 'open' },
				'2': { id: '2', title: 'Task 2', status: 'done' },
				'3': { id: '3', title: 'Task 3', status: 'in-progress' },
				'4': { id: '4', title: 'Task 4', status: 'open' }
			},
			getTaskByStatus: (status: TaskStatus) => {
				const tasks = Object.values(get().tasks).filter(task => task.status === status)

				return tasks
			}
		}),
		{
			name: 'tasks-storage'
		}
	)
)
