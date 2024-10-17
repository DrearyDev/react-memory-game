//

function Card({card, clickedCards, onClick}){
    return(
        <div
            className="card"
            onClick={()=> onClick()}
        >
            <img
                src={card.image}
                alt={card.value + ' ' + card.suit}
            />
        </div>
    )
}

export default Card
