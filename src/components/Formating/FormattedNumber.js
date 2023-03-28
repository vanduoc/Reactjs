const FormattedNumber = (number) => {
    if (number) {
        number = number.replace(new RegExp("^(\\d{" + (number.length%3?number.length%3:0) + "})(\\d{3})", "g"), "$1 $2").replace(/(\d{3})+?/gi, "$1 ").trim();
        number = number.replace(/\s/g, '.');
    }
    return number
}

export default FormattedNumber