// Environment variables with fallbacks for development
export const ENV = {
  // IMPORTANT: Replace these placeholder values with actual environment variables in production

  // Controls whether demo mode is enabled (true/false)
  DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE || "true",

  // The base URL for API requests
  // IMPORTANT: Replace with your actual API URL in production
  API_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.saasfoundry.dev",

  // Add other environment variables here as needed
}
