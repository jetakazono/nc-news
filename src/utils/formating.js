export const formatDate = (date) => {
    const dateFormated = new Date(Date.parse(date)).toLocaleString("en-GB", {
        timeZone: "UTC",
    })
    return dateFormated
}
