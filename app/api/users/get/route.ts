import { TUser } from "@/app/Components/SetActiveUser";
import { GetUserRequest, IGetUser } from "@/models/customRequests";
import { getUser } from "@/utils";
import { NextResponse } from "next/server";

export async function POST(request: GetUserRequest
) {
  const body: IGetUser = await request.json();

  const user: TUser | null = await getUser(body.id)

  return NextResponse.json(user)
}
