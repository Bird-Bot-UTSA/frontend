// DynamoDBClient.tsx
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { createContext, useContext } from "react";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const dynamoDBClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ""
    }
});

const DynamoDBContext = createContext<DynamoDBClient | undefined>(undefined);

export const DynamoDBProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <DynamoDBContext.Provider value={dynamoDBClient}>
            {children}
        </DynamoDBContext.Provider>
    );
};

export const useDynamoDBClient = () => {
    const client = useContext(DynamoDBContext);
    if (!client) {
        throw new Error("DynamoDBClient must be used within DynamoDBProvider");
    }
    return client;
};

export default dynamoDBClient;
