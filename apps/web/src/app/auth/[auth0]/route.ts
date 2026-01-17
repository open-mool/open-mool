import { auth0 } from "@/lib/auth0";

export const runtime = 'edge';

export const GET = auth0.handleAuth();
export const POST = auth0.handleAuth();
