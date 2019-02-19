import NationalityRequest from './NationalityRequest'
import EmployeeRequest from './EmployeeRequest'
import EmployeeStatusRequest from './EmployeeStatusRequest'
import JobRequest from './JobRequest'
import PayGradeRequest from './PayGradeRequest'
import SkillUserRequest from './SkillUserRequest'
import DepartmentRequest from './DepartmentRequest'
import EducationRequest from './EducationRequest'
import QualificationRequest from './QualificationRequest'
import DependentsRequest from './DependentsRequest'
import CertificationUserRequest from './CertificationUserRequest'
import EmergencyContactsRequest from './EmergencyContactsRequest'
import LanguageRequest from './LanguageRequest'
import UserLanguagesRequest from './UserLanguagesRequest'
import InsuranceRequest from './InsuranceRequest'
import InsurancePaymentRequest from './InsurancePaymentRequest'
import IPDetailRequest from './IPEmployeeRequest'
import RecruitmentRequest from './RecruitmentRequest'
import CandidateRequest from './CandidateRequest'
import InterviewRequest from './InterviewRequest'

const requestMap = {
  NationalityRequest,
  EmployeeRequest,
  EmployeeStatusRequest,
  JobRequest,
  PayGradeRequest,
  SkillUserRequest,
  DepartmentRequest,
  EducationRequest,
  QualificationRequest,
  DependentsRequest,
  CertificationUserRequest,
  EmergencyContactsRequest,
  LanguageRequest,
  UserLanguagesRequest,
  InsuranceRequest,
  InsurancePaymentRequest,
  IPDetailRequest,
  RecruitmentRequest,
  CandidateRequest,
  InterviewRequest
}

const instances = {}

export default class RequestFactory {
  static getRequest(classname) {
    const RequestClass = requestMap[classname]
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`)
    }

    let requestInstance = instances[classname]
    if (!requestInstance) {
      requestInstance = new RequestClass()
      instances[classname] = requestInstance
    }

    return requestInstance
  }
}
