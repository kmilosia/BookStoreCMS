export const formatDisplayDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' }
    const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options)
    return formattedDate.replace(/\//g, '.')
  }