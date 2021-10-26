import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./Card";


function Deck() {
  const [deck, setDeck] = useState(null);
  const [currentCard, drawCard] = useState(null);

  useEffect(async () => {
    async function getDeck() {
        const deckData = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        const cardsData = await axios.get(`http://deckofcardsapi.com/api/deck/${deckData.data.deck_id}/draw/?count=52`)
        const deck = cardsData.data.cards.map(card => [`${card.value} of ${card.suit}`, card.image])
        setDeck(deck)
    }
    getDeck()
  }, [])

  function nextCard(){
      const nextCard = deck.pop()
      if (nextCard == undefined) {
          drawCard("You're out of cards!")
      } else {
        drawCard(<Card card={nextCard[0]} image={nextCard[1]}/>)}
  }

  return (
      <div>
        {currentCard}
        <br/>
        <button onClick={nextCard}>Draw Card</button>
      </div>
  )
}

export default Deck;