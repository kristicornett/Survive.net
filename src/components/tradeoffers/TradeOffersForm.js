import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { createNewTrade, getSupplies, getTradeOffers, getSupplies, getSupplyTypes } from "../ApiManager";


export const AddNewTrade = (props) => {
  const [trade, setTrade] = useState({
    description: '',
    enteredUserId: 0,
    acceptedUserId: null,
    supplyTypeOfferId: 0,
    supplyTypeOfferWanted: 0,
    townId: 0
  });
 
 
  const [allTrades, setAllTrades] = useState([])
  const [supplies, setSupplies] = useState([])
  const [supplyTypes, setSupplyTypes] = useState([])
  const localSurviveUser = localStorage.getItem("survive_user")
  const surviveUserObject = JSON.parse(localSurviveUser)

  let navigate = useNavigate()

  useEffect(() => {
    getTradeOffers().then((tradeArray) => {
      setAllTrades(tradeArray)
    })

    getSupplies().then((supplyArray) => {
        setSupplies(supplyArray)
    })

    getSupplyTypes().then((supplyTypeArray) => {
        setSupplyTypes(supplyTypeArray)
    })
   
  }, [])


  const tradeSubmit = (event) => {
    event.preventDefault()

    const newTownToSendToAPI = {
      description: trade.description,
      enteredUserId: surviveUserObject.id,
      acceptedUser: surviveUserObject.id,
      supplyTypeOfferId: trade.supplyTypeOfferId,
      townId: trade.townId
      
    }
    return createNewTown(newTownToSendToAPI).then(() => {
      navigate("/towns")
    })
  }


  const updateTrade = (event) => {
    const copy = { ...town }
    if (isNaN(parseInt(event.target.value))) {
        copy[event.target.id] = event.target.value
    } else {
        copy[event.target.id] = parseInt(event.target.value)
    }   
    setTrade(copy)
  }

  const setHaggle = (event) => {
    const copy = {...trade}
    copy.haggle = (event.target.value == 'true')
    setTrade(copy)
  }


  return (
    <main style={{ textAlign: 'center' }}>
      <form className='addATown' onSubmit={updateTown}>
        <h1 className='h3 mb-3 font-weight-normal'>Add A Trade</h1>
        <fieldset>
            <div className='form-group'>
            <input
            onChange={updateTrade}
            name='Desciption'
            type='text'
            id='description'
            className='tradeDescription'
            placeholder='Description of Trade'
            required />
           </div>
           </fieldset> 
        

           <fieldset>
          <div className="form-group">
            <select required onChange={updateDistance}>
              <option>Choose Supply Type</option>

              {supplyTypes.map((supplyType) => {
                return (
                  <option key={supplyType.id} value={supplyType.id}>
                    {supplyType.type}
                  </option>
                )
              })}
            </select>
          </div>
        </fieldset>
           
           <fieldset>
           <label>Willing to haggle?
            <input type='radio' name='haggle' onChange={setHaggle} value={true} checked={
                (
                    trade.haggle == true
                )
            }></input>
           </label>
           <label>No Haggling
            <input type='radio' name='townVacancy' onChange={setHaggle} value={false} checked={
                (
                    trade.haggle == false
                )
            }></input>
           </label>
           </fieldset>
        <fieldset>
          <button type="submit" onClick={(event) => tradeSubmit(event)}>
            {" "}
            Submit New Trade Offer{" "}
          </button>
        </fieldset>
      </form>
    </main>
  )
}
