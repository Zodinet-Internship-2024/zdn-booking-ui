import React from "react";

import SignUpForm from "./SignUpForm";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

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
