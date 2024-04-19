import { useShallow } from 'zustand/react/shallow'
import { WhiteCard } from '../../components'
import { useBearStore } from '../../store'

export const BearPage = () => {
	return (
		<>
			<h1>Contador de Osos</h1>
			<p>Manejo de estado simple de Zustand</p>
			<hr />

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
				<BlackBearCounter />
				<PolarBearCounter />
				<PandaBearCounter />
			</div>

			<ViewBears />
		</>
	)
}

function ViewBears() {
	const bears = useBearStore(useShallow(state => state.bears))
	const doNothing = useBearStore(state => state.doNothing)
	const addBear = useBearStore(state => state.addBear)
	const clearBears = useBearStore(state => state.clearBears)

	return (
		<WhiteCard centered>
			<h2>Osos</h2>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginBottom: '20px',
					gridGap: '10px'
				}}
			>
				<button onClick={doNothing}>Do Nothing</button>
				<button onClick={addBear}>Add Bear</button>
				<button onClick={clearBears}>Clear Bears</button>
			</div>
			<ul>
				<pre>{JSON.stringify(bears, null, 2)}</pre>
			</ul>
		</WhiteCard>
	)
}

function BlackBearCounter() {
	const blackBears = useBearStore(state => state.blackBears)
	const incrementBlackBears = useBearStore(state => state.incrementBlackBears)

	return (
		<WhiteCard centered>
			<h2>Black Bears</h2>

			<div className='flex flex-col md:flex-row'>
				<button onClick={() => incrementBlackBears(1)}> +1</button>
				<span className='text-3xl mx-2 lg:mx-10'> {blackBears}</span>
				<button onClick={() => incrementBlackBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	)
}

function PolarBearCounter() {
	const polarBears = useBearStore(state => state.polarBears)
	const intrementPolarBears = useBearStore(state => state.intrementPolarBears)

	return (
		<WhiteCard centered>
			<h2>Polar Bears</h2>

			<div className='flex flex-col md:flex-row'>
				<button onClick={() => intrementPolarBears(1)}> +1</button>
				<span className='text-3xl mx-2 lg:mx-10'> {polarBears}</span>
				<button onClick={() => intrementPolarBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	)
}

function PandaBearCounter() {
	const pandaBears = useBearStore(state => state.pandaBears)
	const intrementPandaBears = useBearStore(state => state.intrementPandaBears)

	return (
		<WhiteCard centered>
			<h2>Panda Bears</h2>

			<div className='flex flex-col md:flex-row'>
				<button onClick={() => intrementPandaBears(1)}> +1</button>
				<span className='text-3xl mx-2 lg:mx-10'> {pandaBears}</span>
				<button onClick={() => intrementPandaBears(-1)}>-1</button>
			</div>
		</WhiteCard>
	)
}
