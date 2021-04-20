# PUT Professor

    PUT professors/:id
    
Updates the professor of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
name | string | [x] | Name of the module to be created.
area | string[] | [x] | The areas in which the professor has expertise.
email | string | [x] | Email of the professor
loadLimit | number | [x] | The limit that the professor can have of courses assigned.

## Example
### Request

    POST https://[HOST]/professors/a20c8c96-73f1-4554-8313-0ae7fab639f2

#### Request Body    
```json
{
    "name": "Professor 2",
    "area": ["Fisica", "Quimica"],
    "email": "professorChanged@gmail.com",
    "coordination": "Changed coordination",
    "loadLimit": 16
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
        "id": "a20c8c96-73f1-4554-8313-0ae7fab639f2",
        "nomina": "L01234567",
        "name": "Professor 2",
        "area": [
            "Fisica",
            "Quimica"
        ],
        "coordination": "Changed coordination",
        "email": "professorChanged@gmail.com",
        "loadLimit": 16
    }
}
```
