import './registration.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
	const [regState, setRegState] = useState('signup');
	const dispatch = useDispatch();
	const toastOptions = {
		position: "bottom-right",
		autoClose: 8000, // Corrected "autoclose" to "autoClose"
		pauseOnHover: true, // Corrected "pasuseOnHover" to "pauseOnHover"
		draggable: true,
		theme: "dark",
	}
	const [state, setState] = useState({
		email: '',
		password: '',
		username: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			dispatch(
				register({
					username: state.username,
					password: state.password,
					email: state.email,
				})
			);
		}
		else {
			console.log('registration failed')
		}


	};
//handles validation while form filling 
	const handleValidation = () => {
		const { email, password, username } = state;
		if (username.length < 3) {
			toast.error("Username should be greater than 3 characters", toastOptions);
			return false
		} else if (email === "") {
			toast.error("email is required", toastOptions);
			return false;
		} else if (password.length < 8) {
			toast.error("Password should be equal to greater than 8 characters", toastOptions);
			return false;
		}
		return true;

	}
	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	console.log(state.email, state.password, state.username);
	return (
		<>
			<div className='signup-form'>
				<div className='signup-form__wrapper'>
					<form className='form' onSubmit={(e) => handleSubmit(e)}>
						<h4>Sign up</h4>

						<div className='form-group'>
							<input
								type='text'
								placeholder='Enter Name'
								name='username'
								value={state.username}
								onChange={e => handleChange(e)}
							/>
						</div>
						<div className='form-group'>
							<input
								type='email'
								name='email'
								value={state.email}
								id=''
								placeholder='Enter Email'
								onChange={e => handleChange(e)}
							/>
						</div>
						<div className='form-group'>
							<input
								type='password'
								name='password'
								value={state.password}
								id=''
								placeholder='Enter Password'
								onChange={e => handleChange(e)}
							/>
						</div>
						<div className='form-group'>
							<button className='button'>Sign Up</button>
						</div>
					</form>
				</div>
				<ToastContainer></ToastContainer>
			</div>
			
		</>
	);
};

export default Signup;
