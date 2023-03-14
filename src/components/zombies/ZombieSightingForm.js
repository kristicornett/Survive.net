import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import {
  getTowns,
  getUsers,
  createZombieSighting,
  getDistances,
  getZombieSightingTypes
} from "../ApiManager";

export const ZombieSightingForm = (props) => {
  const [sighting, setSighting] = useState({
    closestTownId: 0,
    distanceId: 0,
    approxCount: 0,
    sightTypeId: 0,
  });
  const [towns, setTowns] = useState([])
  const [distances, setDistances] = useState([])
  const [users, setUsers] = useState([])
  const [sightingTypes, setSightingTypes] = useState([])
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
    getTowns().then((townArray) => {
      setTowns(townArray)
    })
    getUsers().then((userArray) => {
      setUsers(userArray)
    })
    getDistances().then((distanceArray) => {
      setDistances(distanceArray)
    })
    getZombieSightingTypes().then((typeArray) => {
      setSightingTypes(typeArray)
    })
  }, [])


  const handleZombieSubmit = (event) => {
    event.preventDefault()

    const zombieSightingToSendToAPI = {
      name: surviveUserObject.name,
      townId: sighting.closestTownId,
      zombieSightingDistanceId: sighting.distanceId,
      zombieSightingTypeId: sighting.sightTypeId,
      approxCount: sighting.approxCount,
      enteredDate: new Date(Date.now()).toISOString(),
      zombieSightingStatusId: 1,
    }
    return createZombieSighting(zombieSightingToSendToAPI).then(() => {
      navigate("/zombies")
    })
  }

  const updateSighting = (event) => {
    const copy = { ...sighting }
    copy[event.target.id] = event.target.value
    setSighting(copy)
  }

  const updateTown = (event) => {
    const copy = { ...sighting }
    copy.closestTownId = parseInt(event.target.value)
    setSighting(copy)
  }

  const updateDistance = (event) => {
    const copy = { ...sighting }
    copy.distanceId = parseInt(event.target.value)
    setSighting(copy)
  }

  const updateSightingType = (event) => {
    const copy = {...sighting}
    copy.sightTypeId = parseInt(event.target.value)
    setSighting(copy)
  }

  return (
    <main style={{ textAlign: "center" }}>
      <form className="zombieSighting" onSubmit={handleZombieSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Report a Zombie Sighting</h1>
        <fieldset>
          <select required onChange={updateTown}>
            <option>Choose Town</option>

            {towns.map((town) => {
              return (
                <option key={town.id} value={town.id}>
                  {town.name}
                </option>
              )
            })}
          </select>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <select required onChange={updateDistance}>
              <option>Choose Distance From Town</option>

              {distances.map((distance) => {
                return (
                  <option key={distance.id} value={distance.id}>
                    {distance.distance}
                  </option>
                )
              })}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <input
            onChange={updateSighting}
            name="Number of Zombies"
            type="number"
            id="approxCount"
            className="numberOfZombies"
            placeholder="Number of Zombies"
            required
          />
        </fieldset>
        <fieldset>
            <div className="form-group">
              {sightingTypes.map((sightingType) => {
                return (
                    <label
                       key={sightingType.id}>
                     <input
                     onChange={updateSightingType}
                     checked={sightingType.id === sighting.sightTypeId}
                    type='radio'
                    name='SightingType'
                    value={sightingType.id} /> {sightingType.type}
                    </label>
                )
              })}
            </div>
        </fieldset>
        <fieldset>
          <button type="submit" onClick={(event) => handleZombieSubmit(event)}>
            {" "}
            Submit Zombie Sighting{" "}
          </button>
        </fieldset>
      </form>
    </main>
  )
}
