export const formatDate = (dataStr: string) => {
    const [ano, mes, day] = dataStr.split('-')
    return `${day}/${mes}/${ano}`
}