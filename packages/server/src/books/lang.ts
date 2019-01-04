import { MyContext } from "src/types/Context";

const langObj = {
    available: ['ru', 'en'],
    default: 'en'
}

export const getAppLang = (ctx: MyContext): string => {
    let lg = ctx.req.headers.lang ? ctx.req.headers.lang.toString() : null
    if (lg && !langObj.available.includes(lg)) {
        lg = null
    }
    
    return lg || langObj.default
}

export default langObj