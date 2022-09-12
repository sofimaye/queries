export function pagesToLoad({page, totalPages}) {
    if (page < 1 || page > totalPages) {
        throw Error('Page should be more then 0 and less than totalPages or equal to')
    }
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1) {
            pages.push(i)
        } else if (i === totalPages) {
            pages.push(i)
        }
    }
    if(pages.length > 1){
        let arrayWithMiddlePages = [];
        // n+1
        if ( page !== (pages[1] - 1) && page !== pages[1]) {
            arrayWithMiddlePages.push(page + 1)
        }
        // n-1
        if (page !== pages[0] && page !== 2) {
            arrayWithMiddlePages.push(page - 1)
        }
        // n
        if (page !== pages[0] && page !== pages[1]) {
            arrayWithMiddlePages.push(page)
        }
        return [...pages, ...arrayWithMiddlePages].sort((a, b) => a - b)
    } else {
        return pages
    }

}
