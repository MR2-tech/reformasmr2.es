import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ params, request, redirect }) => {
  const { token } = params;

  // ✅ Validate the token
  if (!token) {
    return new Response(JSON.stringify({ error: "Invalid token" }), {
      status: 403,
    });
  }

  const formData = await request.formData();

  const clientName = formData.get("clientName") as string;
  const score = Number(formData.get("score"));
  const description = formData.get("description") as string;

  if (!clientName || !description || isNaN(score)) {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
    });
  }

  const { error } = await supabase
    .from("reviews")
    .insert([
      { client_name: clientName, score, description, creation_token_id: token },
    ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  // ✅ Redirect to thank-you page
  return redirect("/thank-you", 303);
};
