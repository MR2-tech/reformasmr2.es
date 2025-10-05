import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({
  params,
  request,
  redirect,
  clientAddress,
}) => {
  const formData = await request.formData();

  const clientName = formData.get("clientName") as string;
  const score = Number(formData.get("score"));
  const description = formData.get("description") as string;

  if (!clientName || !description || isNaN(score)) {
    return new Response(JSON.stringify({ error: "Invalid form data" }), {
      status: 400,
    });
  }

  // Get client IP address with fallback handling
  let clientIp =
    clientAddress ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-client-ip") ||
    "unknown";

  if (clientIp === "::1" || clientIp === "127.0.0.1") {
    const isProduction = import.meta.env.PROD;

    if (!isProduction) {
      console.log("Development mode detected - IP:", clientIp);

      const sessionId =
        request.headers.get("user-agent")?.slice(0, 50) || "unknown-session";
      clientIp = `localhost-${sessionId}`;
    }
  }

  const isProduction = import.meta.env.PROD;
  const shouldCheckRateLimit = isProduction || clientIp !== "localhost-dev";

  if (shouldCheckRateLimit) {
    const { data: existingReviews, error: checkError } = await supabase
      .from("reviews")
      .select("id")
      .eq("ip_address", clientIp)
      .limit(1);

    if (checkError) {
      return new Response(JSON.stringify({ error: "Database error" }), {
        status: 500,
      });
    }

    if (existingReviews && existingReviews.length > 0) {
      return new Response(
        JSON.stringify({
          error:
            "Ya has enviado una reseña desde esta dirección IP. Solo se permite una reseña por cliente.",
        }),
        {
          status: 429, // Too Many Requests
        }
      );
    }
  } else {
    console.log("Rate limiting disabled for development");
  }

  const { error } = await supabase.from("reviews").insert([
    {
      client_name: clientName,
      score,
      description,
      ip_address: clientIp,
    },
  ]);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  // ✅ Redirect to thank-you page
  return redirect("/thank-you", 303);
};
