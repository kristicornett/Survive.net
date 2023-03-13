import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByEmail } from '../ApiManager'


export const Login = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    const handleLogin = (event) => {
        event.preventDefault()

        return getUserByEmail(email)
        .then(foundUsers => {
            if (foundUsers.length === 1){
                const user = foundUsers[0]
                localStorage.setItem('survive_user', JSON.stringify({
                    id: user.id,
                    name: user.name

                }))

                navigate('/')
            } else {
                window.alert('Invalid Login')
            }
        })
    }

    return (
        <main className='container--login'>
            <section>
                <form className='survive__login' onSubmit={handleLogin}>
                    <h1>Survive.net</h1>
                    <h2>Sign In</h2>
                    <fieldset>
                        <label htmlFor='inputEmail'>Email address</label>
                        <input type='email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        className='form-control'
                        placeholder='Email address'
                        required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type='submit'>
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className='link--register'>
                <Link to='/register'>Join Survive.net</Link>
            </section>
        </main>
    )
}