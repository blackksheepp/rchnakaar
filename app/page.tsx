"use client";

import React from "react";
import { useState } from "react";

import Cart from "@/components/Cart";

import Navbar from "./_containers/home/navbar";
import Hero from "./_containers/home/hero";
import CTA from "./_containers/home/cta";

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
