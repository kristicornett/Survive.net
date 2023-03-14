import { useEffect, useState } from 'react'
import { deleteZombieSighting, getTowns, getZombieSightings } from '../ApiManager'
import { useNavigate } from 'react-router-dom'

export const ZombieSighting = ({disableAddButton}) => {
    const [sightings, setSightings] = useState([])
    const [showAdd, setShowAdd] = useState(disableAddButton ? disableAddButton : false)
    const [towns, setTowns] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            refreshZombieSightings()
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

    const deleteSighting = (event, sightingId) => {
        event.preventDefault()

        deleteZombieSighting(sightingId)
        .then((data) => refreshZombieSightings())
    }

    const refreshZombieSightings = () => {
            getZombieSightings()
            .then((sightingArray) => {
                setSightings(sightingArray)
            })
    }

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
                            <div>Closest Town: {sighting?.town?.name}, Number of Zombies: {sighting.approxCount} Type: {sighting?.zombieSightingType?.type} Status: {sighting?.zombieSightingStatus?.status} <button id='delete_sighting' onClick={(event => deleteSighting(event, sighting.id))}>X</button> <button type="submit" className='button' onClick={() => navigate(`/zombies/${sighting.id}/status`)}>Update Status</button></div>
                        </section>
                    }
                )
            }
        </article>
        </>
}

