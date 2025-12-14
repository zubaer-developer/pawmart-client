import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-8 text-base-content">
      <div className="mx-auto px-4 py-6 bg-base-100 flex flex-col md:flex-row justify-between gap-6">
        {/* Logo */}
        <div>
          <Link to="/" className="flex normal-case text-xl items-center gap-1">
            <img
              src="https://i.ibb.co.com/5xf4yfW5/PAWMART-LOGO.webp"
              alt="logo"
              className="w-8 h-8"
            />
            <span className="text-orange-400">Paw</span>Mart
          </Link>
        </div>

        {/* Description */}
        <div>
          <p className="max-w-md text-sm text-base-content/70">
            PawMart connects local pet owners and buyers for adoption and pet
            care products. PawMart connects local pet owners and buyers for
            adoption and pet care products. PawMart connects local pet owners
            and buyers for adoption and pet care products.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-semibold mb-2">Useful Links</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link to="/" className="link link-hover">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="link link-hover">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/terms" className="link link-hover">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center bg-base-300 py-3 text-sm text-base-content/70">
        © {new Date().getFullYear()} PawMart. All rights reserved.
      </div>
    </footer>
  );
}
