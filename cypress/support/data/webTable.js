const departments = ["QA", "Automation"];

function buildWebTableRecord() {
    const suffix = Date.now();

    return {
        firstName: `Nome${suffix}`,
        lastName: `Sobrenome${suffix}`,
        email: `user_${suffix}@test.com`,
        age: 30,
        salary: 5000,
        department: departments[0],
        updatedDepartment: departments[1],
    };
}

export {
    departments,
    buildWebTableRecord,
};
