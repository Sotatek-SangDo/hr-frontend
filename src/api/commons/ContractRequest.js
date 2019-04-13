import BaseRequest from './BaseRequest'

export default class ContractRequest extends BaseRequest {
  getAll(query = {}) {
    const url = ''
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getContractTypies(query = {}) {
    const url = 'contract-typies'
    const request = this.rq(url, this.getMethod(), query = {})
    return request
  }

  getContract(query = {}) {
    const url = 'get-contract'
    const request = this.rq(url, this.getMethod(), query)
    return request
  }

  getModel() {
    return '/contracts'
  }
}
