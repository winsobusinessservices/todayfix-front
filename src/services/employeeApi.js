import api from "./axiosClient";

export const employeeApi = {
  // GET /api/business/employees/ (List Employees)
  getEmployees: async () => {
    const response = await api.get("/api/business/employees/");
    return response.data;
  },

  // POST /api/business/employees/create/ (Add Employee)
  createEmployee: async (data) => {
    const response = await api.post("/api/business/employees/create/", data);
    return response.data;
  },

  // PUT /api/business/employees/<uuid>/update/ (Update Employee)
  updateEmployee: async (employeeId, data) => {
    const response = await api.put(`/api/business/employees/${employeeId}/update/`, data);
    return response.data;
  },

  // DELETE /api/business/employees/<uuid>/delete/ (Remove Employee)
  deleteEmployee: async (employeeId) => {
    const response = await api.delete(`/api/business/employees/${employeeId}/delete/`);
    return response.data;
  },
};
