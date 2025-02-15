import CarsCard from "./CarsCard";


const GridVew = ({cars}) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5 md:py-12" >

        {cars.map((car) => (
          <CarsCard key={car._id} car={car}></CarsCard>
        ))}
      </div>
    );
};

export default GridVew;