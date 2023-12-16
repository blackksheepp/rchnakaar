import React from "react";
import { PageTransitionLayout } from "@/layouts/PageTransitionLayout";

const Cart = ({
  showCart,
  onClick,
}: {
  showCart: boolean;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <PageTransitionLayout animate={showCart}>
      <div className="grunge_overlay opacity-70"></div>
      <div className="w-full h-screen flex items-center justify-between">
        <div className="z-10 w-full flex flex-col items-center justify-between gap-5 mx-auto inset-x-0 max-w-max">
          <p className=" text-accent font-retro dropshadow text-lg">
            Whoooooooshhh! Empty.
          </p>
          <button className="btn w-bw h-bh font-retro text-black" onClick={onClick}>
            CLOSE
          </button>
        </div>
      </div>
    </PageTransitionLayout>
  );
};

export default Cart;

