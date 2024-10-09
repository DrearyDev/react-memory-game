import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import GameLoop from './components/gameloop.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <GameLoop/>
  </StrictMode>,
)

/*

How the game works:
Multiple unique cards are displayed. When player clicks a card, the cards shuffle.
The player must click another card that isnt one of the already clicked cards. This
repeats until player fails or gets the highest possible score (clicks all cards once).
There will be a dropdown that lets the player choose the amount of cards to play with.
The score is incremented by one each successful card choice. The best score achieved by
the player out of all different 'amounts' will be shown alongside the current score.


Requirements:
- currentScore
    - if currentScore === amount then thats the highest score possible. Display a message
    to the player saying they won.
    - resets to 0 if amount is changed
- bestScore
    - best score of all time. Dont refresh if amount is changed.

- dropdown to choose amount of cards to play with
    - 9, 12, 24, 42, 52

- fetch deck from deckofcardsapi.com
    - use deck with amount variable from dropdown to draw cards
    - shuffle and redraw cards from the same deck when amount is changed

- function to shuffle and display the cards drawn from the deck
    - call this each time player clicks a card


------------- just thinking... (this code might not work) -------------

Card({image, code}){
    //display the image passed in and use the code as the alt
}

shuffleCards(cards){
    //cards should be an array of cards. shuffle this array and return it.
}

cardClicked(card){
    let clickedCards = new Set()

    if(clickedCards.has(card.code)) {
        return false
    } else {
        clickedCards.add(card.code)
        return true
    }
}

GameLoop(){
    const [gameOver, setGameOver] = useState(false);
    const [amount, setAmount] = useState(9)// a dropdown with different sizes to play with
    const [cards, setCards] = useState(fetchCards(amount));
    const currentScore = useRef(0)
    const bestScore = useRef(0)

    return(
        // if gameOver is false
            // dropdown to select amount
            // display cards by maping cards constant and returning <Card/> components
            // clicking a card will invoke cardClicked(card)
                // if cardClicked(card) is true
                    // increment currentScore
                    // if currentScore > bestScore
                        // bestScore = currentScore;
                    // call setCards(shuffleCards(cards))
                // if cardClicked(card) is false
                    // setGameOver(true); 
            // if currentScore === amount
                // setGameOver(true);
        // if gameOver is true
            // if currentScore !== amount
                // display card that was clicked twice
                // display cards that werent clicked yet
                // display a playAgain? button that calls setGameOver(false) on click
            // if currentScore === amount
                // congratulate the player for winning
    )
}

fetchCards(amount){
    const deckID = useEffect(() => {
        return fetchData(https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1).deck_id;
    },[]);

    const cards = useEffect(() => {
        fetchData(https://www.deckofcardsapi.com/api/deck/{deckID}/shuffle);
        return fetchData(https://www.deckofcardsapi.com/api/deck/{deckID}/draw/?count={amount});
    },[amount]);

    return cards;
}

fetchData(link){ //fetch data using javascript fetch() method, clean it, and return it
}

--- ---

*/
