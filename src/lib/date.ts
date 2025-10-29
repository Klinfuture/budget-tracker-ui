
export const formatDate = (isoDateString: string | Date): string => {

    const date = new Date(isoDateString);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });

    return formattedDate
}