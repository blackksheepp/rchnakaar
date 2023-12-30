"use client";

import React from "react";
import { useState } from "react";

import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import CTA from "./Components/CTA";
import Cart from "./Components/Cart";


const HomePage = () => {
  var [cart, setCart] = useState(false);
 
  return (
    <div className="overflow-x-hidden">
      <div className={`absolute  w-full ${cart ? "blur-lg" : "blur-none"}`}>
        <Navbar onClick={() => setCart(!cart)}/>
        <div className="md:flex md:flex-row">
          <Hero />
          <CTA />
        </div>
      </div>
      {/* CART */}
      <Cart onClick={() => setCart(!cart)} showCart={cart} />
    </div>
  );
};

export default HomePage;
