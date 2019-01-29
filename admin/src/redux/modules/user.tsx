import * as dotProp from "dot-prop-immutable"
import { EALGISApiClient } from "../../shared/api/EALGISApiClient"
// import { IAnalyticsMeta } from "../../shared/analytics/GoogleAnalytics"

// Actions
const LOAD_USER = "ealgis/user/LOAD_USER"

const initialState: IModule = {
    user: {} as IUser,
}

// Reducer
export default function reducer(state: IModule = initialState, action: IAction) {
    switch (action.type) {
        case LOAD_USER:
            return dotProp.set(state, "user", action.user)
        default:
            return state
    }
}

// Action Creators
export function loadUser(self: ISelf) {
    return {
        type: LOAD_USER,
        user: self.user || null,
    }
}

// Models
export interface IModule {
    user: IUser
}

export interface IAction {
    type: string
    user?: IUser
    meta?: {
        // analytics: IAnalyticsMeta
    }
}

export interface ISelf {
    success: boolean
    user: IUser
}

export interface IUser {
    email: string
}

// Side effects, only as applicable
// e.g. thunks, epics, et cetera
export function fetchUser() {
    return async (dispatch: Function, getState: Function, api: EALGISApiClient) => {
        const { response, json } = await api.get("https://localhost:8001/api/0.1/self", dispatch)
        if (response.status === 200) {
            dispatch(loadUser(json))
            return json
        }
    }
}

export function logoutUser() {
    return async (dispatch: Function, getState: Function, api: EALGISApiClient) => {
        await api.dsGet("/login.php?nuke_session=1", dispatch)
        window.location.reload()
    }
}
