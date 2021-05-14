# Put Group

    PUT groups/:id
    
Updates the group of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
id | The ID of the group to be updated.

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
matricula | string | [ ] | Defines if the course must be taken for students with a certain ID.
formato | string | [ ] | The format in which the course will be taken.\
number | number | [ ] | The group number to be assigned.

**NOTE**: The date formats are 'YYYY-MM-DD'

## Example
### Request

    PATCH https://[HOST]/groups/4bbd9ad8-5906-48de-99e9-56d28e7c026c

#### Request Body    
```json
{
    "formato": "HDPA",
    "matricula": "TODAS",
    "number": 1
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
        "id": "4bbd9ad8-5906-48de-99e9-56d28e7c026c",
        "number": 1,
        "formato": "HDPA",
        "matricula": "TODAS"
    }
}
```
