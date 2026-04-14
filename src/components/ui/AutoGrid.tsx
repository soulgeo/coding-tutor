interface AutoGridProps {
  items: React.ReactNode[]; 
}

const AutoGrid = ({ items }: AutoGridProps) => {
  return (
    <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full">
      {items.map((item, index) => (
        <div key={index} className="p-4 bg-base-100 rounded shadow min-h-40">
          {item}
        </div>
      ))}
    </div>
  );
};

export default AutoGrid;
