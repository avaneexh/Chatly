/**
 * Format a timestamp to a readable format
 * @param {string} timestamp - ISO string or Date object
 * @returns {string} Formatted timestamp (e.g., "10:30 AM")
 */
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  
  /**
   * Truncate a string to a given length
   * @param {string} text - The text to truncate
   * @param {number} maxLength - Maximum allowed length
   * @returns {string} Truncated text with "..." if needed
   */
  export const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };
  
  /**
   * Check if an email is valid
   * @param {string} email - The email address
   * @returns {boolean} True if valid, otherwise false
   */
  export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  