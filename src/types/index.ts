export interface WeddingConfig {
  groom_nickname: string;
  groom_fullname: string;
  groom_father: string;
  groom_mother: string;
  bride_nickname: string;
  bride_fullname: string;
  bride_father: string;
  bride_mother: string;
  wedding_date: string;
  akad_date: string;
  akad_start_time: string;
  akad_end_time: string;
  akad_location: string;
  akad_maps_url: string;
  resepsi_date: string;
  resepsi_start_time: string;
  resepsi_end_time: string;
  resepsi_location: string;
  resepsi_maps_url: string;
  bank_name_1?: string;
  bank_account_1?: string;
  bank_holder_1?: string;
  bank_name_2?: string;
  bank_account_2?: string;
  bank_holder_2?: string;
  quote?: string;
  quote_reference?: string;
  music_title?: string;
  music_url?: string;
  couple_order?: "groom_first" | "bride_first";
}

export interface RsvpWish {
  timestamp: string;
  name: string;
  attendance: string;
  guestsCount: number;
  wish: string;
}

export interface ClientConfig {
  slug: string;
  email: string;
  phone: string;
  theme: string;
  status: "Active" | "Pending";
  settings: WeddingConfig;
  createdAt: string;
}
