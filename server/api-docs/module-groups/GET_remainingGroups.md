# Get Module Groups Without Classroom

    GET module-groups/period/:periodId/remaining
    
Gets all the groups of the period where the classroom has not been assigned.

## Parameters

### Headers
Header | Type
--- | ---
Authorization | Bearer Token

### URI Parameters
Field | Description
--- | ---
periodId | The ID of the period that the groups belongs to.

## Example
### Request

    GET https://[HOST]/module-groups/period/66195ba1-ca0e-4f29-9eb8-eb35ddf7c9ee/remaining

### Response
``` json
{
    "status": {
        "statusCode": 200,
        "message": "Successful search"
    },
    "result": [
        {
            "id": "0b9ec4f5-5970-4af9-bbcb-9790f2da579f",
            "group": {
                "id": "252b94a8-7562-4b6d-b780-c04884af3ca9",
                "number": 1,
                "matricula": null,
                "formato": "HDPA",
                "course21": {
                    "id": "a395d93d-5d72-472b-930a-c0d79961c54c",
                    "key": "FSC21",
                    "name": "Fisica 2",
                    "capacity": 30,
                    "semester": "4",
                    "initialWeek": 6,
                    "weeks": 10,
                    "avenue": [
                        "ICN"
                    ],
                    "typeUF": "M"
                }
            },
            "module": {
                "id": "bc8983d5-c8ab-4781-9719-6c25e22d077e",
                "name": "module1"
            }
        }
    ]
}
```
