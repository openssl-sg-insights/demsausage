import * as dotProp from "dot-prop-immutable"
import { sendNotification as sendSnackbarNotification } from "../../redux/modules/snackbars"
import { IAPIClient } from "../../shared/api/APIClient"
import { IElection } from "./elections"
import { IGeoJSONPoint } from "./interfaces"
// import { IAnalyticsMeta } from "../../shared/analytics/GoogleAnalytics"

// Actions
const LOAD = "ealgis/polling_places/LOAD"
const LOAD_TYPES = "ealgis/polling_places/LOAD_TYPES"
const VALIDATION_ERRORS = "ealgis/polling_places/VALIDATION_ERRORS"

const initialState: Partial<IModule> = {
    types: [],
    by_election: {},
}

// Reducer
export default function reducer(state: Partial<IModule> = initialState, action: IAction) {
    switch (action.type) {
        case LOAD:
            return dotProp.set(state, `by_election.${action.election.id}`, action.pollingPlaces)
        case LOAD_TYPES:
            return dotProp.set(state, "types", action.pollingPlaceTypes)
        default:
            return state
    }
}

export const reduxFormReducer = (state: {}, action: any) => {
    switch (action.type) {
        case VALIDATION_ERRORS:
            state = dotProp.set(state, "submitSucceeded", false)
            return dotProp.merge(state, "syncErrors", action.errors)
        default:
            return state
    }
}

// Action Creators
export function loadPollingPlacesForElection(election: IElection, pollingPlaces: Array<IPollingPlace>) {
    return {
        type: LOAD,
        election,
        pollingPlaces,
    }
}

export function loadPollingPlaceTypes(pollingPlaceTypes: Array<string>) {
    return {
        type: LOAD_TYPES,
        pollingPlaceTypes,
    }
}

// Models
export interface IModule {
    types: Array<string>
    by_election: {
        [key: number]: Array<IPollingPlace>
    }
}

export interface IAction {
    type: string
    election: IElection
    pollingPlaces: Array<IPollingPlace>
    pollingPlaceTypes: Array<string>
    errors?: object
    meta?: {
        // analytics: IAnalyticsMeta
    }
}

// @FIXME Use the inbuilt OLFeature type when we upgrade
export interface IMapPollingPlaceFeature {
    getId: Function
    getProperties: Function
}

export interface INoms {
    bbq: boolean
    cake: boolean
    nothing?: boolean
    run_out?: boolean
    bacon_and_eggs: boolean
    halal: boolean
    vego: boolean
    coffee: boolean
    free_text: string
}

export interface IPollingPlaceStall {
    noms: INoms
    name: string
    description: string
    website: string
    extra_info: string
    first_report: string | null // Datetime
    latest_report: string | null // Datetime
    source: string
}

export interface IPollingPlace {
    id: number
    name: string
    geom: IGeoJSONPoint
    facility_type: string | null
    booth_info: string
    wheelchair_access: string
    entrance_desc: string
    opening_hours: string
    premises: string
    address: string
    divisions: string[]
    state: string
    chance_of_sausage: number | null
    stall: IPollingPlaceStall | null
}

export interface IPollingPlaceSearchResult extends IPollingPlace {
    distance_km: number
}

export interface IPollingPlaceLoaderResponse {
    error: boolean
    messages: Array<IPollingPlaceLoaderResponseMessage>
    table_name: string
    dryrun: boolean
}

export interface IPollingPlaceLoaderResponseMessage {
    level: string
    message: string
}

// Side effects, only as applicable
// e.g. thunks, epics, et cetera
export function searchPollingPlaces(election: IElection, searchTerm: string) {
    return async (dispatch: Function, getState: Function, api: IAPIClient) => {
        const { response, json } = await api.get("/api/0.1/polling_places/search/", dispatch, {
            election_id: election.id,
            search_term: searchTerm,
        })
        if (response.status === 200) {
            return json
        }
    }
}

export function fetchAllPollingPlaces(election: IElection) {
    return async (dispatch: Function, getState: Function, api: IAPIClient) => {
        const { response, json } = await api.get("/api/0.1/polling_places/search/", dispatch, {
            election_id: election.id,
        })

        if (response.status === 200) {
            dispatch(loadPollingPlacesForElection(election, json))
        }
    }
}

export function fetchPollingPlacesByIds(election: IElection, pollingPlaceIds: Array<number>) {
    return async (dispatch: Function, getState: Function, api: IAPIClient) => {
        const { response, json } = await api.get("/api/0.1/polling_places/search/", dispatch, {
            election_id: election.id,
            ids: pollingPlaceIds.join(","),
        })

        if (response.status === 200) {
            return json
        }
    }
}

export function updatePollingPlace(election: IElection, pollingPlace: IPollingPlace, pollingPlaceNew: any /* Partial<IPollingPlace> */) {
    return async (dispatch: Function, getState: Function, api: IAPIClient) => {
        const { response, json } = await api.patch(`/api/0.1/polling_places/${pollingPlace.id}/`, pollingPlaceNew, dispatch)

        if (response.status === 200) {
            dispatch(sendSnackbarNotification("Polling place updated! 🌭🎉"))
            return json
        }
    }
}

export function fetchNearbyPollingPlaces(election: IElection, lat: number, lon: number) {
    return async (dispatch: Function, getState: Function, api: IAPIClient) => {
        const { response, json } = await api.get("/api/0.1/polling_places/nearby/", dispatch, {
            election_id: election.id,
            lonlat: `${lon},${lat}`,
        })

        if (response.status === 200) {
            return json
        }
    }
}

// Utilities
export function buildNomsObject(stallNoms: INoms | null) {
    if (stallNoms === null) {
        return {}
    }

    const noms = {}
    const keys = ["bbq", "cake", "nothing", "run_out", "coffee", "vego", "halal", "bacon_and_eggs", "free_text"]

    keys.forEach((key: string) => {
        const value = stallNoms[key]

        if (key !== "free_text") {
            if (value === true) {
                noms[key] = value
            }
        } else {
            if (value !== "") {
                noms[key] = value
            }
        }
    })

    return noms
}
export function pollingPlaceHasReports(pollingPlace: IPollingPlace) {
    if (pollingPlace.stall === null || pollingPlace.stall.noms === null) {
        return false
    }

    for (const [key, value] of Object.entries(pollingPlace.stall.noms)) {
        if (key !== "free_text") {
            if (value === true) {
                return true
            }
        } else {
            if (value !== "") {
                return true
            }
        }
    }
    return false
}

export function pollingPlaceHasReportsOfNoms(pollingPlace: IPollingPlace) {
    if (pollingPlace.stall === null || pollingPlace.stall.noms === null) {
        return false
    }

    for (const [key, value] of Object.entries(pollingPlace.stall.noms)) {
        if (key === "run_out" || key === "nothing") {
            continue
        }

        if (key !== "free_text") {
            if (value === true) {
                return true
            }
        } else {
            if (value !== "") {
                return true
            }
        }
    }
    return false
}

export function getSausageChanceDescription(pollingPlace: IPollingPlace) {
    if (pollingPlace.chance_of_sausage === null) {
        return "UNKNOWN"
    } else if (pollingPlace.chance_of_sausage >= 0.7) {
        return "HIGH"
    } else if (pollingPlace.chance_of_sausage >= 0.4) {
        return "MEDIUM"
    } else {
        return "LOW"
    }
}

export function getFoodDescription(pollingPlace: IPollingPlace) {
    if (pollingPlace.stall === null || pollingPlace.stall.noms === null) {
        return ""
    }

    const noms: Array<string> = []
    if (pollingPlace.stall.noms.bbq) {
        noms.push("sausage sizzle")
    }
    if (pollingPlace.stall.noms.cake) {
        noms.push("cake stall")
    }
    if ("bacon_and_eggs" in pollingPlace.stall.noms && pollingPlace.stall.noms.bacon_and_eggs) {
        noms.push("bacon and egg burgers")
    }
    if ("vego" in pollingPlace.stall.noms && pollingPlace.stall.noms.vego) {
        noms.push("vegetarian options")
    }
    if ("halal" in pollingPlace.stall.noms && pollingPlace.stall.noms.halal) {
        noms.push("halal options")
    }
    if ("coffee" in pollingPlace.stall.noms && pollingPlace.stall.noms.coffee) {
        noms.push("coffee")
    }
    return noms.join(", ")
}
