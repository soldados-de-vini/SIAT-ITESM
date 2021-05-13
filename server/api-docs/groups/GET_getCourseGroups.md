# Get User Groups

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

    GET https://[HOST]/groups/period/b7126849-a3de-4b40-8c1f-61e79e65ec9a/course/0125a974-baef-45fa-bd4a-60f3ed2a3195

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successful search"
    },
    "result": [
        {
            "id": "4bbd9ad8-5906-48de-99e9-56d28e7c026c",
            "number": 1,
            "formato": "HDPA",
            "matricula": "TODAS",
            "classroom": null
        },
        {
            "id": "ee5b4667-e88f-4ce6-aeee-4774f37ee1b1",
            "number": 2,
            "formato": null,
            "matricula": null,
            "classroom": null
        },
        {
            "id": "68b3870d-2e09-494c-aeeb-287090ef11af",
            "number": 3,
            "formato": null,
            "matricula": null,
            "classroom": null
        },
        {
            "id": "7332c522-9733-4212-b8fb-4e4d4ade8feb",
            "number": 4,
            "formato": null,
            "matricula": null,
            "classroom": null
        },
        {
            "id": "084c379a-7b42-4697-bd37-da2c47c338a3",
            "number": 5,
            "formato": null,
            "matricula": null,
            "classroom": null
        },
        {
            "id": "09dca748-eaa2-4437-8189-d6b62a05755c",
            "number": 6,
            "formato": null,
            "matricula": null,
            "classroom": null
        }
    ]
}
```
