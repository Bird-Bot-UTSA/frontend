// lib/api-client.ts
// API client for calling AWS Lambda functions

export interface LambdaResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class APIClient {
  private baseURL: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL || process.env.NEXT_PUBLIC_API || 'https://jyhcs69hk7.execute-api.us-east-1.amazonaws.com';
    // Remove trailing slash to prevent double slashes
    this.baseURL = this.baseURL.replace(/\/$/, '');
    console.log('APIClient initialized with baseURL:', this.baseURL);
  }

  // Generic method to call any Lambda function
  async callLambda(functionName: string, payload: any): Promise<LambdaResponse> {
    try {
      const response = await fetch(`${this.baseURL}/api/lambda/${functionName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Example method for a specific Lambda function
  async callMathAI(prompt: string): Promise<LambdaResponse> {
    return this.callLambda('math-ai', { prompt });
  }

  // Example method for user authentication
  async authenticateUser(credentials: { email: string; password: string }): Promise<LambdaResponse> {
    return this.callLambda('auth', credentials);
  }

  // Method for user signup
  async signupUser(userData: { 
    user_name: string; 
    user_email: string; 
    user_password: string; 
    user_age?: number;
    user_school?: string;
  }): Promise<LambdaResponse> {
    try {
      console.log('Sending signup data:', userData);
      
      // Use local proxy to avoid CORS issues
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Signup API response:', result);
      
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error('Signup API error:', error);
      console.error('Error details:', {
        name: error instanceof Error ? error.name : 'Unknown',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}

// Export a default instance
export const apiClient = new APIClient(); 