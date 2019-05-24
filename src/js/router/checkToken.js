import utils from '@/js/asset'
export const requireAuth = (nextState, replace) => {
    console.log(nextState)
    const token = utils.Cookies.get('token');
    if (!token) {
        const location = nextState.location
        replace({
            pathname: `/login`,
            query: {
                redict: location.pathname + location.search
            },
            // params: location.params
        })
    }
}

export const backHome = (nextState, replace) => {
    const token = utils.Cookies.get('token');
    if (!token) {
        replace({
            pathname: `/login`
        })
    } else {
        replace({
            pathname: `/space/build/list`,
        })
    }

}
