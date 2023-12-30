"use client";
import { NextComponentType } from "next";
import { ComponentProps } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { verifyPassword } from "@/app/actions";

const withAuth = (Component: NextComponentType) => {
  const Auth = (props: ComponentProps<any>) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>("");
    const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean | null>(
      null
    );

    const handlePasswordSubmit = async () => {
      setIsPasswordCorrect(await verifyPassword(password));
    };

    useEffect(() => {
      document.addEventListener("keydown", (event) => {
        if (event.key == "Enter") {
          handlePasswordSubmit();
        }
      });

      return () => {
        document.removeEventListener("keydown", (event) => {
          if (event.key == "Enter") {
            handlePasswordSubmit();
          }
        });
      };
    });
    return isPasswordCorrect === null ? (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="shadow-[4px_4px_0px_0px_rgba(70,70,70)] md:shadow-[5px_5px_0px_0px_rgba(70,70,70)] lg:shadow-[6px_6px_0px_0px_rgba(70,70,70)] w-admw h-admh border-2 md:border-3 lg:border-4 border-accent mx-auto inset-x-0 flex flex-col items-center justify-center gap-3 md:gap-4 lg:gap-4 mb-admp ">
          <p className=" text-accent font-retro text-adminlogin mx-auto inset-x-0 max-w-max">
            Enter the Password.
          </p>
          <div className="bg-accent admin-login w-pwdw h-pwdh flex flex-row justify-between items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="bg-accent placeholder:text-gray-500 text-black font-retro text-password ml-[10px] pb-[2px] outline-none overflow-hidden whitespace-nowrap mr-[10px]"
            />
            <div
              className="mr-[10px]"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <Image
                  src="/img/hide.svg"
                  alt="show"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-4 md:w-6 lg:w-7 h-auto"
                />
              ) : (
                <Image
                  src="/img/show.svg"
                  alt="show"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="mb-[1px] w-4 md:w-6 lg:w-7 h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    ) : isPasswordCorrect ? (
      <Component />
    ) : (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="shadow-[4px_4px_0px_0px_rgba(70,70,70)] md:shadow-[5px_5px_0px_0px_rgba(70,70,70)] lg:shadow-[6px_6px_0px_0px_rgba(70,70,70)] w-admw h-admh border-2 md:border-3 lg:border-4 border-accent mx-auto inset-x-0 flex flex-col items-center justify-center gap-3 md:gap-4 lg:gap-4 mb-admp ">
          <p className=" text-accent font-retro text-adminlogin mx-auto inset-x-0 max-w-max">
            Enter the Password.
          </p>
          <div className="bg-accent admin-login w-pwdw h-pwdh flex flex-row justify-between items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              className="bg-accent placeholder:text-gray-500 text-black font-retro text-password ml-[10px] pb-[2px] outline-none overflow-hidden whitespace-nowrap mr-[10px]"
            />
            <div
              className="mr-[10px]"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <Image
                  src="/img/hide.svg"
                  alt="show"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-4 md:w-6 lg:w-7 h-auto"
                />
              ) : (
                <Image
                  src="/img/show.svg"
                  alt="show"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="mb-[1px] w-4 md:w-6 lg:w-7 h-auto"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
