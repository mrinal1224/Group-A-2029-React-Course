import { useContext } from "react";
import { ParkContext } from "./ParkContext";

function Child1() {
  const { rollerCoaster, ticketForRollerCoaster } = useContext(ParkContext);

  return (
    <div className="children">
      Child1 {rollerCoaster} {ticketForRollerCoaster()}
    </div>
  );
}

export default Child1;
