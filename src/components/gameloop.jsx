import {useState, useRef} from 'react'

function GameLoop(){
    const [gameOver, setGameOver] = useState(false);
    const [amount, setAmount] = useState(9);
    //const [cards, setCards] = useState(fetchCards(amount));
    const currentScore = useRef(0);
    const bestScore = useRef(0);

    return(
        gameOver === false ?
            <>
                <h1>gameover false</h1>
            </>
        :
            <>
                <h1>gameover true</h1>
            </>
    )
}

export default GameLoop
