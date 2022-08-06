export function toQueryString(obj: Record<string, unknown>): string {
    let queryString = '';
    Object.keys(obj).forEach((key) => {
        queryString += `${key}=${obj[key as keyof Object]}&`;
    });

    return queryString.slice(0, -1);
}
