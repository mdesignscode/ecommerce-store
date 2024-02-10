"use client";

import { useEffect } from "react";
import { getUser } from "../actions/getUser";
import useGlobalStore from "@/lib/store";

export default function Page() {
  const {setActiveUser} = useGlobalStore()

  useEffect(() => {
    const displayUser = async () => setActiveUser(await getUser())
    displayUser()
  }, [setActiveUser])

  return <h1>User</h1>
}
