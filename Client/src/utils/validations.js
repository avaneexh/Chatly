/**
 * Validate login form
 * @param {string} email
 * @param {string} password
 * @returns {object} Object containing isValid and errors
 */
export const validateLoginForm = (email, password) => {
    const errors = {};
  
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address.";
    }
  
    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
  
    return { isValid: Object.keys(errors).length === 0, errors };
  };
  
  /**
   * Validate message input
   * @param {string} text - The text message
   * @returns {object} Object containing isValid and errors
   */
  export const validateMessageInput = (text) => {
    const errors = {};
  
    if (!text.trim()) {
      errors.text = "Message cannot be empty.";
    }
  
    return { isValid: Object.keys(errors).length === 0, errors };
  };
  