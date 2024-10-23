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

function GameLoop(){
    const [gameOver, setGameOver] = useState(false);
    const [amount, setAmount] = useState(9);
    const [cards, setCards] = useState([]);

    const currentScore = useRef(0);
    const bestScore = useRef(0);
    const clickedCards = useRef([]);

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

                <div className="buttons-container">
                    <button
                        onClick={()=>{
                            console.log(cards)
                        }}
                    >
                        log cards
                    </button>

                    <button
                        onClick={() => {
                            let tmp = shuffleCards(cards);
                            setCards(tmp);
                        }}
                    >
                        shuffle cards
                    </button>
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
                                                setGameOver(true)
                                            } else if(clickedCards.current.size === 8){
                                                clickedCards.current.add(card.code);
                                                setGameOver(true)
                                            } else {
                                                clickedCards.current.add(card.code);
                                                console.log(clickedCards.current);

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
                <div>
                    <p>cards length: {cards.length}</p>
                    <p>clicked cards: {clickedCards.current.size}</p>
                </div>

                <button
                    onClick={()=>{
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
