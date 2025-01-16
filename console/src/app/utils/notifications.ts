import { toast } from "react-toastify";
import { JSX } from "react";

export enum Themes {
    colored = 'colored',
    dark = 'dark',
    light = 'light',
}

export enum NotificationType {
    ERROR = 'error',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning'
}

export enum PositionsOnPage {
    BOTTOM_CENTER = 'bottom-center',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    TOP_CENTER = 'top-center',
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
}

export class NotificationParameters {
    constructor(
        public label: string = '',
        public description: string | JSX.Element = '',
        public type: NotificationType = NotificationType.ERROR,
        public theme: Themes = Themes.dark,
    ) { }
}

export class NotificationsPlugin {
    private static notify(message: string, type = NotificationType.ERROR, theme = Themes.dark) {
        toast[type]!(message, {
            position: PositionsOnPage.TOP_RIGHT,
            theme,
        });
    };

    static error(message: string, theme = Themes.dark) {
        NotificationsPlugin.notify(message, NotificationType.ERROR, theme);
    };

    static success(message: string, theme = Themes.dark) {
        NotificationsPlugin.notify(message, NotificationType.SUCCESS, theme);
    };

    static info(message: string, theme = Themes.dark) {
        NotificationsPlugin.notify(message, NotificationType.INFO, theme);
    };
};
