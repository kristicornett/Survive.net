import { Outlet, Route, Routes } from 'react-router-dom'
import { ZombieSighting } from '../zombies/ZombieSightingList'
import { ZombieSightingForm } from '../zombies/ZombieSightingForm'
import './Application.css'
import { Homepage } from './Homepage'
import { TownList } from '../towns/TownList'
import { AddATown } from '../towns/AddATownForm'
import { UpdateZombieSightingForm } from '../zombies/UpdateZombieSightingStatus'
import { TradeOffersList } from '../tradeoffers/TradeOffersList'


export const ApplicationViews = () => {
    return ( <>
       
        <Routes>
           

           
            <Route path='/' element={ <Homepage /> } />
            <Route path='/zombies' element={<ZombieSighting />} />
            <Route path='/zombies/add' element={ <ZombieSightingForm /> } />
            <Route path='/trades' element={<TradeOffersList/>} />
            <Route path='/towns' element={<TownList/>} />
            <Route path='/towns/add' element={<AddATown/>} />
            <Route path='/zombies/:sightingId/status' element={<UpdateZombieSightingForm/>} />
            
            
        </Routes>
        </>
    )
}