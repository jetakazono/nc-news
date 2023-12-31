export const formatDate = (date) => {
    const newDate = new Date(date)

    let dateFormated =
        ("0" + newDate.getDate()).slice(-2) +
        "-" +
        ("0" + (newDate.getMonth() + 1)).slice(-2) +
        "-" +
        newDate.getFullYear() +
        "  " +
        ("0" + newDate.getHours()).slice(-2) +
        ":" +
        ("0" + newDate.getMinutes()).slice(-2)
    return dateFormated
}
