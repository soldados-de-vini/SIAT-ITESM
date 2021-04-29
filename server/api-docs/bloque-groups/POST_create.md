# Create Block Group

    POST groups21/
    
Creates a new set of Block Groups for the user requesting it on a Period ([PeriodInfo]).

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
periodId | string | [X] | The UUID of the period where the group will be created.
course21Id | string | [X] | The UUID of the course.
groups | [Group21Info][] | [X] | The data of the groups to be added.

## Example
### Request

    POST https://[HOST]/groups21/

#### Request Body    
```json
{
    "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a",
    "course21Id": "a395d93d-5d72-472b-930a-c0d79961c54c",
    "groups": [
        {
            "number": 1,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "PAR",
            "formato": "HDPA"
        },
        {
            "number": 2,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "TODAS",
            "formato": "HDPA"
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
            "id": "d7b6ce63-683b-4c7b-93af-89a2d376f0e2",
            "number": 1,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "PAR",
            "formato": "HDPA",
            "course21Id": "a395d93d-5d72-472b-930a-c0d79961c54c",
            "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a"
        },
        {
            "id": "032a6c89-4e0d-4ef1-ae10-54477d0a7c73",
            "number": 2,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "TODAS",
            "formato": "HDPA",
            "course21Id": "a395d93d-5d72-472b-930a-c0d79961c54c",
            "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a"
        }
    ]
}
```

[Group21Info]: /server/api-docs/bloque-groups/Group21Info.md
[PeriodInfo]: /server/api-docs/periods/PeriodInfo.md
