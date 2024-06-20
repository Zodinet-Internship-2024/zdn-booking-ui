import React from "react";

import SignUpForm from "./SignUpForm";
import type { Metadata } from 'next';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Zodinet Booking - Sign Up Page',
  description: 'Zodinet Booking - Sign Up: Become a Member',
}
export default async function page() {
  const session = await getServerSession();

  if (session?.user) {
    redirect('/home');
  }
  return (
    <div className="flex h-screen justify-center">
      <SignUpForm />
    </div>
  );
}
