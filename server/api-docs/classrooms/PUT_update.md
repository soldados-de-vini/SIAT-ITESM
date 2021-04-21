# PUT Classroom

    PUT classrooms/:id
    
Updates the classroom of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
building | string | X | The name of the building where the classroom is.
capacity | number | X | The max number of students that can be on the classroom.
type | string | X | Identifier of the type of classroom.
status | string | X | If the classroom is active or inactive.
comments | string |  | User comments on the classroom.
school | string |  | School that the classroom belongs to.
entrance | string |  | The entrance where the classroom is in.
currentDiv | string |  | Current div of the classroom.
administrator | string |  | Administrator of the classroom.

## Example
### Request

    POST https://[HOST]/classrooms/57be0e16-4235-49fb-82b8-c67483da2686

#### Request Body    
```json
{
    "building": "EIAD",
    "capacity": 30,
    "type": "C",
    "status": "desactivo",
    "comments": "Comentario",
    "administrator": "MVLKA"
}
```

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Updated successfully."
    },
    "result": {
        "id": "57be0e16-4235-49fb-82b8-c67483da2686",
        "classroom": 237,
        "building": "EIAD",
        "capacity": 30,
        "comments": "Comentario",
        "type": "C",
        "school": null,
        "entrance": null,
        "currentDiv": null,
        "administrator": "MVLKA",
        "status": "desactivo"
    }
}
```
