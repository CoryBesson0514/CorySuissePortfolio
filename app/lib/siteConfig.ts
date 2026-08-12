import { supabase } from "./supabase";

export type AvailabilityStatus = "available" | "soon" | "unavailable";

export type SiteConfig = {
  id?: number;
  phone: string;
  email: string;
  availability: AvailabilityStatus;
  availabilityLabel: string;
  availabilityMessage: string;
};

export const defaultSiteConfig: SiteConfig = {
  phone: "+33 6 09 58 17 42",
  email: "corybesson14@icloud.com",
  availability: "available",
  availabilityLabel: "Disponible",
  availabilityMessage:
    "Disponible pour de nouvelles opportunités professionnelles et de nouveaux projets en Suisse.",
};

/**
 * Récupère la configuration depuis Supabase
 */
export async function getSiteConfig(): Promise<SiteConfig> {
  const { data, error } = await supabase
    .from("site_config")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("ERREUR LECTURE SUPABASE :", error);
    return defaultSiteConfig;
  }

  if (!data) {
    console.error("Aucune configuration trouvée dans Supabase.");
    return defaultSiteConfig;
  }

  return {
    id: data.id,
    phone: data.phone,
    email: data.email,
    availability: data.availability as AvailabilityStatus,
    availabilityLabel: data.availability_label,
    availabilityMessage: data.availability_message,
  };
}

/**
 * Enregistre la configuration dans Supabase
 */
export async function saveSiteConfig(config: SiteConfig) {
  // Cherche la ligne de configuration existante
  const { data: existing, error: findError } = await supabase
    .from("site_config")
    .select("id")
    .limit(1)
    .single();

  if (findError) {
    console.error("ERREUR LECTURE CONFIGURATION :", findError);

    throw findError;
  }

  if (!existing) {
    const error = new Error("Aucune configuration trouvée dans Supabase.");

    console.error(error);

    throw error;
  }

  console.log("ID DE LA CONFIGURATION :", existing.id);

  console.log("CONFIGURATION À ENREGISTRER :", config);

  // Mise à jour
  const { data, error } = await supabase
    .from("site_config")
    .update({
      phone: config.phone,
      email: config.email,
      availability: config.availability,
      availability_label: config.availabilityLabel,
      availability_message: config.availabilityMessage,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existing.id)
    .select();

  if (error) {
    console.error("ERREUR UPDATE SUPABASE :", error);

    throw error;
  }

  console.log("CONFIGURATION ENREGISTRÉE :", data);

  return data;
}
