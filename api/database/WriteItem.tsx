// WriteItem.tsx
import React, { useState } from "react";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { useDynamoDBClient } from "./DynamoDBClient";

export const WriteItem: React.FC = () => {
    const dynamoDBClient = useDynamoDBClient();
    const [error, setError] = useState<string | null>(null);

    const writeItem = async (tableName: string, item: Record<string, any>) => {
        try {
            const params = {
                TableName: tableName,
                Item: item
            };

            await dynamoDBClient.send(new PutCommand(params));
            console.log("Item written successfully.");
        } catch (err) {
            setError("Error writing item: " + err);
        }
    };

    return (
        <div>
            <button onClick={() => writeItem("User", { u_Id: 12345, name: "John Doe" })}>
                Write Item
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};
