# Course Info Object
Field | Data Type | Description
--- | --- | ---
key | string | The identifier key of the course.
name | string | Name of the course.
capacity | int | Max student capacity.
semester | string | Identifier that specifies which semester is taking the course.
initialWeek | int | Week in which the course must start on a period.
weeks | int | Duration of the course in a period.
avenue | string[] | The set of avenues that this course belongs to.
typeUF | string | Identifies the type of course. Must be "B" | "M" | "TEC20"
