import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import ChooseUs from "../components/ChooseUs";
import Discount from "../components/Discount";
import ListedCars from "../components/ListedCars";


const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <ChooseUs></ChooseUs>
          <ListedCars></ListedCars>
          <Carousel></Carousel>
         <Discount></Discount>
        </div>
    );
};

export default Home;