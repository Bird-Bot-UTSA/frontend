// ReadItem.tsx
"use client";
import React, { useState } from "react";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { useDynamoDBClient } from "./DynamoDBClient";

export const ReadItem: React.FC = () => {
    const dynamoDBClient = useDynamoDBClient();
    const [item, setItem] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const readItem = async (tableName: string, key: Record<string, number>) => {
        try {
            const params = {
                TableName: tableName,
                Key: key
            };

            const result = await dynamoDBClient.send(new GetCommand(params));
            setItem(result.Item);
        } catch (err) {
            setError("Error reading item: " + err);
        }
    };

    return (
        <div>
            <button onClick={() => readItem("User", { u_Id: 12345 })}>
                Read Item
            </button>
            {item && <pre>{JSON.stringify(item, null, 2)}</pre>}
            {error && <p>{error}</p>}
        </div>
    );
};
