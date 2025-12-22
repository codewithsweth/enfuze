/*
  # Initial Schema for ENFUZE App

  ## Overview
  Creates the foundational database structure for the ENFUZE influencer marketing platform,
  supporting both Brand and Influencer user types with their respective onboarding flows.

  ## New Tables

  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `user_type` (text, enum: 'brand' or 'influencer')
  - `phone_number` (text, unique)
  - `full_name` (text)
  - `onboarding_completed` (boolean, default false)
  - `onboarding_step` (text, tracks current onboarding step)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `brand_profiles`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `company_name` (text)
  - `website` (text)
  - `description` (text)
  - `logo_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `influencer_profiles`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `bio` (text)
  - `profile_image_url` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `team_members`
  - `id` (uuid, primary key)
  - `brand_id` (uuid, references brand_profiles)
  - `email` (text)
  - `role` (text)
  - `status` (text, enum: 'pending', 'active')
  - `invited_at` (timestamptz)
  - `joined_at` (timestamptz)

  ### `social_connections`
  - `id` (uuid, primary key)
  - `influencer_id` (uuid, references influencer_profiles)
  - `platform` (text, enum: 'instagram', 'facebook', 'twitter', 'youtube', 'google')
  - `platform_username` (text)
  - `platform_user_id` (text)
  - `is_connected` (boolean, default true)
  - `followers_count` (integer)
  - `connected_at` (timestamptz)

  ### `categories`
  - `id` (uuid, primary key)
  - `name` (text, unique)
  - `slug` (text, unique)
  - `created_at` (timestamptz)

  ### `user_categories`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references profiles)
  - `category_id` (uuid, references categories)
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Users can read and update their own profile
  - Brand users can manage their team members
  - Influencer users can manage their social connections
  - Categories are readable by all authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  user_type text CHECK (user_type IN ('brand', 'influencer')),
  phone_number text UNIQUE,
  full_name text,
  onboarding_completed boolean DEFAULT false,
  onboarding_step text DEFAULT 'path_selection',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create brand_profiles table
CREATE TABLE IF NOT EXISTS brand_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  company_name text,
  website text,
  description text,
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create influencer_profiles table
CREATE TABLE IF NOT EXISTS influencer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  bio text,
  profile_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES brand_profiles(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text DEFAULT 'member',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active')),
  invited_at timestamptz DEFAULT now(),
  joined_at timestamptz
);

-- Create social_connections table
CREATE TABLE IF NOT EXISTS social_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  influencer_id uuid REFERENCES influencer_profiles(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('instagram', 'facebook', 'twitter', 'youtube', 'google')),
  platform_username text,
  platform_user_id text,
  is_connected boolean DEFAULT true,
  followers_count integer DEFAULT 0,
  connected_at timestamptz DEFAULT now(),
  UNIQUE(influencer_id, platform)
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_categories junction table
CREATE TABLE IF NOT EXISTS user_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, category_id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_categories ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Brand profiles policies
CREATE POLICY "Users can view own brand profile"
  ON brand_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own brand profile"
  ON brand_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own brand profile"
  ON brand_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Influencer profiles policies
CREATE POLICY "Users can view own influencer profile"
  ON influencer_profiles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own influencer profile"
  ON influencer_profiles FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own influencer profile"
  ON influencer_profiles FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Team members policies
CREATE POLICY "Brand users can view their team members"
  ON team_members FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM brand_profiles
      WHERE brand_profiles.id = team_members.brand_id
      AND brand_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Brand users can insert team members"
  ON team_members FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM brand_profiles
      WHERE brand_profiles.id = brand_id
      AND brand_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Brand users can update their team members"
  ON team_members FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM brand_profiles
      WHERE brand_profiles.id = team_members.brand_id
      AND brand_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM brand_profiles
      WHERE brand_profiles.id = brand_id
      AND brand_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Brand users can delete their team members"
  ON team_members FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM brand_profiles
      WHERE brand_profiles.id = team_members.brand_id
      AND brand_profiles.user_id = auth.uid()
    )
  );

-- Social connections policies
CREATE POLICY "Influencers can view own connections"
  ON social_connections FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM influencer_profiles
      WHERE influencer_profiles.id = social_connections.influencer_id
      AND influencer_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Influencers can insert own connections"
  ON social_connections FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM influencer_profiles
      WHERE influencer_profiles.id = influencer_id
      AND influencer_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Influencers can update own connections"
  ON social_connections FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM influencer_profiles
      WHERE influencer_profiles.id = social_connections.influencer_id
      AND influencer_profiles.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM influencer_profiles
      WHERE influencer_profiles.id = influencer_id
      AND influencer_profiles.user_id = auth.uid()
    )
  );

CREATE POLICY "Influencers can delete own connections"
  ON social_connections FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM influencer_profiles
      WHERE influencer_profiles.id = social_connections.influencer_id
      AND influencer_profiles.user_id = auth.uid()
    )
  );

-- Categories policies (readable by all authenticated users)
CREATE POLICY "Authenticated users can view categories"
  ON categories FOR SELECT
  TO authenticated
  USING (true);

-- User categories policies
CREATE POLICY "Users can view own categories"
  ON user_categories FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own categories"
  ON user_categories FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own categories"
  ON user_categories FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Insert some default categories
INSERT INTO categories (name, slug) VALUES
  ('Fashion', 'fashion'),
  ('Beauty', 'beauty'),
  ('Fitness', 'fitness'),
  ('Technology', 'technology'),
  ('Food', 'food'),
  ('Travel', 'travel'),
  ('Lifestyle', 'lifestyle'),
  ('Gaming', 'gaming'),
  ('Sports', 'sports'),
  ('Entertainment', 'entertainment')
ON CONFLICT (slug) DO NOTHING;