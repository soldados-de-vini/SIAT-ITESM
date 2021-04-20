# Create Professor

    POST professors/
    
Creates a new set of Professors for the user requesting it.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
professors | [ProfessorInfo][] | [X] | The set of professors to be created.

## Example
### Request

    POST https://[HOST]/professors

#### Request Body    
```json
{
    "professors": [
        {
            "nomina": "L01234567",
            "name": "Professor 1",
            "area": ["Mate"],
            "email": "professor1@gmail.com",
            "loadLimit": 16
        },
        {
            "nomina": "L01234568",
            "name": "Professor 2",
            "area": ["Fisica", "Mate"],
            "email": "professor2@gmail.com",
            "coordination": "example",
            "loadLimit": 16
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
            "nomina": "L01234567",
            "name": "Professor 1",
            "area": [
                "Mate"
            ],
            "email": "professor1@gmail.com",
            "loadLimit": 16,
            "coordination": null,
            "id": "a20c8c96-73f1-4554-8313-0ae7fab639f2"
        },
        {
            "nomina": "L01234568",
            "name": "Professor 2",
            "area": [
                "Fisica",
                "Mate"
            ],
            "coordination": "example",
            "email": "professor2@gmail.com",
            "loadLimit": 16,
            "id": "08c283f7-7e81-49c7-98b1-c2ba0fe2db8b"
        }
    ]
}
```

[ProfessorInfo]: /server/api-docs/professors/ProfessorInfo.md