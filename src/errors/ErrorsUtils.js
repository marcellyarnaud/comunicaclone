import { NotLoggedInError } from "./NotLoggedInError";
import { notifyNotLoggedIn, notifyMessage, ERROR, WARNING } from "../mixins/notificationMessages";

export function treatError(e, message) {
    if (e instanceof NotLoggedInError) {
        notifyNotLoggedIn();
    } else {
        notifyMessage(message, e.message, ERROR);
    }
}

export function treatWarning(titulo, message) {
    notifyMessage(titulo, message, WARNING);
}