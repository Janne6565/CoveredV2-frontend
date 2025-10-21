import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizePlaytime(playtime: number) {
  const hours = Math.floor(playtime / 60);
  const minutes = playtime % 60;
  const days = Math.floor(hours / 24);
  return `${days > 1 ? days + " Days " : days == 1 ? " 1 Day " : ""}${(hours % 24).toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}h`;
}

/**
 * Simple fuzzy search implementation
 * Returns true if all characters in the search term appear in the target string in order (case-insensitive)
 */
export const fuzzyMatch = (searchTerm: string, target: string): boolean => {
  if (!searchTerm) return true;

  const search = searchTerm.toLowerCase();
  const text = target.toLowerCase();

  let searchIndex = 0;
  let textIndex = 0;

  while (searchIndex < search.length && textIndex < text.length) {
    if (search[searchIndex] === text[textIndex]) {
      searchIndex++;
    }
    textIndex++;
  }

  return searchIndex === search.length;
};

/**
 * Fuzzy search with scoring
 * Returns a score based on how well the search matches the target
 * Higher score means better match
 */
export const fuzzyMatchWithScore = (searchTerm: string, target: string): number => {
  if (!searchTerm) return 1;

  const search = searchTerm.toLowerCase();
  const text = target.toLowerCase();

  let searchIndex = 0;
  let textIndex = 0;
  let score = 0;
  let consecutiveMatches = 0;

  while (searchIndex < search.length && textIndex < text.length) {
    if (search[searchIndex] === text[textIndex]) {
      // Bonus for consecutive matches
      consecutiveMatches++;
      score += 1 + consecutiveMatches;
      searchIndex++;
    } else {
      consecutiveMatches = 0;
    }
    textIndex++;
  }

  // Return 0 if not all characters were matched
  if (searchIndex < search.length) return 0;

  // Bonus for matching at the start
  if (text.startsWith(search)) {
    score += search.length * 2;
  }

  // Bonus for exact match
  if (text === search) {
    score += 100;
  }

  return score;
};