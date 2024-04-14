import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { CARD_STATE, getInitialMemory } from "../../lib/memory";

const memoryContextValue = createContext();
const memoryContextAction = createContext();

export const MemoryContextProvider = ({ children }) => {
  const [numberTry, setNumberTry] = useState(0);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [cards, setCards] = useState(getInitialMemory());
  const FIND_TIMER = 5000;
  const updateCard = (card) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === card.id) {
          return card;
        }
        return c;
      })
    );
  };
  const timerRef = useRef(null);

  useEffect(() => {
    const [firstCard, secondCard] = flipped;

    if (flipped.length === 1) {
      firstCard.state = CARD_STATE.RETURNED;
      updateCard(firstCard);
      timerRef.current = setTimeout(() => {
        setFlipped([]);
        firstCard.state = CARD_STATE.HIDE;

        updateCard(firstCard);
      }, FIND_TIMER);
    }

    if (flipped.length === 2) {
      setDisabled(true);
      clearTimeout(timerRef.current);
      secondCard.state = CARD_STATE.RETURNED;
      updateCard(secondCard);

      setTimeout(() => {
        if (firstCard.emoji === secondCard.emoji) {
          setSolved([...solved, firstCard.id, secondCard.id]);
          firstCard.state = CARD_STATE.FIND;
          secondCard.state = CARD_STATE.FIND;
          updateCard(firstCard);
          updateCard(secondCard);
        } else {
          firstCard.state = CARD_STATE.HIDE;
          secondCard.state = CARD_STATE.HIDE;
          updateCard(firstCard);
          updateCard(secondCard);
        }

        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
          
        }, 300);

      }, 500);

      setNumberTry((prev) => prev + 1);
    }
  }, [flipped, solved]);

  const memoryState = {
    cards: cards,
    flipped: flipped,
    solved: solved,
    disabled: disabled,
    numberTry: numberTry,
  };

  const memoryAction = {
    setFlipped,
    setDisabled,
    resetGame,
    setNumberTry,
  };

  const resetGame = () => {
    setFlipped([]);
    setSolved([]);
    setDisabled(false);
    setCards(getInitialMemory());
    setNumberTry(0);
  };

  return (
    <memoryContextValue.Provider value={memoryState}>
      <memoryContextAction.Provider value={memoryAction}>
        {children}
      </memoryContextAction.Provider>
    </memoryContextValue.Provider>
  );
};

export const useMemoryProvider = () => {
  const context = useContext(memoryContextValue);
  if (!context) {
    throw new Error("useMemoryProvider must be used within a MemoryProvider");
  }
  return context;
};

export const useMemoryAction = () => {
  const context = useContext(memoryContextAction);
  if (!context) {
    throw new Error("useMemoryAction must be used with^in a MemoryProvider");
  }
  return context;
};
