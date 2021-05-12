# Get Course Groups

    GET groups/period/:periodId/course/:courseId
    
Gets all the groups of the course on the period requested.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
periodId | The ID of the period that the groups belongs to.
courseId | The ID of the course that the groups belongs to.

## Example
### Request

    GET https://[HOST]/groups21/period/b7126849-a3de-4b40-8c1f-61e79e65ec9a/course/a395d93d-5d72-472b-930a-c0d79961c54c

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successful search"
    },
    "result": [
        {
            "id": "d517cdc8-4c26-4914-8ab4-e29bd26c635f",
            "number": 1,
            "matricula": null,
            "formato": null
        },
        {
            "id": "c0175093-61eb-4180-b7b5-82d2b7779db1",
            "number": 2,
            "matricula": null,
            "formato": null
        }
    ]
}
```
