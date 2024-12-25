import Banner from "../components/Banner";
import Carousel from "../components/Carousel";
import ChooseUs from "../components/ChooseUs";
import Discount from "../components/Discount";
import ListedCars from "../components/ListedCars";
import OurRevenue from "./OurRevenue";


const Home = () => {
    return (
        <div>
          <Banner></Banner>
          <ChooseUs></ChooseUs>
          <ListedCars></ListedCars>
          <Carousel></Carousel>
         <Discount></Discount>
         <OurRevenue></OurRevenue>
        </div>
    );
};

export default Home;