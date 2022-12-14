import { useEffect, useState } from "react";

import deckService from "../services/deck"

const RandomCard = () => {
    const [card, setCard] = useState(0)
    const [back, setBack] = useState(0)
    const [deck, setDeck] = useState(null)
    const [see, setSee] = useState(true)
    const [draw, setDraw] = useState(0)
    
    useEffect(() => {
        deckService.getCardBack()
        .then(back => 
          setBack(back)
          )
        deckService.getDeck()
        .then(deck =>
          setDeck( deck )
          )
      }, [])

    const randomCard = () => {
      const len = deck.length;
      const pickedCard = (Math.floor(Math.random() * len))
      setCard(pickedCard)
      setSee(false)
      setDraw((draw + 1))
    }

    if(!deck) return <div>loading...</div>
    else return (
        <div>
            <br/>
            { see ? <img src={back[0].iconUrl} alt="card" onClick={randomCard} /> 
            : <img src={deck[card].iconUrl} alt="card" onClick={randomCard}/> }
            <p>Press for random card! You have pressed the button {draw} times!</p>
        </div>
    )
}

export default RandomCard