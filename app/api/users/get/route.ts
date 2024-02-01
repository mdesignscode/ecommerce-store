import { TUser } from "@/app/hooks/setActiveUser";
import { GetUserRequest, IGetUser } from "@/models/customRequests";
import { getUser } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: GetUserRequest
) {
  const body: IGetUser = await request.json();

  const user: TUser = await getUser(body.id)

  return NextResponse.json(user)
}
