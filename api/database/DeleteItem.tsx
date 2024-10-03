// DeleteItem.tsx
import React, { useState } from "react";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { useDynamoDBClient } from "./DynamoDBClient";

export const DeleteItem: React.FC = () => {
    const dynamoDBClient = useDynamoDBClient();
    const [error, setError] = useState<string | null>(null);

    const deleteItem = async (tableName: string, key: Record<string, number>) => {
        try {
            const params = {
                TableName: tableName,
                Key: key
            };

            await dynamoDBClient.send(new DeleteCommand(params));
            console.log("Item deleted successfully.");
        } catch (err) {
            setError("Error deleting item: " + err);
        }
    };

    return (
        <div>
            <button onClick={() => deleteItem("User", { u_Id: 12345 })}>
                Delete Item
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};
