import { Outlet, Route, Routes } from 'react-router-dom'
import { ZombieSighting } from '../zombies/ZombieSightingList'

export const Homepage = () => {
    return ( <>
        <marquee>Click Zombie Sightings for the Latest News!</marquee>
        <Routes>
            <Route path='/' element={
                <>
                <h1>Survive</h1>
                <div className='big_box'>
                <section className='zombie_sightingBox'>
                    <ZombieSighting disableAddButton={true}/>
                </section>
                <section className='tradeOffers'>
                    Displays Running Trade Offers
                </section>
                </div>
                <div className='small_box'>
                    <section className='smallZombieBox'>
                        Zombie Sighting clickable box
                    </section>
                    <section className='myTown'>
                        My town clickable box
                    </section>
                    <section className='Routes'>
                        Map clickable box
                    </section>
                    <section className='TradeOfferings'>
                        Trade offers clickable box
                    </section>
                    <section className='NationalParks'>
                        Parks clickable box
                    </section>

                </div>

               
                </>
            }>

            </Route>
            

            
        </Routes>
        </>
    )
}