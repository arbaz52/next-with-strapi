
import Router from 'next/router'
const goto = (link) => {
    Router.push(link)
}

export { goto }