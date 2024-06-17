import React from "react";

import SignUpForm from "./SignUpForm";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zodinet Booking - Sign Up Page',
  description: 'Zodinet Booking - Sign Up: Become a Member',
}
export default function page() {
  return (
    <div className="flex justify-center h-screen">
      <SignUpForm />
    </div>
  );
}
