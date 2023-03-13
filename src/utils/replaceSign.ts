const replaceSign = (value: string) => (value.includes(",") ? value.replace(",", ".") : value.replace(".", ","));

export default replaceSign;
