interface CardProps {
  title: string;
  text: string;
}

const Card = ({ title, text }: CardProps) => {
  return (
    <div className="bg-neutral-200 rounded-2xl shadow w-lg p-5">
      <h3 className="font-bold text-lg">{title}</h3>
      <p>{text}</p>
    </div>
  )
}
export default Card
