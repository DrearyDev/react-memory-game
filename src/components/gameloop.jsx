import {useState, useRef, useEffect} from 'react'
import fetchCards from '../fetchcards.jsx'

//function shuffleCards(cards){
//    console.log(cards);
//}

function GameLoop(){
    const [gameOver, setGameOver] = useState(false);
    const [amount, setAmount] = useState(9);
    const [cards, setCards] = useState([]);

    const currentScore = useRef(0);
    const bestScore = useRef(0);

    useEffect(() => {
        let ignore = false;

        async function handleCards(){
            let tmp = await fetchCards(amount);
            setCards(tmp);
        }
        if(!ignore){ handleCards() };


        return () => {
            ignore = true;
        }
    },[amount])

    return(
        gameOver === false ?
            <>
                <h1>gameover false</h1>

                <label htmlFor='amount-select'>
                    Amount of Cards:
                    <select 
                        name="amount"
                        id='amount-select'

                        onChange={(e) => {
                            let tmp = Number(e.target.value)
                            setAmount(tmp);
                        }}
                    >
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="24">24</option>
                        <option value="52">52</option>
                    </select>
                </label>

                <button
                    onClick={()=>{
                        console.log(cards)
                    }}
                >
                    click
                </button>
            </>
        :
            <>
                <h1>gameover true</h1>
            </>
    )
}

export default GameLoop
