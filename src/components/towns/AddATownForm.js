import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createNewTown, getTowns } from "../ApiManager";


export const AddATown = (props) => {
  const [town, setTown] = useState({
    name: '',
    description: '',
    population: 0,
    vacancy: false,
    latitude: 0,
    longitude: 0
  });

 
  const [allTowns, setAllTowns] = useState([])
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
    getTowns().then((townArray) => {
      setAllTowns(townArray)
    })
   
  }, [])


  const TownSubmit = (event) => {
    event.preventDefault()

    const newTownToSendToAPI = {
      name: town.name,
      description: town.description,
      population: town.population,
      vacancy: town.vacancy,
      latitude: town.latitude,
      longitude: town.longitude
      
    }
    return createNewTown(newTownToSendToAPI).then(() => {
      navigate("/towns")
    })
  }


  const updateTown = (event) => {
    const copy = { ...town }
    if (isNaN(parseInt(event.target.value))) {
        copy[event.target.id] = event.target.value
    } else {
        copy[event.target.id] = parseInt(event.target.value)
    }   
    setTown(copy)
  }

  const setVacancy = (event) => {
    const copy = {...town}
    copy.vacancy = (event.target.value == 'true')
    setTown(copy)
  }



  return (
    <main style={{ textAlign: 'center' }}>
      <form className='addATown' onSubmit={updateTown}>
        <h1 className='h3 mb-3 font-weight-normal'>Add A Town</h1>
        <fieldset>
            <div className='form-group'>
            <input
            onChange={updateTown}
            name='Name of Town'
            type='text'
            id='name'
            className='townName'
            placeholder='Name of town'
            required />
           </div>
           </fieldset> 
        
           <fieldset>
            <div className='form-group'>
            <input
            onChange={updateTown}
            name='Description'
            type='text'
            id='description'
            className='townDescription'
            placeholder='Description of Town'
            required />
           </div>
           </fieldset> 

           <fieldset>
          <input
            onChange={updateTown}
            name='population'
            type='number'
            id='population'
            className='numberOfTown'
            placeholder="Population"
            required
          />
        </fieldset>

        <fieldset>
            <div className='form-group'>
            <span className='form-label'>Latitude: </span>    
            <input
            onChange={updateTown}
            name='latitude'
            type='text'
            id='latitude'
            className='latitude'
            placeholder='Town Latitude'
            required />
            <span className='form-label'>  Longitude: </span>
           <input
            onChange={updateTown}
            name='longitude'
            type='text'
            id='longitude'
            className='longitude'
            placeholder='Town Longitude'
            required />
           </div>
           </fieldset> 
           
           <fieldset>
           <label>Vacancy
            <input type='radio' name='townVacancy' onChange={setVacancy} value={true} checked={
                (
                    town.vacancy == true
                )
            }></input>
           </label>
           <label>No Vacancy
            <input type='radio' name='townVacancy' onChange={setVacancy} value={false} checked={
                (
                    town.vacancy == false
                )
            }></input>
           </label>
           </fieldset>
        <fieldset>
          <button type="submit" onClick={(event) => TownSubmit(event)}>
            {" "}
            Submit New Town{" "}
          </button>
        </fieldset>
      </form>
    </main>
  )
}
