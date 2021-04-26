# Get User Classrooms

    GET classrooms/
    
Gets all the classrooms of the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

## Example
### Request

    GET https://[HOST]/classrooms

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Searched user data successfully."
    },
    "result": [
        {
            "id": "57be0e16-4235-49fb-82b8-c67483da2686",
            "classroom": 237,
            "building": "EIAD",
            "capacity": 30,
            "comments": null,
            "type": "L",
            "school": null,
            "entrance": null,
            "currentDiv": null,
            "administrator": null,
            "status": "activo"
        },
        {
            "id": "93f8b2e5-c2d9-4015-a52b-1d5a68da8aad",
            "classroom": 238,
            "building": "EIAD",
            "capacity": 30,
            "comments": "Cool comments",
            "type": "L",
            "school": "Ciencias",
            "entrance": "B",
            "currentDiv": "NV",
            "administrator": "MVLKA",
            "status": "activo"
        }
    ]
}
```
