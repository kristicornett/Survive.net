import { useEffect, useState } from 'react'
import { getTowns } from '../ApiManager'
import { useNavigate } from 'react-router-dom'
import './Town.css'

export const TownList = () => {
    const [towns, setTowns] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getTowns()
            .then((townArray) => {
                setTowns(townArray)
            })
        },
        []
    )
        return <>
        <h2>Towns</h2>
        <button type="submit" className='town__button' onClick={() => navigate('/towns/add')}> Add A Town </button>
        <article className="town_List">
            {
                towns.map(
                    (town) => {
                        return <section key={`town--${town.id}`}>
                            <div className='town'>{town.name}: {town.description} {town.vacancy ? 'Homes available.' : 'No vacancy.'}</div>
                        </section>
                    }
                )
            }
        </article>
        </>
}
