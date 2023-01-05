// React
import { useEffect, useState } from 'react';
// Hasher
import sha256 from 'sha256';
// Alerts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

	const [ theme, setTheme ] = useState(0);
	const [ input, setInput ] = useState('');
	const [ hashed, setHashed ] = useState('');

	// Get app theme from localStorage and apply it to state.
	useEffect(() => {
		const theme = Number(localStorage.getItem('theme'));
		setTheme(theme);
	}, [])

	const handleHash = (e) => {
		e.preventDefault();
		if([input].includes('')) {
			toast.success('You must type a password or words to hash', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: `${theme ? 'dark' : 'light'}`,
			});
			return;
		}
		// Hash password and set to state
		const hashed = sha256(input);
		setHashed(hashed)
		setInput('')
	} 

	const handleCopyToClipboard = () => {
		// Copy hashed password to navigator clipboard
		navigator.clipboard.writeText(hashed);
		toast.success('Copied to clipboard!', {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: `${theme ? 'dark' : 'light'}`,
		});
	}

	const handleClose = () => {
		setHashed('');
	}

	const handleTheme = () => {
		// Change theme and save to localStorage
		theme ? setTheme(0) : setTheme(1);
		localStorage.setItem('theme', theme ? 0 : 1);
	}

	return (
		<>
			<div className={`grid place-items-center h-screen ${ theme ? ' bg-[#1A1A1A]' : 'bg-white' } transition-colors`}>
				<button onClick={handleTheme} className={`${ theme ? 'bg-[#424242] text-zinc-400' : 'bg-zinc-200 text-zinc-600'} shadow-md rounded-md text-2xl absolute right-6 top-6 flex items-center justify-center transition-colors`} style={{height: "38px", width: "38px"}}><i className={`fa-solid ${theme === 0 ? 'fa-moon' : 'fa-sun'}`}></i></button>
				<div className='flex flex-col gap-10 px-2 w-[18rem] sm:w-[27rem]'>
					<form className='flex flex-col gap-5' onSubmit={(e) => handleHash(e)}>
						<div className={`${ !theme ? ' text-[#1A1A1A]' : 'text-zinc-300' } transition-colors text-center text-5xl font-normal uppercase` }>Sha256 Hasher</div>
						<input className={`${ theme ? ' bg-[#343434] text-gray-300 border-transparent' : 'bg-white' } border rounded p-2 outline-none transition-colors`} type="password" placeholder='Words to hash' onChange={(e) => setInput(e.target.value)} value={input} />
						<button type='submit' className={`${ theme ? 'bg-[#424242] hover:bg-[#343434] text-gray-300' : 'bg-sky-500 hover:bg-sky-600' } p-2 cursor-pointer text-white text-xl rounded font-semibold transition-all`}>Hash</button>
					</form>
					{hashed && (
						<div className='flex items-center gap-2'>
							<div className={`border font-medium py-1 ${ theme ? 'border-neutral-600 text-zinc-300' : 'border-gray-300 text-black'} px-1 text-lg rounded overflow-hidden`}>{hashed}</div>
							<div className='bg-gray-300 p-2 pb-1 rounded cursor-pointer' onClick={handleCopyToClipboard}><i className="fal fa-copy"></i></div>
							<div className='bg-red-500 text-white p-2 pb-1 rounded cursor-pointer' onClick={handleClose}><i className="fal fa-times"></i></div>
						</div>
					)}
				</div>
			</div>
			<div className={`${ !theme ? ' text-[#1A1A1A]' : 'text-zinc-300' } absolute bottom-5 left-1/2 -translate-x-1/2 font-semibold text-xl whitespace-nowrap`}>Made by MathiasB25 <span className='text-base'>💜</span></div>
			{/* React toastify alert */}
			<ToastContainer />
		</>
	)
}

export default App
