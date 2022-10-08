# authentication-part1

## Todo list for this piece of the project

[X] Adding a register route

[] Adding a login route

[] Adding middleware to verify JWT

[] Create a new table called organizations.

[] Create a new table called users.

[] Create a new table called projects.

[] Create a new table called tasks.

## Create Routes

[] The createProject route needs to be associated to the organization that is
managing that project.

[] The createTask route needs to be associated to the project the task is assigned
to.

## Get Routes

[] The getProjects route should only fetch the projects associated with the
organization that managing those projects.

[] The getTasks route should only fetch the tasks associated to the project that is
logged in.

## Get By ID Routes

[] The getProjectByID route should only fetch the project if the project is assigned to
that organization.

[] The getTaskByID route should only fetch the task if the task is assigned to
that user.

## Update Routes

[] The updateProject route should only update the project if the project is assigned to
that organization.

[] The updateTask route should only update the task if the task is assigned to
that user.

## Delete Routes

[] The deleteProject route should only delete the project if the project is assigned to
that organization.

[] The deleteTask route should only delete the task if the task is assigned to
that user.
