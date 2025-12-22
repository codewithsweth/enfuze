export interface CampaignTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

export interface Platform {
  id: string;
  name: string;
  color: string;
}

export interface AgeGroup {
  id: string;
  label: string;
}

export interface Gender {
  id: string;
  label: string;
}

export interface BudgetRange {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

export interface CampaignData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  category: string;
  targetLocation: string;
  followerRange: string;
  platforms: string[];
  ageGroups: string[];
  gender: string;
  budgetMin: number;
  budgetMax: number;
  landingPage?: string;
  imageUrl?: string;
}
