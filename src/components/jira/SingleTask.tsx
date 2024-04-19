import { IoReorderTwoOutline } from 'react-icons/io5'
import { Task } from '../../types'
import { useTasksStore } from '../../store/tasks/useTasksStore'

export const SingleTask = ({ task }: { task: Task }) => {
	const setDraggingTaskId = useTasksStore(state => state.setDraggingTaskId)
	const removeDraggingTaskId = useTasksStore(state => state.removeDraggingTaskId)

	return (
		<div
			draggable
			onDragStart={() => {
				setDraggingTaskId(task.id)
			}}
			onDragEnd={removeDraggingTaskId}
			className='mt-5 flex items-center justify-between p-2'
		>
			<div className='flex items-center justify-center gap-2'>
				<p className='text-base font-bold text-navy-700'>{task.title}</p>
			</div>
			<span className=' h-6 w-6 text-navy-700 cursor-pointer'>
				<IoReorderTwoOutline />
			</span>
		</div>
	)
}
