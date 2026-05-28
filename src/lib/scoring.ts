import { WisdomCategory, WisdomScores } from "@/types";

export function calculateScoreIncrement(messageContent: string): number {
  // Simple logic: more words = slightly more score
  const wordCount = messageContent.split(/\s+/).length;
  const baseIncrement = 0.1;
  const complexityBonus = wordCount > 50 ? 0.2 : 0.1;

  return Math.min(0.5, baseIncrement + complexityBonus);
}

export function updateWisdomScores(
  currentScores: WisdomScores,
  category: WisdomCategory,
  increment: number
): WisdomScores {
  const newScores = { ...currentScores };
  newScores[category] = Math.min(10, newScores[category] + increment);
  return newScores;
}
