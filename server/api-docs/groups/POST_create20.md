# Create Group

    POST groups/
    
Creates a new set of Groups for the user requesting it on a Period ([PeriodInfo]).

The request number of groups will be created starting from 1, e.g., if 2 groups for a course are requested,
the groups created are 1 and 2. If there are already other groups on the DB, the groups will be created based
on the number of existing groups, e.g., if there are 2 groups already existing, and 2 more groups are requested
to be created, those new will get the numbers 3 and 4.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
periodId | string | [X] | The UUID of the period where the group will be created.
groups | [GroupCreate][] | [X] | The data of the groups to be added.

## Example
### Request

    POST https://[HOST]/groups/

#### Request Body    
```json
{
    "periodId": "66195ba1-ca0e-4f29-9eb8-eb35ddf7c9ee",
    "groups": [
        {
            "groupsAmount": 2,
            "courseKey": "FSC1"
        },
        {
            "groupsAmount": 5,
            "courseKey": "MATE1"
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
            "number": 1,
            "matricula": null,
            "formato": null,
            "id": "e2c356d4-df6b-44cf-a0b6-a35fd433c5ca",
            "courseKey": "FSC1"
        },
        {
            "number": 2,
            "matricula": null,
            "formato": null,
            "id": "116d8783-ac07-4dd9-9414-e9e0b6f20ca1",
            "courseKey": "FSC1"
        },
        {
            "number": 1,
            "matricula": null,
            "formato": null,
            "id": "51c0063f-989f-48a7-aa5e-bce593ca09bc",
            "courseKey": "MATE1"
        },
        {
            "number": 2,
            "matricula": null,
            "formato": null,
            "id": "7b2d9506-bc66-4ef8-8858-e6cfe85a4b2f",
            "courseKey": "MATE1"
        },
        {
            "number": 3,
            "matricula": null,
            "formato": null,
            "id": "c9f8918c-2d76-42a6-9a0b-841e1725a851",
            "courseKey": "MATE1"
        },
        {
            "number": 4,
            "matricula": null,
            "formato": null,
            "id": "bd785715-fbdb-4e84-a9cd-273d74ef5473",
            "courseKey": "MATE1"
        },
        {
            "number": 5,
            "matricula": null,
            "formato": null,
            "id": "fa8546f5-7b64-4d4a-b1ee-91a0495b2047",
            "courseKey": "MATE1"
        }
    ]
}
```

[GroupCreate]: /server/api-docs/groups/GroupCreate.md
[PeriodInfo]: /server/api-docs/periods/PeriodInfo.md
