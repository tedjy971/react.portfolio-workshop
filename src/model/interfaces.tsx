export interface CardInterface {
  id: string;
  emoji: string;
  state: string;
}

export interface MemoryStateInterface {
  cards: CardInterface[];
  flipped: CardInterface[];
  solved: number[];
  disabled: boolean;
}
