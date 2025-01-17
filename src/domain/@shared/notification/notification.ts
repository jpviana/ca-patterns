export type NotificationErrorProps = {
    message: string,
    context: string
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error)
    }

    messages(context?: string): string {
        let message = "";
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                message += `${error.context}: ${error.message},`;
            }
        });
        return message;
    }

    hasErrors(): boolean {
        if (this.errors.length > 0) {
            return true;
        }
    }

    getErrors(): NotificationErrorProps[] {
        return this.errors;
    }
}