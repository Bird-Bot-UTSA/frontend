// lib/api-client.ts
// API client for calling AWS Lambda functions

export interface LambdaResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export class APIClient {
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL || '') {
    this.baseURL = baseURL;
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
}

// Export a default instance
export const apiClient = new APIClient(); 