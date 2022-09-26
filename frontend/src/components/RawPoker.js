import { useEffect, useState } from "react";
import deckService from "../services/deck"
import WinningTable from "./WinningTable";

const RawPoker = () => {
    const [card1, setCard1] = useState([])
    const [card2, setCard2] = useState([])
    const [card3, setCard3] = useState([])
    const [card4, setCard4] = useState([])
    const [card5, setCard5] = useState([])
    const [back, setBack] = useState(null)
    const [deck, setDeck] = useState(null)
    const [see1, setSee1] = useState(true)
    const [see2, setSee2] = useState(true)
    const [see3, setSee3] = useState(true)
    const [see4, setSee4] = useState(true)
    const [see5, setSee5] = useState(true)
    const [lock1, setLock1] = useState(true)
    const [lock2, setLock2] = useState(true)
    const [lock3, setLock3] = useState(true)
    const [lock4, setLock4] = useState(true)
    const [lock5, setLock5] = useState(true)
    const [result, setResult] = useState(false)
    const [draw, setDraw] = useState(0)
    const [betValue, setBetValue] = useState(1)
    const [balance, setBalance] = useState(100)
    const [betLocked, setBetLocked] = useState(true)
    
    
    useEffect(() => {
        deckService.getCardBack()
        .then(back => 
          setBack(back)
          )
        deckService.getDeck()
        .then(deck =>
          setDeck(deck)
          ) 
      }, [])
    
    const MAX = balance
    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(betValue * 100) / MAX}% 100%`,
        };
    };

    const randomCard1 = () => {
        const len = deck.length;
        const pickedCard = (Math.floor(Math.random() * len))
        console.log("random:", pickedCard)
        setCard1(deck[pickedCard])
        setSee1(false)
        deck.splice(pickedCard, 1)
        setDeck(deck)
        console.log("deck", deck)
    }

    const randomCard2 = () => {
        const len = deck.length;
        const pickedCard = (Math.floor(Math.random() * len))
        console.log("random:", pickedCard)
        setCard2(deck[pickedCard])
        setSee2(false)
        deck.splice(pickedCard, 1)
        setDeck(deck)
        console.log("deck", deck)
    }

    const randomCard3 = () => {
        const len = deck.length;
        const pickedCard = (Math.floor(Math.random() * len))
        console.log("random:", pickedCard)
        setCard3(deck[pickedCard])
        setSee3(false)
        deck.splice(pickedCard, 1)
        setDeck(deck)
        console.log("deck", deck)
    }

    const randomCard4 = () => {
        const len = deck.length;
        const pickedCard = (Math.floor(Math.random() * len))
        console.log("random:", pickedCard)
        setCard4(deck[pickedCard])
        setSee4(false)
        deck.splice(pickedCard, 1)
        setDeck(deck)
        console.log("deck", deck)
    }

    const randomCard5 = () => {
        const len = deck.length;
        const pickedCard = (Math.floor(Math.random() * len))
        console.log("random:", pickedCard)
        setCard5(deck[pickedCard])
        setSee5(false)
        deck.splice(pickedCard, 1)
        setDeck(deck)
        console.log("deck", deck)
    }

    const deal = () => {
        if(!lock1){
            randomCard1()
            setLock1(true)
        }
        if(!lock2){
            randomCard2()
            setLock2(true)
        }
        if(!lock3){
            randomCard3()
            setLock3(true)
        }
        if(!lock4){
            randomCard4()
            setLock4(true)
        }
        if(!lock5){
            randomCard5()
            setLock5(true)
        }
        setResult(true)
        setDraw((draw + 1))
        setBalance(balance - betValue)
    }

    const reset = () => {
        deckService.getDeck()
        .then(deck =>
          setDeck(deck)
          ) 
        setLock1(true)
        setLock2(true)
        setLock3(true)
        setLock4(true)
        setLock5(true)
        setSee1(true)
        setSee2(true)
        setSee3(true)
        setSee4(true)
        setSee5(true)
        setResult(false)
        setBetLocked(true)
    }

    const image = {
        width: 225,
        height: 300,
        }
    
    console.log("lock1",lock1,"lock2",lock2,"lock3",lock3,"lock4",lock4,"lock5",lock5)
    if(!deck) return <div>loading...</div>
    else return (
        <div>
            <p>Balance: {balance} €</p>
            <p>You have played {draw} hands</p>
            {result ? 
            <>  <WinningTable card1={card1} card2={card2} card3={card3} card4={card4} card5={card5}
                 betValue={betValue} setBetValue={setBetValue} balance={balance} setBalance={setBalance} reset={reset} MAX={MAX} />

                <img src={card1.iconUrl} style={image} alt="card" />
                <img src={card2.iconUrl} style={image} alt="card" />
                <img src={card3.iconUrl} style={image} alt="card" />
                <img src={card4.iconUrl} style={image} alt="card" />
                <img src={card5.iconUrl} style={image} alt="card" />
                
            </>
            : <>{betLocked ? <>
            
                <button onClick={()=>setBetLocked(false)}>Lock</button>   
                <p>
                Bet : {betValue} <input type="range" min="0" max={MAX} onChange={(e) => setBetValue(e.target.value)} style={getBackgroundSize()} value={betValue}/> 
                </p> 
                <p>Place a bet.</p>
             </> : <>
                <button onClick={deal}>Deal</button>    
                <br/>  
                <p>Open cards by pressing them and hide them pressing again. Change cards that is hidden by pressing deal.</p>

                { see1 ? <img src={back[0].iconUrl} style={image} alt="card" onClick={randomCard1} /> 
                : lock1 ? <img src={card1.iconUrl} style={image} alt="card" onClick={()=>setLock1(false)} />
                : <img src={back[0].iconUrl} style={image} alt="card" onClick={()=>setLock1(true)}/> }

                { see2 ? <img src={back[0].iconUrl} style={image} alt="card" onClick={randomCard2} /> 
                : lock2 ? <img src={card2.iconUrl} style={image} alt="card" onClick={()=>setLock2(false)} />
                : <img src={back[0].iconUrl} style={image} alt="card" onClick={()=>setLock2(true)}/> }

                { see3 ? <img src={back[0].iconUrl} style={image} alt="card" onClick={randomCard3} /> 
                : lock3 ? <img src={card3.iconUrl} style={image} alt="card" onClick={()=>setLock3(false)} />
                : <img src={back[0].iconUrl} style={image} alt="card" onClick={()=>setLock3(true)}/> }

                { see4 ? <img src={back[0].iconUrl} style={image} alt="card" onClick={randomCard4} /> 
                : lock4 ? <img src={card4.iconUrl} style={image} alt="card" onClick={()=>setLock4(false)} />
                : <img src={back[0].iconUrl} style={image} alt="card" onClick={()=>setLock4(true)}/> }

                { see5 ? <img src={back[0].iconUrl} style={image} alt="card" onClick={randomCard5} /> 
                : lock5 ? <img src={card5.iconUrl} style={image} alt="card" onClick={()=>setLock5(false)} />
                : <img src={back[0].iconUrl} style={image} alt="card" onClick={()=>setLock5(true)}/> }

            </>
            }
            </>
            }
        </div>
    )
}

export default RawPoker