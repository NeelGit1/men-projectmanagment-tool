import './registration.css';
import '../../styles/components/_button.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/authSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
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
	});

	const handleChange = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value,
		});
	};

	const handleValidation = () => {
		const { email, password } = state;
		if (email === "") {
			toast.error("email is required", toastOptions);
			return false;
		} else if (password.length < 8) {
			toast.error("Password should be equal to greater than 8 characters", toastOptions);
			return false;
		}
		return true;

	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (handleValidation()) {
			dispatch(
				signin({
					email: state.email,
					password: state.password,
				})
			);
		}
		else {
			console.log('login failed')
		}
		
	};

	return (
		<div className='signup-form'>
			<div className='signup-form__wrapper'>
				<form className='form' onSubmit={(e) => handleSubmit(e)}>
					<h4>Sign In</h4>
					<div className='form-group'>
						<input
							type='email'
							name='email'
							value={state.email}
							placeholder='Enter Email'
							onChange={e => handleChange(e)}
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							name='password'
							value={state.password}
							placeholder='Enter Password'
							onChange={e => handleChange(e)}
						/>
					</div>
					<div className='form-group'>
						<button className='button'>Sign In</button>
					</div>
				</form>
			</div>
			<ToastContainer></ToastContainer>
		</div>
	);
};

export default Signin;
