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
    "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a",
    "groups": [
        {
            "groupsAmount": 2,
            "courseKey": "FSC22"
        },
        {
            "groupsAmount": 5,
            "courseKey": "MAT1"
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
            "courseKey": "FSC22",
            "groups": [
                {
                    "number": 1,
                    "matricula": null,
                    "formato": null,
                    "id": "22c4ca88-3a1e-4cac-8419-04c86b955018"
                },
                {
                    "number": 2,
                    "matricula": null,
                    "formato": null,
                    "id": "d0f30379-707a-4b1e-aeb3-2a1419b79488"
                }
            ]
        },
        {
            "courseKey": "MAT1",
            "groups": [
                {
                    "number": 1,
                    "matricula": null,
                    "formato": null,
                    "id": "b3314014-236e-4d30-8c55-861703952cdc"
                },
                {
                    "number": 2,
                    "matricula": null,
                    "formato": null,
                    "id": "7d919026-7588-41bf-8a55-80e077bdccd6"
                },
                {
                    "number": 3,
                    "matricula": null,
                    "formato": null,
                    "id": "c651f09e-08f3-4870-8846-962bf40524f4"
                },
                {
                    "number": 4,
                    "matricula": null,
                    "formato": null,
                    "id": "fca5c992-2a31-48bc-a924-bcfe6ef6356a"
                },
                {
                    "number": 5,
                    "matricula": null,
                    "formato": null,
                    "id": "ed7b73ce-a7ab-42c6-945b-ece9b9bbf986"
                }
            ]
        }
    ]
}
```

[GroupCreate]: /server/api-docs/groups/GroupCreate.md
[PeriodInfo]: /server/api-docs/periods/PeriodInfo.md
