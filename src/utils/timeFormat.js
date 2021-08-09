export function timeFormat(stamp){
    let date = new Date(parseInt(stamp))
    let year = date.getFullYear()
    let month = date.getMonth() + 1;
    let day = date.getDate()
    return `${year}/${month}/${day}`;
}