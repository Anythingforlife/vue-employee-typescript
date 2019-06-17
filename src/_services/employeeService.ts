import { httpService } from '../core';

export const employeeService = {
  employeesData,
  addEmployee,
  editEmployee,
  deleteEmployee,
};

function employeesData(paginationData: { currentPage: number; perPage: number; }) {
  return httpService.get('employees?currentPage=' + paginationData.currentPage + '&perPage=' + paginationData.perPage);
}

function addEmployee(employee: any) {
  return httpService.postMethod('employees', employee);
}

function editEmployee(employeeId: string, employee: any) {
  return httpService.putMethod('employees/' + employeeId, employee);
}

function deleteEmployee(employeeId: string) {
  return httpService.deleteMethod('employees/' + employeeId);
}
