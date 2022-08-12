import React, { useState } from "react"

import Deck from "./components/Deck"

const App = () => {
  const deck = Deck
  const [card, setCard] = useState(0)
  
  const randomCard = () => {
    const len = deck.length;
    const pickedCard = (Math.floor(Math.random() * len))
    setCard(pickedCard)
  }
  
  return (
    <div>
     <img src={deck[card].iconUrl} alt="card"></img>
     <button onClick={randomCard}>
        Random card
      </button>
    </div>
  )
}
export default App