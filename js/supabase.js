const SUPABASE_URL = "https://xyzrbagknydblmkszlff.supabase.co";

const SUPABASE_KEY = "sb_publishable_Q902Ue7_lFsHZ46IHsIAeQ_yF7gZrEV";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function comprobarRespuesta(id, respuesta) {
  const { data, error } = await db.rpc("comprobar_respuesta", {
    reto_id: id,
    respuesta_usuario: respuesta,
  });

  if (error) {
    console.error(error);
    return false;
  }

  return data;
}
