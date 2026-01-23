export class networkError extends Error {
    constructor(public type: string, public statusCode: string, public message: string) {
        super(message);
    }
}

export class storeError extends Error {
    constructor(public type: string,  private code: string) {
        let message: string;
        switch(code) {
            case 'EACCES':
                message = "Permission denied while accessing the storage location.";
                break;
            case 'ENOENT':
                message = "Storage location not found.";
                break;
            case 'ENOSPC':
                message = "No space left on device to store data.";
                break;
            case 'EPERM':
                message = "Operation not permitted while accessing the storage location.";
                break;
            case 'EROFS':
                message = "Storage location is read-only.";
                break;
            default:
                message = "An unexpected system error occurred: " + code;
        }
        super(message);
    }
}

