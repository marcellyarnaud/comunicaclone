export function createdParamsArray(colunas, p = undefined) {
    let queryParams = [];
    if (p != undefined) {
        for (const [key, value] of Object.entries(p)) {
            if (value != null) {
                queryParams.push(key);
                if (value instanceof Date) {
                    queryParams.push((new Date(value)).getTime())
                } else {
                    queryParams.push(value);
                }
            }
        }
    }

    if (colunas) {
        queryParams.push('colunas');
        queryParams.push(colunas);
    }
    return queryParams;
}