import UserRequest from "./UserRequest";
import Nationality from "./NationalityRequest";
import EmployeeRequest from "./EmployeeRequest";
import EmployeeStatusRequest from "./EmployeeStatusRequest";
import JobRequest from "./JobRequest";
import PayGradeRequest from "./PayGradeRequest";
import SkillRequest from "./SkillRequest";
import SkillUserRequest from "./SkillUserRequest";

const requestMap = {
  UserRequest,
  Nationality,
  EmployeeRequest,
  EmployeeStatusRequest,
  JobRequest,
  PayGradeRequest,
  SkillRequest,
  SkillUserRequest
};

const instances = {};

export default class RequestFactory {
  static getRequest(classname) {
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[classname] = requestInstance;
    }

    return requestInstance;
  }
}
