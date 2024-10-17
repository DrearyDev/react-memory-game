//
const URL = {
    deckID: false,
    link: 'https://www.deckofcardsapi.com/api/deck/',
    newDeck: () => URL.link + 'new/shuffle/?deck_count=1',
    drawCards: (amount) => URL.link + URL.deckID + '/draw/?count=' + amount,
    shuffleCards: () => URL.link + URL.deckID + '/shuffle/'
};

function fetchCards(amount){
    function getDeck(){//get new deck
        return fetch(URL.newDeck())
            .then(res => res.json())
            .then(data => {
                URL.deckID = data.deck_id;
            })
            .catch(err => console.log(err))
    }

    function getCards(){//draw cards from deck
        return fetch(URL.drawCards(amount))
            .then(res => res.json())
            .then(data => data.cards)
            .catch(err => console.log(err))
    }

    function shuffleCards(){//re-add cards to deck and shuffle
        return fetch(URL.shuffleCards())
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err))
    }

    if(!URL.deckID){
        return getDeck()
            .then(() => {
                return getCards()
            })
            .catch(err => console.log(err))
    } else {
        return shuffleCards()
            .then(() => {
                return getCards()
            })
            .catch(err => console.log(err))
    }
}

export default fetchCards
