// composables/useFormatDate.ts
import dayjs from "dayjs";

/**
 * A composable to format ISO date strings into "YYYY-MM-DD".
 */
export function useFormatDate() {
  /**
   * Formats a given ISO date string into "YYYY-MM-DD".
   * @param isoString - The ISO date string to format.
   * @returns A formatted date string in "YYYY-MM-DD" format.
   */
  const formatDate = (isoString: string): string => {
    return dayjs(isoString).format("YYYY-MM-DD");
  };

  /**
   * Formats a given ISO date string into a user-friendly format: "MMM D, YYYY h:mm A".
   * Example: "Feb 25, 2025 10:30 AM"
   * @param isoString - The ISO date string to format.
   * @returns A formatted date-time string.
   */
  const formatDateTimeFriendly = (isoString: string): string => {
    return dayjs(isoString).format("MMM D, YYYY h:mm A");
  };

  return { formatDate, formatDateTimeFriendly };
}
