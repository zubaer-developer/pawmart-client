import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="mx-auto px-4 py-4 bg-gray-300 flex flex-col md:flex-row justify-between">
        <div>
          <Link to="/" className="flex normal-case text-xl">
            <img
              src="https://i.ibb.co.com/5xf4yfW5/PAWMART-LOGO.webp"
              alt="logo"
              className="w-8 h-8"
            />
            <span className="text-orange-400">Paw</span>Mart
          </Link>
        </div>
        <div>
          <p className="max-w-md">
            PawMart connects local pet owners and buyers for adoption and pet
            care products. PawMart connects local pet owners and buyers for
            adoption and pet care products. PawMart connects local pet owners
            and buyers for adoption and pet care products.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <h4 className="font-semibold">Useful Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center bg-gray-200 py-2">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
}
