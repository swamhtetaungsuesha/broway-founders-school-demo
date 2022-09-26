
export const filterSearch = ({router,page,date}) => {
    const path = router.pathname;
    const query = router.query;
    if (page)  query.page = page;

    if(date) query.date = date;


   router.push({
        pathname : path,
        query : query
    }, undefined, { scroll: false })
}