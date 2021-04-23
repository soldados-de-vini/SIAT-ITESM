# PUT Period

    PUT period/:id
    
Updates the period of the given ID.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### Body Parameters

Field | Data Type | Required | Description
--- | --- | --- | ---
name | string | [x] | Name of the period.
startDate | string | [x] | The start date of the period.
endDate | string | [x] | The end date of the period.
vacations | string[] | [x] | The dates where vacations are present.

**NOTE**: The date formats are 'YYYY-MM-DD'

## Example
### Request

    POST https://[HOST]/periods/b2e0c568-269b-4cf4-9515-93e70fba0330

#### Request Body    
```json
{
    "name": "Ago-Noviembre 2021",
    "startDate": "2021-05-23",
    "endDate": "2021-11-25",
    "vacations": ["2021-05-24"]
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
        "id": "b2e0c568-269b-4cf4-9515-93e70fba0330",
        "name": "Ago-Noviembre 2021",
        "startDate": "2021-05-23",
        "endDate": "2021-11-25",
        "vacations": [
            "2021-05-24"
        ]
    }
}
```
