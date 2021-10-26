import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";


function Deck() {
  const [deck, setDeck] = useState(null);
  const [currentCard, drawCard] = useState(null);
  const [autoDraw, setAutoDraw] = useState(false)
  const [intervalId, setIntervalId] = useState(0)


  useEffect(async () => {
    async function getDeck() {
        console.log("executing getdeck")
        const deckData = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        const cardsData = await axios.get(`http://deckofcardsapi.com/api/deck/${deckData.data.deck_id}/draw/?count=52`)
        const deck = cardsData.data.cards.map(card => [`${card.value} of ${card.suit}`, card.image])
        setDeck(deck)
    }
    getDeck()
  }, [])

  useEffect(async () => {
      if (autoDraw == true){
        console.log("hitting one line before the set interval")
        const interval = setInterval(() => {
            nextCard();
          }, 1000)
        setIntervalId(interval)
      } else {
        console.log(autoDraw, "THIS IS AUTODRAW", intervalId)
          clearInterval(intervalId)
      }
  }, [autoDraw])

  function nextCard(){
      console.log("executing nextcard")
      const nextCard = deck.pop()
      if (nextCard == undefined) {
          drawCard("You're out of cards!")
      } else {
        drawCard(<Card card={nextCard[0]} image={nextCard[1]}/>)}
  }

  function changeAuto(){
      console.log("executing change auto")
      setAutoDraw(draw => !draw)
  }

  return (
      <div>
        {currentCard}
        <br/>
        <button onClick={changeAuto}>Draw Card</button>
      </div>
  )
}

export default Deck;