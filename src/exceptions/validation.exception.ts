import { ValidationError } from "class-validator";

class ValidationException extends Error {
    public status: number;
    public errors : Object
    constructor(status: number, errors: ValidationError[]) {
      super();
      this.status = status;
      this.errors = this.formatError(errors)
    }
    private errorConstraints = (validationError: ValidationError) => {
        if(validationError.constraints)
            return Object.values(validationError.constraints)
    }

    private formatError = (errors: ValidationError[]) => {
        const errorsNew = {}
        errors.forEach((error) => {
            if(error.children.length > 0)
                errorsNew[error.property] = this.formatError(error.children)
            else
                errorsNew[error.property] = this.errorConstraints(error)
        })
        return errorsNew
    }
}
  
  export default ValidationException ;