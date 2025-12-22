/*
  # Add Additional Profile Fields

  ## Updates

  ### `brand_profiles` table
  - Add `tagline` (text) - Brand tagline
  - Add `industry` (text) - Brand industry/category
  
  ### `influencer_profiles` table
  - Add `first_name` (text) - Influencer first name
  - Add `last_name` (text) - Influencer last name
  - Add `gender` (text) - Influencer gender
  - Update `bio` to be nullable
*/

-- Add fields to brand_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brand_profiles' AND column_name = 'tagline'
  ) THEN
    ALTER TABLE brand_profiles ADD COLUMN tagline text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'brand_profiles' AND column_name = 'industry'
  ) THEN
    ALTER TABLE brand_profiles ADD COLUMN industry text;
  END IF;
END $$;

-- Add fields to influencer_profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'influencer_profiles' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE influencer_profiles ADD COLUMN first_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'influencer_profiles' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE influencer_profiles ADD COLUMN last_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'influencer_profiles' AND column_name = 'gender'
  ) THEN
    ALTER TABLE influencer_profiles ADD COLUMN gender text;
  END IF;
END $$;
