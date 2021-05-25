# Create Block Group

    POST groups21/
    
Creates a new set of Block Groups for the user requesting it on a Period ([PeriodInfo]).
When the group is created, it's Module Groups are automatically created.

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

    POST https://[HOST]/groups21/

#### Request Body    
```json
{
    "periodId": "b7126849-a3de-4b40-8c1f-61e79e65ec9a",
    "groups": [
        {
            "groupsAmount": 2,
            "courseKey": "FSC21"
        },
        {
            "groupsAmount": 5,
            "courseKey": "MAT1B"
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
            "id": "252b94a8-7562-4b6d-b780-c04884af3ca9",
            "courseKey": "FSC21"
        },
        {
            "number": 2,
            "matricula": null,
            "formato": null,
            "id": "50bc6e79-fa7f-4e4a-852e-1375ead1be1b",
            "courseKey": "FSC21"
        },
        {
            "number": 1,
            "matricula": null,
            "formato": null,
            "id": "dca3f5f9-8359-4724-8087-e17a06648e07",
            "courseKey": "MAT1B"
        },
        {
            "number": 2,
            "matricula": null,
            "formato": null,
            "id": "63f304c9-5327-44b0-ae3e-c9aded9bf926",
            "courseKey": "MAT1B"
        },
        {
            "number": 3,
            "matricula": null,
            "formato": null,
            "id": "366f9329-1bdb-4253-8fb2-17354e11c2b1",
            "courseKey": "MAT1B"
        },
        {
            "number": 4,
            "matricula": null,
            "formato": null,
            "id": "e53624a3-804b-4181-a368-8b80446e867f",
            "courseKey": "MAT1B"
        },
        {
            "number": 5,
            "matricula": null,
            "formato": null,
            "id": "835fe146-4101-428e-bca5-32411d0b9eee",
            "courseKey": "MAT1B"
        }
    ]
}
```

[GroupCreate]: /server/api-docs/groups/GroupCreate.md
[PeriodInfo]: /server/api-docs/periods/PeriodInfo.md
