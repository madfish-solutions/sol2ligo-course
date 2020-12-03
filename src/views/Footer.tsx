import React from "react";

import { ReactComponent as FacebookIcon } from "../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "../images/youtube-icon.svg";

import Logo from './Logo';

const FooterLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props: any
) => (
  <a
    className="pb-1 mx-4 mt-2 transition duration-300 border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300"
    {...props}
  />
);

const SocialLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (
  props: any
) => (
  <a
    className="inline-block mx-4 text-gray-100 transition duration-300 cursor-pointer hover:text-gray-500"
    {...props}
  />
);


export default () => {
  return (
    <div className="max-w-screen-xl py-10 mx-auto lg:py-10">
      <div className="flex flex-col items-center justify-center px-8">
        <div className="flex items-center justify-center md:justify-start">
          {/* <div className="w-8"></div> */}
          <Logo />
        </div>
        <div className="flex flex-col flex-wrap items-center justify-center font-medium sm:flex-row">
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Blog</FooterLink>
          <FooterLink href="#">Reviews</FooterLink>
        </div>
        <div className="">
          <SocialLink href="https://facebook.com">
            <FacebookIcon className="w-5 h-5" />
          </SocialLink>
          <SocialLink href="https://twitter.com">
            <TwitterIcon className="w-5 h-5"  />
          </SocialLink>
          <SocialLink href="https://youtube.com">
            <YoutubeIcon className="w-5 h-5"  />
          </SocialLink>
        </div>
        <div className="mt-2 text-sm font-medium tracking-wide text-center text-gray-600">
          &copy; Copyright 2020, Madfish.Solutions. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};
