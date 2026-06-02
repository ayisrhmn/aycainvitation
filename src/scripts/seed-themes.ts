import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be defined in your .env file."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const CREAMY_SAGE_DEFAULT_SETTINGS = {
  groom_nickname: "Sena",
  groom_fullname: "Sena Wiratama, S.T.",
  groom_father: "Bapak Ir. H. Joko Santoso",
  groom_mother: "Ibu Hj. Retno Lestari, S.Pd.",
  bride_nickname: "Davina",
  bride_fullname: "Davina Putri, S.Ds.",
  bride_father: "Bapak H. Ahmad Fauzi, M.B.A.",
  bride_mother: "Ibu Hj. Fatimah Azzahra",
  wedding_date: "2026-09-12T09:00:00",
  akad_date: "2026-09-12",
  akad_start_time: "09:00",
  akad_end_time: "10:30",
  akad_location:
    "Masjid Sasana Kriya, Taman Mini Indonesia Indah (TMII), Jakarta Timur, DKI Jakarta.",
  akad_maps_url:
    "https://maps.google.com/?q=Gedung+Sasana+Kriya+Taman+Mini+Indonesia+Indah",
  resepsi_date: "2026-09-12",
  resepsi_start_time: "11:00",
  resepsi_end_time: "Selesai",
  resepsi_location:
    "Gedung Sasana Kriya, Taman Mini Indonesia Indah (TMII), Jakarta Timur, DKI Jakarta.",
  resepsi_maps_url:
    "https://maps.google.com/?q=Gedung+Sasana+Kriya+Taman+Mini+Indonesia+Indah",
  bank_name_1: "BANK BCA",
  bank_account_1: "1234567890",
  bank_holder_1: "Sena Wiratama",
  bank_name_2: "BANK MANDIRI",
  bank_account_2: "987654321098",
  bank_holder_2: "Davina Putri",
  quote:
    "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.",
  quote_reference: "QS. Ar-Rum: 21",
  couple_order: "groom_first",
};

async function seed() {
  console.log("Seeding demo_themes table on Supabase sequentially...");

  try {
    // 1. Seed Creamy Sage
    console.log("Upserting Creamy Sage...");
    const { data: creamyData, error: creamyError } = await supabase
      .from("demo_themes")
      .upsert(
        {
          slug: "creamy-sage",
          name: "Creamy Sage",
          tagline: "Warm & Botanical",
          description:
            "Perpaduan warna krem hangat dengan ornamen hijau daun sage yang menenangkan serta sentuhan emas elegan. Sangat cocok untuk konsep pernikahan outdoor maupun minimalis modern.",
          colors: [
            { name: "Cream", hex: "#F3F0E6" },
            { name: "Sage Green", hex: "#708238" },
            { name: "Rose Gold", hex: "#C39B78" },
          ],
          is_coming_soon: false,
          settings: CREAMY_SAGE_DEFAULT_SETTINGS,
        },
        { onConflict: "slug" }
      )
      .select();

    if (creamyError) {
      throw creamyError;
    }
    console.log("Successfully seeded Creamy Sage:", creamyData);

    // 2. Seed Rustic Wood
    console.log("Upserting Rustic Wood...");
    const { data: rusticData, error: rusticError } = await supabase
      .from("demo_themes")
      .upsert(
        {
          slug: "rustic-wood",
          name: "Rustic Wood",
          tagline: "Earthy & Warm",
          description:
            "Nuansa kayu alami dengan perpaduan warna cokelat tanah yang hangat dan aksen bunga kering yang romantis. Cocok untuk konsep pernikahan bertema bohemian atau vintage rustic.",
          colors: [
            { name: "Brown", hex: "#5C4033" },
            { name: "Earthy", hex: "#A57E58" },
            { name: "Warm Cream", hex: "#F5EBE0" },
          ],
          is_coming_soon: true,
          settings: null, // Coming Soon, no settings yet
        },
        { onConflict: "slug" }
      )
      .select();

    if (rusticError) {
      throw rusticError;
    }
    console.log("Successfully seeded Rustic Wood:", rusticData);

  } catch (error) {
    console.error("Failed to seed demo_themes table:", error);
    process.exit(1);
  }
}

seed();
