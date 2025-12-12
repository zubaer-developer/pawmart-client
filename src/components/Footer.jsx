import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="font-bold text-lg">PawMart</h3>
          <p className="max-w-md">
            PawMart connects local pet owners and buyers for adoption and pet
            care products.
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
