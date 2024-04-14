import { CARD_STATE } from "../../lib/memory";
import { Typography } from "../atom/Typography";
import { MemoryCard } from "./MemoryCard";
import { useMemoryAction, useMemoryProvider } from "./MemoryProvider";

export const MemoryBoard = () => {
  // Memory Game - Exercise
  const { cards, flipped } = useMemoryProvider();
  const { setFlipped,} = useMemoryAction();

  const onClick = (card) => {
    setFlipped([...flipped, card]);
  };

  if (!cards) {
    return (
      <Typography variant="body2">
        An error occurs, there is no board.
      </Typography>
    );
  }

  return (
    <div className="grid grid-cols-6 grid-rows-6 gap-2 w-max">
      {cards.map((card) => (
        <MemoryCard key={card.id} card={card} onClick={onClick} >
          {card.emoji}
        </MemoryCard>
      ))}
    </div>
  );
};
