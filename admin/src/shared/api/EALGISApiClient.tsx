import * as Cookies from "js-cookie"
import * as qs from "qs"
import * as Raven from "raven-js"
import "whatwg-fetch"
import { beginFetch, finishFetch, getAPIBaseURL } from "../../redux/modules/app"

export class EALGISApiClient {
    dsBaseURL: string
    cartoBaseURL: string
    cartoBridgeBaseURL: string

    constructor() {
        this.dsBaseURL = getAPIBaseURL()
        this.cartoBaseURL = "https://democracy-sausage.cartodb.com/api/v2/sql"
        this.cartoBridgeBaseURL = `${this.dsBaseURL}/cartodb-api-bridge.php`
    }

    public paramsToSQL(params: object = {}): string {
        return Object.keys(params)
            .map((key: string) => {
                // Booleans
                if (key === "has_bbq" || key === "has_caek" || key === "has_nothing" || key === "has_run_out") {
                    return `${key} = ${params[key]}`
                } else if (key === "cartodb_id") {
                    return null
                }
                return `${key} = '${params[key].replace(/'/, "\\'")}'`
            })
            .join(", ")
    }

    public cartoGetSQL(sql: string, dispatch: Function): Promise<IApiResponse> {
        const params: object = { q: sql }
        const fetchOptions: object = { credentials: "omit" }
        return this.get(this.cartoBaseURL, dispatch, params, fetchOptions)
    }

    public cartoBridgeGetSQL(sql: string, dispatch: Function): Promise<IApiResponse> {
        const params: object = { q: sql }
        const fetchOptions: object = { credentials: "omit" }
        return this.get(this.cartoBridgeBaseURL, dispatch, params, fetchOptions)
    }

    public dsGet(url: string, dispatch: Function, params: object = {}): Promise<IApiResponse> {
        return this.get(this.dsBaseURL + url, dispatch, params)
    }

    public dsAPIGet(params: object = {}, dispatch: Function): Promise<IApiResponse> {
        return this.get(this.dsBaseURL + "/api.php", dispatch, params)
    }

    public dsAPIPost(params: object = {}, body: any, dispatch: Function): Promise<IApiResponse> {
        return this.post(this.dsBaseURL + "/api.php", body, dispatch)
    }

    public dsAPIPostFile(params: object = {}, file: File, dispatch: Function): Promise<IApiResponse> {
        let data = new FormData()
        data.append("file", file)

        return this.post(this.dsBaseURL + "/api.php", data, dispatch)
    }

    public dsAPIPut(params: object = {}, dispatch: Function): Promise<IApiResponse> {
        return this.put(this.dsBaseURL + "/api.php", params, dispatch)
    }

    public dsAPIDelete(dispatch: Function): Promise<IApiResponse> {
        return this.delete(this.dsBaseURL + "/api.php", dispatch)
    }

    public get(url: string, dispatch: Function, params: object = {}, fetchOptions: object = {}): Promise<IApiResponse> {
        dispatch(beginFetch())

        if (Object.keys(params).length > 0) {
            // Yay, a library just to do query string operations for fetch()
            // https://github.com/github/fetch/issues/256
            url += "?" + qs.stringify(params)
        }

        return fetch(url, { ...{ credentials: "include" }, ...fetchOptions })
            .then((response: any) => {
                dispatch(finishFetch())
                return response.json().then((json: any) => {
                    if (json.error) {
                        // @FIXME Re-enable once we've turned off the PHP API
                        // this.handleError(json.messages, url, dispatch)
                    }

                    return {
                        response: response,
                        json: json,
                    }
                })
            })
            .catch((error: any) => this.handleError(error, url, dispatch))
    }

    public post(url: string, body: any, dispatch: any): Promise<IApiResponse> {
        dispatch(beginFetch())

        return fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")!,
            },
            body: JSON.stringify(body),
        })
            .then((response: any) => {
                dispatch(finishFetch())
                return response.json().then((json: any) => ({
                    response: response,
                    json: json,
                }))
            })
            .catch((error: any) => this.handleError(error, url, dispatch))
    }

    public put(url: string, body: object, dispatch: any): Promise<IApiResponse> {
        dispatch(beginFetch())

        return fetch(url, {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")!,
            },
            body: JSON.stringify(body),
        })
            .then((response: any) => {
                dispatch(finishFetch())
                return response.json().then((json: any) => ({
                    response: response,
                    json: json,
                }))
            })
            .catch((error: any) => this.handleError(error, url, dispatch))
    }

    public delete(url: string, dispatch: any): Promise<IApiResponse> {
        dispatch(beginFetch())

        return fetch(url, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": Cookies.get("csrftoken")!,
            },
        })
            .then((response: any) => {
                dispatch(finishFetch())
                return response
            })
            .catch((error: any) => this.handleError(error, url, dispatch))
    }

    // Only handles fatal errors from the API
    // FIXME Refactor to be able to handle errors that the calling action can't handle
    private handleError(error: any, url: string, dispatch: any) {
        Raven.captureException(error)
        Raven.showReportDialog()
    }
}

// Models
export interface IEALGISApiClient {
    handleError: Function
    dsGet: Function
    dsAPIGet: Function
    dsAPIPost: Function
    dsAPIPostFile: Function
    dsAPIPut: Function
    dsAPIDelete: Function
    paramsToSQL: Function
    cartoGetSQL: Function
    cartoBridgeGetSQL: Function
    get: Function
    post: Function
    put: Function
    delete: Function
}

export interface IApiResponse {
    response: Response
    json: any
}

export interface IHttpResponse {
    status: number
}

export interface ICartoAPIResponse {
    // rows: Array<object>
    time: number
    fields: {
        [key: string]: {
            type: string
        }
    }
    total_rows: number
}
