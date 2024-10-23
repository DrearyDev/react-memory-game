import {useState, useRef, useEffect} from 'react'
import fetchCards from '../fetchcards.jsx'
import Card from './card.jsx'

function shuffleCards(cards){
    let cardsCopy = cards.slice();
    let shuffledCards = [];

    while(cardsCopy.length > 0){
        const randomIndex = Math.floor(Math.random() * cardsCopy.length)

        shuffledCards.push(cardsCopy[randomIndex]);

        cardsCopy = cardsCopy.filter(card => {
            return card !== cardsCopy[randomIndex];
        })
    }

    return shuffledCards;
}

function trackScore(currentScore, bestScore){
    currentScore.current++;
    if(currentScore.current > bestScore.current){
        bestScore.current = currentScore.current;
    }
}

function GameLoop(){
    const [gameOver, setGameOver] = useState(false);
    const [amount, setAmount] = useState(9);
    const [cards, setCards] = useState([]);

    const currentScore = useRef(0);
    const bestScore = useRef(0);
    const clickedCards = useRef([]);

    const amountOptions = [9,12,16,24,52];

    async function handleCards(){
        let tmp = await fetchCards(amount);
        setCards(tmp);
    }

    useEffect(() => {
        let ignore = false;

        if(!ignore){
            clickedCards.current = new Set();
            handleCards();
        };

        return () => {
            ignore = true;
        }
    },[amount])

    return(
        gameOver === false ?
            <>
                <h3 className="instruction">Dont click the same card twice!</h3>
                
                <label htmlFor='amount-select'>
                    Amount of Cards:
                    <select 
                        name="amount"
                        id='amount-select'
                        defaultValue={amount}

                        onChange={(e) => {
                            let tmp = Number(e.target.value)
                            setAmount(tmp);
                        }}
                    >
                        {
                            amountOptions.map(opt => {
                                return(
                                    <option key={opt} value={opt}>{opt}</option>
                                )
                            })
                        }
                    </select>
                </label>

                <div className="scores">
                    <p>Current Score: {currentScore.current}</p>
                    <p>Best Score: {bestScore.current}</p>
                </div>

                <div className="cards-container">
                    {
                        cards[0] ?
                            cards.map(card => {
                                return(
                                    <Card
                                        key={card.code}
                                        card={card}
                                        clickedCards={clickedCards.current}
                                        onClick={()=>{
                                            if(clickedCards.current.has(card.code)){
                                                setGameOver(true);
                                            } else if(clickedCards.current.size === 8){
                                                trackScore(currentScore, bestScore);
                                                clickedCards.current.add(card.code);
                                                setGameOver(true);
                                            } else {
                                                clickedCards.current.add(card.code);
                                                trackScore(currentScore, bestScore);
                                                let tmp = shuffleCards(cards)
                                                setCards(tmp)
                                            }
                                        }}
                                    />
                                )
                            })
                        : 'loading...'
                    }
                </div>
            </>
        :
            <>
                {
                    clickedCards.current.size === cards.length ?

                        <h1>You Won!!</h1>
                    :
                        <h1>You Lost!!</h1>
                }
                <div className="scores">
                    <p>Current Score: {currentScore.current}</p>
                    <p>Best Score: {bestScore.current}</p>
                </div>

                <div>
                    <p>cards length: {cards.length}</p>
                    <p>clicked cards: {clickedCards.current.size}</p>
                </div>

                <button
                    onClick={()=>{
                        currentScore.current = 0;
                        clickedCards.current = new Set();
                        handleCards();
                        setGameOver(false);
                    }}
                >
                    Play Again
                </button>
            </>
    )
}

export default GameLoop
