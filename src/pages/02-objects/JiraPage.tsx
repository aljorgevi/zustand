import { JiraTasks } from '../../components'
import { useTasksStore } from '../../store/tasks/useTasksStore'

export const JiraPage = () => {
	const pendingTasks = useTasksStore(state => state.getTaskByStatus('open'))
	const inProgressTasks = useTasksStore(state => state.getTaskByStatus('in-progress'))
	const doneTasks = useTasksStore(state => state.getTaskByStatus('done'))

	return (
		<>
			<h1>Tareas</h1>
			<p>Manejo de estado con objectos de Zustand</p>
			<hr />

			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<JiraTasks title='Pendientes' status='open' tasks={pendingTasks} />
				<JiraTasks title='En progreso' status='in-progress' tasks={inProgressTasks} />
				<JiraTasks title='Hechas' status='done' tasks={doneTasks} />
			</div>
		</>
	)
}
