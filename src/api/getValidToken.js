export const getValidToken = () => {
    const rawToken = localStorage.getItem('token')
    if(rawToken){
        const token = rawToken.replace(/^"|"$/g, '');
        return token
    }
}