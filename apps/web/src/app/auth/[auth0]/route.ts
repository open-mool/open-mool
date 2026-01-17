import { auth0 } from "@/lib/auth0";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export const GET = (req: NextRequest) => auth0.middleware(req);
export const POST = (req: NextRequest) => auth0.middleware(req);
