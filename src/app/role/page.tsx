import React from "react";
import RoleForm from "./RoleForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/home");
  } 
  return (
    <div>
      <RoleForm />
    </div>
  );
}
