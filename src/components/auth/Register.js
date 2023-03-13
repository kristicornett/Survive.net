import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createNewUser, getUserByEmail, getTowns } from '../ApiManager'

export const Register = (props) =>  {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        townId: 0
    })
    const [towns, setTowns] = useState([])
    const localSurviveUser = localStorage.getItem('survive_user')
    const surviveUserObject = JSON.parse(localSurviveUser)

    let navigate = useNavigate()

    useEffect(
        () => {
            getTowns()
            .then((townArray) => {
                setTowns(townArray)
            })
        },
        []
    )

   const registeredNewUser = () => {
    return createNewUser(user)
    .then(createdUser => {
        if (createdUser.hasOwnProperty('id')) {
            localStorage.setItem('survive_user', JSON.stringify({
                id: createdUser.id,
                name: createdUser.name,
                
            }))

            navigate('/')
        }
    })
   }

   const handleRegister = (event) => {
    event.preventDefault()
    return getUserByEmail(user.email)
            .then(response => {
                if(response.length > 0) {
                    window.alert('Account with that email address already exists')
                } else {
                    registeredNewUser()
                }
            })
   }

   const updateUser = (event) => {
    const copy = {...user}
    copy[event.target.id] = event.target.value
    setUser(copy)
   }

   const updateTown = (event) => {
    const copy = {...user}
    copy.townId = event.target.value
    setUser(copy)
   }

   const handleRegisterButton = (event) => {
    event.preventDefault()

    const sendNewUserToAPI = {
      
    }
   }

   return (
    <main style={{ textAlign: 'center' }}>
        <form className='survive__login' onSubmit={handleRegister}>
            <h1 className='h3 mb-3 font-weight-normal'>Register to Survive</h1>
            <fieldset>
                <label htmlFor='fullName'>Full Name</label>
                <input onChange={updateUser}
                type='text' id='name' className='form-control'
                placeholder='Enter Name' required autoFocus />
            </fieldset>
            <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateUser}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Password </label>
                    <input onChange={updateUser}
                        type="password" id="password" className="form-control"
                        placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <div className='form-group'>
                        <select
                        required onChange={updateTown}>
                            <option>Choose Town</option>

                            {
                                towns.map(
                                    (town) => {
                                        return <option value={town.id}>{town.name}</option>
                                    }
                                )
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
   )
    
}
