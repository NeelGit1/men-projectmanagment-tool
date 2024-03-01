import './header.css';
import '../../styles/components/_button.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { logoutSuccess } from '../../redux/authSlice';
import history from '../../history';

const Header = () => {
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth); // Assuming auth is the part of the state you're interested in

	// Memoize the selector function using useMemo
	const memoizedAuth = useMemo(() => auth, [auth]);

	const handleClick = (e) => {
		e.preventDefault();
		dispatch(logoutSuccess());
		localStorage.removeItem('auth');
		history.push('/signin');
		window.location.reload();
	};
	return (
		<div>
			<nav className='header'>
				<div className='header__logo'>
					<h5>Project Manager</h5>
				</div>
				<div className='header__buttons'>
					{memoizedAuth.currentUser && memoizedAuth.currentUser.token ? (
						<Link to='/signin' className='button' onClick={handleClick}>
							SignOut
						</Link>
					) : (
						<>
							<Link to='/signin' className='button'>
								SignIn
							</Link>
							<Link to='/signup' className='button'>
								SignUp
							</Link>
						</>
					)}
				</div>
			</nav>
		</div>
	);
};

export default Header;
