# Create Group

    POST groups/
    
Creates a new set of Groups for the user requesting it on a Period ([PeriodInfo]).

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
periodId | string | [X] | The UUID of the period where the group will be created.
courseId | string | [X] | The UUID of the course.
groups | [GroupInfo][] | [X] | The data of the groups to be added.

## Example
### Request

    POST https://[HOST]/groups/

#### Request Body    
```json
{
    "periodId": "0851274e-f1f1-4b68-a520-7545ad3f7e57",
    "courseId": "0d14788d-c767-4fd7-bb47-04f7c0c5b4fa",
    "groups": [
        {
            "number": 1,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "PAR",
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
            "id": "bb4bc42f-a865-4722-8fd1-b3eacb32b054",
            "number": 1,
            "startDate": "2021-07-26",
            "endDate": "2021-08-28",
            "matricula": "PAR",
            "formato": "HDPA",
            "courseId": "0d14788d-c767-4fd7-bb47-04f7c0c5b4fa",
            "periodId": "0851274e-f1f1-4b68-a520-7545ad3f7e57"
        }
    ]
}
```

[GroupInfo]: /server/api-docs/groups/GroupInfo.md
[PeriodInfo]: /server/api-docs/periods/PeriodInfo.md
