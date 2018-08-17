const library = {}

library.comma = (number) => {
    let reg = /(^[+-]?\d+)(\d{3})/;
    number += '';
    while (reg.test(number)) {
        number = number.replace(reg,'$1,$2');
    }
    return number;
}
library.dateFormat = (date) => {
    let y = date.substring(0, 4),
        m = date.substring(4, 6),
        d = date.substring(6, 8);
    return `${y}-${m}-${d}`;
}

export default library;



