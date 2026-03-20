import { useContext } from "react";
import { ParkContext } from "./ParkContext";



function Child2() {
  const { waterSlide , ticketforWaterSlide} =  useContext(ParkContext)



  return (
    <div className="children">
      Child2 {waterSlide} {ticketforWaterSlide()}
    </div>
  );
}

export default Child2;
