import { supabase } from "@/client";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  const params = await request.json();

  const result = await supabase
    .from("posts")
    .insert([
      {
        user_id: params.user_id,
        text: params.text,
      },
    ])
    .select("*");
  return Response.json(result);
}
