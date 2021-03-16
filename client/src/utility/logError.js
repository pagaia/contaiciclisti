export default function LogError() {
    window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
        console.error(
            'Error: ' +
                errorMsg +
                ' Script: ' +
                url +
                ' Line: ' +
                lineNumber +
                ' Column: ' +
                column +
                ' StackTrace: ' +
                errorObj
        );
    };
    return null;
}
