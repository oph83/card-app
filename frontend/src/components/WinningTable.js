import { useEffect, useState } from "react"

const WinningTable = ( {card1, card2, card3, card4, card5, betValue, balance, setBalance, reset, setBetValue, MAX} ) => {
    const [resultTable, setResultTable] = useState(0)
    const [straight, setStraight] = useState(false)
    const [color, setColor] = useState(false)
    const [fullHouse, setFullHouse] = useState(false)
    const [twoPairs, setTwoPairs] = useState(false)
    
    
    const hand = [card1, card2, card3, card4, card5]
    
    console.log("hand:", hand)

    const checkColor = () => {
        const result = hand.every((element) => {
            if (element.color === hand[0].color) {
                return true
            }
        });
        if(result === true) {
        setColor(true)
        }
        return result;
    }

    const checkStraight = () => {
        const numbers = hand.map(h => h.number)
        const includesAll = (arr, values) => values.every(v => arr.includes(v))
        if(includesAll(numbers, [14,2,3,4,5])) {
            setStraight(true)
        }
        if(includesAll(numbers, [2,3,4,5,6])) {
            setStraight(true)
        }
        if(includesAll(numbers, [3,4,5,6,7])) {
            setStraight(true)
        }
        if(includesAll(numbers, [4,5,6,7,8])) {
            setStraight(true)
        }
        if(includesAll(numbers, [5,6,7,8,9])) {
            setStraight(true)
        }
        if(includesAll(numbers, [6,7,8,9,10])) {
            setStraight(true)
        }
        if(includesAll(numbers, [7,8,9,10,11])) {
            setStraight(true)
        }
        if(includesAll(numbers, [8,9,10,11,12])) {
            setStraight(true)
        }
        if(includesAll(numbers, [9,10,11,12,13])) {
            setStraight(true)
        }
        if(includesAll(numbers, [10,11,12,13,14])) {
            setStraight(true)
        }
    }

    const counter = hand.reduce((acc, o) => {
        acc[o.number] = acc[o.number] + 1 || 1;
        return acc
      }, {})
      
    const four = Object.values(counter).includes(4);
    const three = Object.values(counter).includes(3);
    const two = Object.values(counter).includes(2);

    console.log('four', four)
    console.log('three', three)
    console.log('two', two)

    const checkForPairs = () => {
        const numbers = hand.map(h => h.number)
        const set = new Set(numbers);

        const duplicates = numbers.filter(item => {
            if (set.has(item)) {
            set.delete(item);
            } else {
            return item;
            }
        });
        if(duplicates.length >= 2) {
            setTwoPairs(true)
        }
   
    console.log('pair', duplicates);
    }

    const winTable = [
        {
            message: 'No win, better luck next time sucker!',
            payout: 0
        },
        {
            message: 'Pair! You win 1x bet',
            payout: 1
        },
        {
            message: 'Two Pairs! You win 3x bet',
            payout: 3
        },
        {
            message: 'Threes! You win 4x bet',
            payout: 4
        },
        {
            message: 'Straight! You win 7x bet',
            payout: 7
        },
        {
            message: 'Color! You win 8x bet',
            payout: 8
        },
        {
            message: 'Full House! You win 15x bet',
            payout: 15
        },
        {
            message: 'FOUR OF THE SAME! You win 30x bet',
            payout: 30
        },
        {
            message: 'Flush, congratulations! You win 50x bet',
            payout: 50
        },
    ]

    const payout = () => {
        if(two) {
            setResultTable(1)
        }
        if(twoPairs) {
            setResultTable(2)
        }
        if(three) {
            setResultTable(3)
        }
        if(straight) {
            setResultTable(4)
        }
        if(color) {
            setResultTable(5)
        }
        if(two && three) {
            setFullHouse(true)
        }
        if(fullHouse) {
            setResultTable(6)
        }
        if(four) {
            setResultTable(7)
        }
        if(straight && color) {
            setResultTable(8)
        }
    }
   
    useEffect(() => {
        checkColor()
        checkForPairs()
        checkStraight()
        payout()
    })
    
    console.log('color', color)
    console.log('straight', straight)
    console.log('2 pairs', twoPairs)
    console.log('fullhouse', fullHouse)

    const result = Number(betValue) * Number(winTable[resultTable].payout)
    
    return(
        <div>
            
            <p><input
                type="button"
                onClick={()=> { 
                    setBalance(balance + result)
                    reset()
                    setBetValue(MAX)
                }}
                value="Collect"
            ></input> Payout: {result} </p> 
             <p>{winTable[resultTable].message} </p>
            
        </div>
    )
}

export default WinningTable