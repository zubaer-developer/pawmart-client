import React, { useContext } from "react"; // ➤ পরিবর্তন ১: useContext ইম্পোর্ট
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext"; // ➤ পরিবর্তন ২: AuthContext ইম্পোর্ট

const RootLayout = () => {
  // ➤ পরিবর্তন ৩: AuthContext থেকে loading স্টেটটি নেওয়া
  const { loading } = useContext(AuthContext);

  // ➤ পরিবর্তন ৪: যদি loading true থাকে, তবে একটি লোডিং স্ক্রিন দেখানো
  if (loading) {
    // ফুল-পেজ লোডিং স্পিনার/মেসেজ
    // আপনি চাইলে আপনার CSS ফ্রেমওয়ার্ক অনুযায়ী স্পিনার যুক্ত করতে পারেন
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg font-semibold">Loading Application...</p>
        </div>
      </div>
    );
  }

  // লোডিং শেষ হলে স্বাভাবিক লেআউট দেখান
  return (
    <div>
      <Navbar />
      <div className="pt-5">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
