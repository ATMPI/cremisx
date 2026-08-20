const INITIAL_EMPLOYEES_STORE = [
  {
    id: 1,
    name: "Edward Perry",
    age: 25,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Finance",
    isFullTime: true,
  },
  {
    id: 2,
    name: "Josephine Drake",
    age: 36,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Market",
    isFullTime: false,
  },
  {
    id: 3,
    name: "Cody Phillips",
    age: 19,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Development",
    isFullTime: true,
  },
  {
    id: 4,
    name: "Daisy McCarthy",
    age: 29,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Market",
    isFullTime: true,
  },
  {
    id: 5,
    name: "Lydia McCarthy",
    age: 32,
    joinDate: "2025-07-16T00:00:00.000Z",
    role: "Finance",
    isFullTime: false,
  },
  ...Array.from({ length: 100 }, (_, i) => ({
    id: i + 6,
    name: `Employee ${i + 6}`,
    age: 20 + (i % 30),
    joinDate: new Date(2025, 0, 1 + (i % 365)).toISOString(),
    role: ["Market", "Finance", "Development"][i % 3],
    isFullTime: i % 2 === 0,
  })),
];

export function getEmployeesStore() {
  const stringifiedEmployees = localStorage.getItem("employees-store");
  return stringifiedEmployees
    ? JSON.parse(stringifiedEmployees)
    : INITIAL_EMPLOYEES_STORE;
}

export function setEmployeesStore(employees) {
  return localStorage.setItem("employees-store", JSON.stringify(employees));
}

export async function getMany({ paginationModel, filterModel, sortModel }) {
  const employeesStore = getEmployeesStore();

  let filteredEmployees = [...employeesStore];

  // Apply filters (example only)
  if (filterModel?.items?.length) {
    filterModel.items.forEach(({ field, value, operator }) => {
      if (!field || value == null) {
        return;
      }

      filteredEmployees = filteredEmployees.filter((employee) => {
        const employeeValue = employee[field];

        switch (operator) {
          case "contains":
            return String(employeeValue)
              .toLowerCase()
              .includes(String(value).toLowerCase());
          case "equals":
            return employeeValue === value;
          case "startsWith":
            return String(employeeValue)
              .toLowerCase()
              .startsWith(String(value).toLowerCase());
          case "endsWith":
            return String(employeeValue)
              .toLowerCase()
              .endsWith(String(value).toLowerCase());
          case ">":
            return employeeValue > value;
          case "<":
            return employeeValue < value;
          default:
            return true;
        }
      });
    });
  }

  // Apply sorting
  if (sortModel?.length) {
    filteredEmployees.sort((a, b) => {
      for (const { field, sort } of sortModel) {
        if (a[field] < b[field]) {
          return sort === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return sort === "asc" ? 1 : -1;
        }
      }
      return 0;
    });
  }

  // Apply pagination
  const start = paginationModel.page * paginationModel.pageSize;
  const end = start + paginationModel.pageSize;
  const paginatedEmployees = filteredEmployees.slice(start, end);

  return {
    items: paginatedEmployees,
    itemCount: filteredEmployees.length,
  };
}

export async function getOne(employeeId) {
  const employeesStore = getEmployeesStore();

  const employeeToShow = employeesStore.find(
    (employee) => employee.id === employeeId
  );

  if (!employeeToShow) {
    throw new Error("Employee not found");
  }
  return employeeToShow;
}

export async function createOne(data) {
  const employeesStore = getEmployeesStore();

  const newEmployee = {
    id:
      employeesStore.reduce((max, employee) => Math.max(max, employee.id), 0) +
      1,
    ...data,
  };

  setEmployeesStore([...employeesStore, newEmployee]);

  return newEmployee;
}

export async function updateOne(employeeId, data) {
  const employeesStore = getEmployeesStore();

  let updatedEmployee = null;

  setEmployeesStore(
    employeesStore.map((employee) => {
      if (employee.id === employeeId) {
        updatedEmployee = { ...employee, ...data };
        return updatedEmployee;
      }
      return employee;
    })
  );

  if (!updatedEmployee) {
    throw new Error("Employee not found");
  }
  return updatedEmployee;
}

export async function deleteOne(employeeId) {
  const employeesStore = getEmployeesStore();

  setEmployeesStore(
    employeesStore.filter((employee) => employee.id !== employeeId)
  );
}

// Validation follows the [Standard Schema](https://standardschema.dev/).

export function validate(employee) {
  let issues = [];

  if (!employee.name) {
    issues = [...issues, { message: "Name is required", path: ["name"] }];
  }

  if (!employee.age) {
    issues = [...issues, { message: "Age is required", path: ["age"] }];
  } else if (employee.age < 18) {
    issues = [...issues, { message: "Age must be at least 18", path: ["age"] }];
  }

  if (!employee.joinDate) {
    issues = [
      ...issues,
      { message: "Join date is required", path: ["joinDate"] },
    ];
  }

  if (!employee.role) {
    issues = [...issues, { message: "Role is required", path: ["role"] }];
  } else if (!["Market", "Finance", "Development"].includes(employee.role)) {
    issues = [
      ...issues,
      {
        message: 'Role must be "Market", "Finance" or "Development"',
        path: ["role"],
      },
    ];
  }

  return { issues };
}
