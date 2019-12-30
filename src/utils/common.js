export function replaceIdNo(num) {
    return num.replace(/^(.{4})(?:\d+)(.{4})$/, "$1****$2")
}