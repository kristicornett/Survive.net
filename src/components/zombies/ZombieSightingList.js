import { useEffect, useState } from 'react'
import { getTowns, getZombieSightings } from '../ApiManager'
import { useNavigate } from 'react-router-dom'

export const ZombieSighting = ({disableAddButton}) => {
    const [sightings, setSightings] = useState([])
    const [showAdd, setShowAdd] = useState(disableAddButton ? disableAddButton : false)
    const [towns, setTowns] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getZombieSightings()
            .then((sightingArray) => {
                setSightings(sightingArray)
            })
        },
        [towns]
    )

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
        <h2>Zombie Sightings</h2>
        {
    
            !showAdd ?
            
            <button type="submit" className='zombie__button' onClick={() => navigate('/zombies/add')}> Report a Zombie </button>
            : ''
           
        }
        <article className="zombieSightings">
            {
                sightings.map(
                    (sighting) => {
                        return <section key={`sighting--${sighting.id}`} className='Sighting'>
                            <div>Closest Town: {sighting?.town?.name}, Number of Zombies: {sighting.approxCount}</div>
                        </section>
                    }
                )
            }
        </article>
        </>
}

