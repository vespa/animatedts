interface CharSpriteProps {
  running: boolean;
}

export const CharSprite = ({ running }: CharSpriteProps) => (
  <div>{running.toString()}</div>
);

export default CharSprite;
