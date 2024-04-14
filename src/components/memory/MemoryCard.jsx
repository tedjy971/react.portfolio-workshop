import clsx from "clsx";
import styles from "./MemoryCard.module.css";
import { CARD_STATE } from "../../lib/memory";

export const MemoryCard = ({ children, card, onClick }) => {
  const isReturned =
    card.state === CARD_STATE.RETURNED || card.state === CARD_STATE.FIND;
    
  return (
    <div className="relative" onClick={() => { card.state == CARD_STATE.HIDE && onClick?.(card)}}>
      <button
        className={clsx(
          styles.transition,
          "rounded border-primary bg-secondary p-0.5",
          {
            [clsx("!bg-red-400", styles.rotate)]: !isReturned,
            [clsx("!bg-green-400", styles.bounce)]:
              card.state === CARD_STATE.FIND,
          }
        )}
      >
        <span className="block p-3 rounded bg-paper">{children}</span>
      </button>
      <button
        style={{ backfaceVisibility: "hidden" }}
        className={clsx(
          styles.transition,
          "absolute inset-0 flex rounded border-2 border-primary bg-paper p-3",
          {
            [styles.rotate]: isReturned,
          }
        )}
      >
        {/* ❓Memory Game - Exercise */}
      </button>
    </div>
  );
};
