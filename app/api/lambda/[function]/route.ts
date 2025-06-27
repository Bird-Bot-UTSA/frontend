import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { function: string } }
) {
  try {
    const body = await request.json();
    const functionName = params.function;

    // TODO: Replace with your actual AWS Lambda invocation
    // This is where you'll integrate with AWS SDK to call your Lambda function
    
    console.log(`Calling Lambda function: ${functionName}`, body);

    // Placeholder response - replace with actual Lambda call
    const mockResponse = {
      message: `Called Lambda function: ${functionName}`,
      input: body,
      timestamp: new Date().toISOString(),
    };

    // Example of how you might call Lambda (uncomment when ready):
    // import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
    // 
    // const lambda = new LambdaClient({
    //   region: process.env.AWS_REGION,
    //   credentials: {
    //     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    //     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    //   },
    // });
    //
    // const command = new InvokeCommand({
    //   FunctionName: functionName,
    //   Payload: JSON.stringify(body),
    // });
    //
    // const result = await lambda.send(command);
    // const response = JSON.parse(new TextDecoder().decode(result.Payload));

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error('Error calling Lambda function:', error);
    return NextResponse.json(
      { error: 'Failed to call Lambda function' },
      { status: 500 }
    );
  }
} 