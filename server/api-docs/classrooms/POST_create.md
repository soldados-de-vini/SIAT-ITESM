# Create Classrooms

    POST classrooms/
    
Creates a new set of Classrooms for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
classrooms | [ClassroomInfo][] | [X] | The set of classrooms to be created.

## Example
### Request

    POST https://[HOST]/classrooms

#### Request Body    
```json
{
    "classrooms": [
        {
            "classroom": 237,
            "building": "EIAD",
            "capacity": 30,
            "type": "L",
            "status": "activo"
        },
        {
            "classroom": 238,
            "building": "EIAD",
            "capacity": 30,
            "type": "L",
            "status": "activo",
            "comments": "Cool comments",
            "school": "Ciencias",
            "entrance": "B",
            "currentDiv": "NV",
            "administrator": "MVLKA"
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
            "classroom": 237,
            "building": "EIAD",
            "capacity": 30,
            "type": "L",
            "status": "activo",
            "comments": null,
            "school": null,
            "entrance": null,
            "currentDiv": null,
            "administrator": null,
            "id": "57be0e16-4235-49fb-82b8-c67483da2686"
        },
        {
            "classroom": 238,
            "building": "EIAD",
            "capacity": 30,
            "comments": "Cool comments",
            "type": "L",
            "school": "Ciencias",
            "entrance": "B",
            "currentDiv": "NV",
            "administrator": "MVLKA",
            "status": "activo",
            "id": "93f8b2e5-c2d9-4015-a52b-1d5a68da8aad"
        }
    ]
}
```

[ClassroomInfo]: /server/api-docs/classrooms/ClassroomInfo.md