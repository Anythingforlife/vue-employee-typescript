export function isValidForm(fields: { [x: string]: { invalid: boolean; }; }) {
    return Object.keys(fields).some((key) => fields[key].invalid);
}

export function formControlDirtyStatus(fields: { [x: string]: { dirty: any; touched: any; }; }, controlName: string) {
    return fields[controlName] && (fields[controlName].touched || fields[controlName].dirty);
}
