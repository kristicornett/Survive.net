import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {
    const localSurviveUser = localStorage.getItem('survive_user')
    const localSurviveObject = JSON.parse(localSurviveUser)
    const navigate = useNavigate()

    return (
        <ul className='navbar'>
            <li className='navbar__item active'>
                <Link className='navbar__link' to='/zombies'>Zombie Sightings</Link>
            </li>
            <li className='navbar__item active'>
                <Link className='navbar__link' to='/trade'>Trade Offers</Link>
            </li>
            <li className='navbar__item active'>
                <Link className='navbar__link' to='/towns'>Towns</Link>
            </li>

            {
                localStorage.getItem('survive_user')
                ? <li className='navbar__item navbar__logout'>
                    <Link className='navbar__link' to='' onClick={() => {
                        localStorage.removeItem('survive_user')
                        navigate('/', {replace: true})
                    }}>Logout</Link>
                </li>
                : ''
            }
        </ul>
    )
}

