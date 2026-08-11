export type AvailabilityStatus =
  | "available"
  | "soon"
  | "unavailable";

export type SiteConfig = {
  phone: string;
  email: string;
  availability: AvailabilityStatus;
  availabilityLabel: string;
  availabilityMessage: string;
};

export const defaultSiteConfig: SiteConfig = {
  phone: "+33 6 09 58 17 42",
  email: "corybesson14@icloud.com",
  availability: "soon",
  availabilityLabel: "Disponible prochainement",
  availabilityMessage:
    "Disponible pour de nouvelles opportunités professionnelles et de nouveaux projets en Suisse.",
};

const STORAGE_KEY = "cory-site-config";

export function getSiteConfig(): SiteConfig {
  if (typeof window === "undefined") {
    return defaultSiteConfig;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return defaultSiteConfig;
    }

    return {
      ...defaultSiteConfig,
      ...JSON.parse(saved),
    };
  } catch {
    return defaultSiteConfig;
  }
}

export function saveSiteConfig(config: SiteConfig) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(config)
  );
}

export function resetSiteConfig() {
  localStorage.removeItem(STORAGE_KEY);
}