import { useEffect, useState } from 'react'
import { getTradeOffers } from '../ApiManager'
import { useNavigate } from 'react-router-dom'


export const TradeOffersList = () => {
    const [trades, setTrades] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
           refreshTrades()
        },
        []
    )

    const deleteTrade = (event, tradeId) => {
        event.preventDefault()

        deleteTrade(tradeId)
        .then((data) => refreshTrades())
    }

    const refreshTrades = () => {
            getTradeOffers()
            .then((tradeArray) => {
                setTrades(tradeArray)
            })
    }
        return <>
        <h2>Trade Offers</h2>
        <button type="submit" className='trade__button' onClick={() => navigate('/trades/add')}> Add A Trade </button>
        <article className="tradeOffers_List">
            {
                trades.map(
                    (trade) => {
                        return <section key={`trade--${trade.id}`}>
                            <div className='trade'>{trade.description}<button>Accept Trade</button><button id='delete_town' onClick={(event) => deleteTrade(event, trade.id)}>X</button></div>
                        </section>
                    }
                )
            }
        </article>
        </>
}

