# Get Period Block Groups

    GET groups21/:id
    
Gets all the block groups of the period ID requested.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the period that the groups belong to.

## Example
### Request

    GET https://[HOST]/groups21/b7126849-a3de-4b40-8c1f-61e79e65ec9a

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successful search"
    },
    "result": [
        {
            "id": "032a6c89-4e0d-4ef1-ae10-54477d0a7c73",
            "number": 2,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "TODAS",
            "formato": "HDPA",
            "course21Id": "a395d93d-5d72-472b-930a-c0d79961c54c",
            "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a"
        },
        {
            "id": "d7b6ce63-683b-4c7b-93af-89a2d376f0e2",
            "number": 1,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "PAR",
            "formato": "HDPA",
            "course21Id": "a395d93d-5d72-472b-930a-c0d79961c54c",
            "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a"
        }
    ]
}
```
