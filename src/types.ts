/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ArtworkCategory {
  ALL = "All",
  PRINTMAKING = "Printmaking",
  INSTALLATION = "Installation",
  DRAWING = "Drawing"
}

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  medium: string;
  size?: string;
  location?: string;
  year: number;
  description: string;
  context?: string;
  image: string;
  quote?: string;
  quoteAuthor?: string;
  isFeatured?: boolean;
}

export interface Exhibition {
  year: number;
  title: string;
  subtitle?: string;
  location: string;
  category: "Exhibition" | "Residency" | "Education" | "Award";
  description?: string;
  image?: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  visualType: "lithography" | "forest" | "transformation";
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}
