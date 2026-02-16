// Task Overview:
// Create a User Card component that:
//     Accepts a user details object (name, email, age, location, picture) as prop.
//     Displays user details in a card format.
//     Conditionally renders "Adult" or "Minor" based on age.
//     Adds a button to toggle email visibility.

import React, { useState } from "react";

import {User} from './user'

function UserCard() {
   const [showEmail ,setShowEmail] = useState(false)


  return (
    <div
      style={{
        border: "1px solid black",
        padding: "20px",
        borderRadius: "8px",
        textAlign: "center",
        background:'dodgerblue'
      }}
    >
        <img src={User.picture.large}/>


        

        <h4>{User.name.first}  {User.name.last}</h4>
        <button onClick={()=>setShowEmail(true)}>Show Email</button>
        <button onClick={()=>setShowEmail(false)}>Hide Email</button>

        <h4>{showEmail && User.email}</h4>

        <h5> Age : {User.dob.age} ({User.dob.age >= 18 ? "Adult" : "Minor"})</h5>

        <h5>{User.location.city} {User.location.country}</h5>

        <h6>{User.gender}</h6>


        

        <p></p>
    </div>
  );
}

export default UserCard;
