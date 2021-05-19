# Create Avenue

    POST Avenue/
    
Creates a new set of Avenues for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
avenues | [AvenueInfo][] | [X] | The set of avenues to be created.

## Example
### Request

    POST https://[HOST]/avenues

#### Request Body    
```json
{
  "avenues": [
    "ICT", "IBQ", "ICI"
  ]
}
```

### Response
``` json
{
    "status": {
        "statusCode": 201,
        "message": "Created successfully."
    },
    "result": [
    {
      "name": "ICT",
      "id": "8c2fbc50-f732-47c6-a3e0-3a532780a092"
    },
    {
      "name": "IBQ",
      "id": "3726e1bb-4531-456d-b289-ed6fb111b59d"
    },
    {
      "name": "ICI",
      "id": "92b9a748-9752-45df-87d1-539da2b87688"
    }
  ]
}
```

[AvenueInfo]: /server/api-docs/avenue/AvenueInfo.md