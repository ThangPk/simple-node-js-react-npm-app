export default class ApiResults {
  constructor(isSuccess, data, errorMessage, details) {
    this.isSuccess = false;
    this.errorMessage = null;
    this.data = null;
    this.details = null;
  }
}
