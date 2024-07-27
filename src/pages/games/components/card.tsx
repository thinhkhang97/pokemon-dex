import pokeball from "../../../assets/pokeball.png";

type Props = {
  id: number;
  imageUrl: string;
  isReveal?: boolean;
  onClick?: (id: number) => void;
};

export const Card = ({ id, imageUrl, isReveal, onClick }: Props) => {
  const handleClick = () => {
    onClick && onClick(id);
  };
  if (!isReveal) {
    return (
      <div
        onClick={handleClick}
        className="hover:bg-red-100 h-16 p-2 m-[1px] border flex items-center justify-center hover:cursor-pointer hover:-translate-y-2 transition-all"
      >
        <img src={pokeball} />
      </div>
    );
  }
  return (
    <div
      onClick={handleClick}
      className="h-16 p-2 m-[1px] border flex items-center justify-center hover:cursor-pointer"
    >
      <img src={imageUrl} className="h-[100%]" />
    </div>
  );
};
