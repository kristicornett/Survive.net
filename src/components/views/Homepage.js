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
                <div>
                <a href='http://localhost:3000/zombies'>
                <section className='zombie_sightingBox'>
                    <ZombieSighting disableAddButton={true}/>
                </section>
                </a>
                </div>

                <div>
                <a href='http://localhost:3000/trades'>
                <section className='tradeOffers'>
                    Displays Running Trade Offers
                </section>
                </a>
                </div>
                </div>

                <div className='small_box'>
                    <a href='http://localhost:3000/zombies'>
                    <section className='smallZombieBox'>
                        Zombie Sighting clickable box
                    </section>
                    </a>

                    <a href='http://localhost:3000/towns'>
                    <section className='myTown'>
                        My town clickable box
                    </section>
                    </a>
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