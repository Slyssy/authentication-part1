# authentication-part1

## Todo list for this piece of the project

[X] Adding a register route

[X] Adding a login route

[X] Adding middleware to verify JWT

[X] Create a new table called organizations.

[X] Create a new table called users.

[X] Create a new table called projects.

[X] Create a new table called tasks.

## Create Routes

[X] The createProject route needs to be associated to the user that is
managing that project.

[] The createTask route needs to be associated to the project the task is assigned
to.

## Get Routes

[X] The getProjects route should only fetch the projects associated with the
user that managing those projects.

[] The getTasks route should only fetch the tasks associated to the project that is
logged in.

## Get By ID Routes

[X] The getProjectByID route should only fetch the project if the project is assigned to
that user.

[] The getTaskByID route should only fetch the task if the task is assigned to
that user.

## Update Routes

[X] The updateProject route should only update the project if the project is assigned to
that user.

[] The updateTask route should only update the task if the task is assigned to
that user.

## Delete Routes

[X] The deleteProject route should only delete the project if the project is assigned to
that user.

[] The deleteTask route should only delete the task if the task is assigned to
that user.
