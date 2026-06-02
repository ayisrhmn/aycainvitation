-- ==========================================
-- Migration: Add demo_themes Table with Catalog Metadata
-- Run this in the Supabase SQL Editor
-- ==========================================

-- 1. Create the table
CREATE TABLE IF NOT EXISTS demo_themes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  tagline         TEXT NOT NULL DEFAULT '',
  description     TEXT NOT NULL DEFAULT '',
  colors          JSONB DEFAULT '[]'::jsonb,
  is_coming_soon  BOOLEAN NOT NULL DEFAULT false,
  settings        JSONB DEFAULT '{}'::jsonb, -- WeddingConfig (nullable/optional)
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE demo_themes ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy for Public Select
CREATE POLICY "Public read demo themes"
  ON demo_themes FOR SELECT
  USING (true);
