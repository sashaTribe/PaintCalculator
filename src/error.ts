export class ProjectError extends Error {
    name: Error;
    message: string;
    cause:any;

    constructor(name:Error, message:string, cause:any){
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}