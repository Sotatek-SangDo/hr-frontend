import UserRequest from "./UserRequest";
import Nationality from "./NationalityRequest";
import EmployeeRequest from "./EmployeeRequest";
import EmployeeStatusRequest from "./EmployeeStatusRequest";
import JobRequest from "./JobRequest";
import PayGradeRequest from "./PayGradeRequest";
import SkillRequest from "./SkillRequest";
import SkillUserRequest from "./SkillUserRequest";
import CompanyRequest from "./CompanyRequest";
import DepartmentRequest from "./DepartmentRequest";
import EducationRequest from "./EducationRequest";
import QualificationRequest from "./QualificationRequest";
import DependentsRequest from "./DependentsRequest";
import CertificationRequest from "./CertificationRequest";
import CertificationUserRequest from "./CertificationUserRequest";
import EmergencyContactsRequest from "./EmergencyContactsRequest";

const requestMap = {
  UserRequest,
  Nationality,
  EmployeeRequest,
  EmployeeStatusRequest,
  JobRequest,
  PayGradeRequest,
  SkillRequest,
  SkillUserRequest,
  CompanyRequest,
  DepartmentRequest,
  EducationRequest,
  QualificationRequest,
  DependentsRequest,
  CertificationRequest,
  CertificationUserRequest,
  EmergencyContactsRequest
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
