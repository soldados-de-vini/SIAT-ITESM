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
            "id": "252b94a8-7562-4b6d-b780-c04884af3ca9",
            "number": 1,
            "matricula": null,
            "formato": null
        },
        {
            "id": "50bc6e79-fa7f-4e4a-852e-1375ead1be1b",
            "number": 2,
            "matricula": null,
            "formato": null
        }
    ]
}
```
