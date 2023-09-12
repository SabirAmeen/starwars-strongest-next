import { headers } from 'next/headers';

export const getHostUrl = () => {
    const headersList = headers();
    if (process.env.NODE_ENV === 'production') {
        return `https://${headersList.get('host')}`
    }
    return `http://${headersList.get('host')}`}