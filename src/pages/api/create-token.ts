import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { randomUUID } from "crypto";

const SECRET_KEY = import.meta.env.SECRET_KEY;

export const POST: APIRoute = async ({
  request,
  redirect,
  url: { origin },
}) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;

  if (password !== SECRET_KEY) {
    const error = encodeURIComponent("Clave incorrecta");
    return redirect(`/new-review?error=${error}`, 303);
  }

  const token = randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  const { error } = await supabase
    .from("review_creation_tokens")
    .insert([{ id: token, expires_at: expiresAt }]);

  if (error) {
    const error = encodeURIComponent("Error al crear la url para la reseña");

    return redirect(`/new-review?error=${error}`, 303);
  }

  const newReviewUrl = encodeURIComponent(origin + `/review/${token}`);

  return redirect(`/new-review?new_review_url=${newReviewUrl}`, 303);
};
