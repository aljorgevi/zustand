import { IoAddOutline, IoCheckmarkCircleOutline } from 'react-icons/io5'
import { Task, TaskStatus } from '../../types'
import { SingleTask } from './SingleTask'
import { useTasksStore } from '../../store/tasks/useTasksStore'
import classNames from 'classnames'
import React from 'react'
import Swal from 'sweetalert2'

interface Props {
	title: string
	status: TaskStatus
	tasks: Task[]
}

export const JiraTasks = ({ title, status, tasks }: Props) => {
	const [onDragOver, setOnDragOver] = React.useState(false)
	const draggingTaskId = useTasksStore(state => state.draggingTaskId)
	const onTaskDrop = useTasksStore(state => state.onTaskDrop)
	const createTask = useTasksStore(state => state.createTask)

	async function addTask() {
		const res = await Swal.fire({
			title: 'Create a new task',
			input: 'text',
			inputPlaceholder: 'Enter task name',
			showCancelButton: true,
			inputValidator: value => {
				if (!value) {
					return 'You need to write something!'
				}
			}
		})

		if (res.isConfirmed) {
			createTask(res.value, status)
		}
	}

	function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		if (!onDragOver) {
			setOnDragOver(true)
		}
	}

	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		setOnDragOver(false)
		if (!draggingTaskId) return
		onTaskDrop(status)
	}

	function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault()
		setOnDragOver(false)
	}

	const styleWhenDragging = 'border-dashed border-blue-500'
	const isDragging = draggingTaskId !== undefined

	const genericStyle =
		'!text-black relative border-4 flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]'

	return (
		<div
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			onDragLeave={handleDragLeave}
			className={classNames(genericStyle, {
				[styleWhenDragging]: isDragging,
				'border-green-500 border-dotted': onDragOver && isDragging
			})}
		>
			{/* Task Header */}
			<div className='relative flex flex-row justify-between'>
				<div className='flex items-center justify-center'>
					<div className='flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100'>
						<span className='flex justify-center items-center h-6 w-6 text-brand-500'>
							<IoCheckmarkCircleOutline style={{ fontSize: '50px' }} />
						</span>
					</div>

					<h4 className='ml-4 text-xl font-bold text-navy-700'>{title}</h4>
				</div>

				<button onClick={addTask}>
					<IoAddOutline />
				</button>
			</div>

			{/* Task Items */}
			<div className='h-full w-full'>
				{tasks.map(task => (
					<SingleTask key={task.id} task={task} />
				))}
			</div>
		</div>
	)
}
