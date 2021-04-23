# Create Period

    POST periods/
    
Creates a new set of Periods for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
periods | [PeriodInfo][] | [X] | The set of periods to be created.

## Example
### Request

    POST https://[HOST]/periods

#### Request Body    
```json
{
    "periods": [
        {
            "name": "Ago-Nov 2021",
            "startDate": "2021-07-25",
            "endDate": "2021-11-22",
            "vacations": ["2021-09-01"]
        }
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
            "id": "7979471c-033c-499c-ae57-62521c832439",
            "name": "Ago-Nov 2021",
            "startDate": "2021-07-25",
            "endDate": "2021-11-22",
            "vacations": [
                "2021-09-01"
            ]
        }
    ]
}
```

[PeriodInfo]: /server/api-docs/periods/PeriodInfo.md