// tslint:disable:max-line-length

import SvgIcon from "material-ui/SvgIcon"
import * as React from "react"
import { pure } from "recompose"

let svg = (props: any) => (
    <SvgIcon {...props} className={"disabled" in props && props.disabled === true ? "greyscale" : undefined}>
        <svg viewBox="0 0 512 512" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
            <path
                d="M141.92 42.268c-11.533 8.477-22.334 18.201-30.437 30.001-7.63 11.112-12.675 23.768-17.261 36.443-10.556 29.172-19.058 61.053-10.579 90.896 5.623 19.79 18.192 36.714 28.836 54.32 10.644 17.606 19.778 37.607 17.3 58.03-1.686 13.895 1.053 68.123 105.575 94.685 51.738 13.148 107.576 15.511 156.664-5.465 49.088-20.976 89.636-62.667 106.092-113.45 4.209-12.988 6.888-26.619 6.219-40.256a84.143 84.143 0 0 0-9.735-35.287c-6.412-12.041-16.025-23.347-16.418-36.983-.192-6.646 1.887-13.114 3.225-19.627 7.017-34.164-7.086-70.345-30.864-95.86-23.778-25.516-55.089-45.587-89.314-52.3C273.687-9.759 194.899 3.327 141.92 42.268z"
                fill="#f9e8d4"
                fillRule="nonzero"
            />
            <circle cx="341.672" cy="207.965" r="86.057" fill="#fec007" />
            <path
                d="M498.105 287.73c-16.448 50.776-57.001 92.47-106.092 113.448-12.341 5.277-25.105 9.071-38.132 11.594-38.768 7.507-79.796 3.703-118.523-6.135-104.528-26.558-107.262-80.785-105.577-94.68 2.472-20.423-6.66-40.423-17.305-58.031-10.635-17.608-23.208-34.53-28.829-54.317-5.146-18.113-4.046-36.982-.01-55.528 2.603-12.018 6.438-23.904 10.585-35.367 4.591-12.674 9.637-25.337 17.265-36.447 8.103-11.796 18.9-21.523 30.433-29.999C194.894 3.328 273.692-9.759 361.227 7.415c34.217 6.71 65.528 26.78 89.311 52.299 23.773 25.519 37.88 61.694 30.867 95.86-1.342 6.508-3.421 12.976-3.229 19.626.394 13.632 10.01 24.944 16.417 36.982a84.195 84.195 0 0 1 9.737 35.287c.667 13.642-2.007 27.274-6.225 40.261z"
                fill="#f9e8d4"
                fillRule="nonzero"
            />
            <path
                d="M353.881 412.772c-38.768 7.507-79.796 3.703-118.523-6.135-104.528-26.558-107.262-80.785-105.577-94.68 2.472-20.423-6.66-40.423-17.305-58.031-10.635-17.608-23.208-34.53-28.829-54.317-5.146-18.113-4.046-36.982-.01-55.528l9.223 3.764c9.041 3.683 17.729 9.536 25.115 16.932 7.386 7.386 13.239 16.064 16.922 25.105 2.179 5.338 5.741 10.575 10.302 15.146 4.561 4.551 9.798 8.113 15.136 10.292 9.041 3.683 17.729 9.536 25.115 16.932 7.386 7.386 13.239 16.064 16.922 25.105 2.18 5.338 5.742 10.575 10.303 15.136 4.561 4.561 9.798 8.123 15.136 10.302 9.041 3.683 17.729 9.536 25.115 16.932 7.386 7.376 13.239 16.064 16.922 25.105 2.18 5.338 5.741 10.575 10.302 15.136 4.571 4.571 9.798 8.123 15.126 10.292 9.051 3.693 17.729 9.546 25.126 16.942 7.396 7.386 13.249 16.074 16.922 25.115 2.18 5.328 5.742 10.565 10.303 15.126a50.289 50.289 0 0 0 6.254 5.329z"
                fill="#efcdb1"
                fillRule="nonzero"
            />
            <circle cx="341.672" cy="207.965" r="104.013" fill="#efcdb1" />
            <path
                d="M498.105 287.73c-16.448 50.776-57.001 92.47-106.092 113.448-30.171 12.896-62.904 16.972-95.658 15.136 26.619-.373 52.905-5.035 77.495-15.539 49.09-20.978 89.644-62.662 106.092-113.448 4.218-12.987 6.892-26.619 6.226-40.261a84.218 84.218 0 0 0-9.737-35.287c-6.407-12.038-16.024-23.339-16.417-36.982-.192-6.64 1.887-13.108 3.229-19.626 7.013-34.167-7.094-70.341-30.867-95.86-23.783-25.509-55.094-45.589-89.311-52.299C323.6 3.198 304.57.867 286.164.009c23.965-.111 49.131 2.321 75.064 7.406 34.217 6.71 65.528 26.78 89.311 52.299 23.773 25.519 37.88 61.694 30.867 95.86-1.342 6.508-3.421 12.976-3.229 19.626.394 13.632 10.01 24.944 16.417 36.982a84.195 84.195 0 0 1 9.737 35.287c.666 13.642-2.008 27.274-6.226 40.261z"
                fill="#efcdb1"
                fillRule="nonzero"
            />
            <circle cx="341.672" cy="207.965" r="86.057" fill="#fec007" />
            <circle cx="328.918" cy="182.712" r="28.814" fill="#f9de69" />
            <path
                d="M376.06 75.478a7.751 7.751 0 0 1-7.752-7.752v-1.664a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.664a7.751 7.751 0 0 1-7.752 7.752zM186.358 153.513a7.751 7.751 0 0 1-7.752-7.752v-1.664a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.664a7.751 7.751 0 0 1-7.752 7.752zM395.297 89.765a7.751 7.751 0 0 1-7.752-7.752v-1.664a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.664a7.75 7.75 0 0 1-7.752 7.752zM219.657 152.681a7.751 7.751 0 0 1-7.752-7.752v-1.665a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.665a7.751 7.751 0 0 1-7.752 7.752zM213.602 241.01a7.751 7.751 0 0 1-7.752-7.752v-1.664a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.664a7.751 7.751 0 0 1-7.752 7.752zM232.775 73.16a7.751 7.751 0 0 1-7.752-7.752v-1.664a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.664a7.751 7.751 0 0 1-7.752 7.752zM413.395 312.81a7.751 7.751 0 0 1-7.752-7.752v-1.664a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.664a7.751 7.751 0 0 1-7.752 7.752zM395.297 342.073a7.751 7.751 0 0 1-7.752-7.752v-1.664a7.751 7.751 0 0 1 7.752-7.752 7.751 7.751 0 0 1 7.752 7.752v1.664a7.75 7.75 0 0 1-7.752 7.752z"
                fill="#efcdb1"
                fillRule="nonzero"
            />
            <g fillRule="nonzero">
                <path
                    d="M296.1 458.486c-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766L9.966 232.943c-3.673 3.673-3.047 9.824 1.334 12.614 3.871 2.465 7.641 5.474 11.169 9.001 6.274 6.274 10.909 13.322 13.761 20.344 2.859 7.014 7.494 14.063 13.775 20.344 6.274 6.274 13.322 10.909 20.337 13.768 7.021 2.852 14.07 7.487 20.35 13.768 6.274 6.274 10.909 13.322 13.761 20.344 2.859 7.014 7.494 14.063 13.775 20.344 6.274 6.274 13.322 10.909 20.337 13.768 7.021 2.852 14.07 7.487 20.351 13.768 6.274 6.274 10.909 13.322 13.761 20.344 2.859 7.014 7.494 14.063 13.775 20.344 6.274 6.274 13.329 10.916 20.337 13.768 7.021 2.852 14.07 7.487 20.351 13.768 6.274 6.274 10.916 13.329 13.761 20.344 2.859 7.014 7.494 14.063 13.775 20.344 4.577 4.577 9.571 8.286 14.658 11.065 3.202 1.749 7.167 1.216 9.747-1.364l37.365-37.365c-7.014-2.857-14.069-7.491-20.346-13.768z"
                    fill="#fb4239"
                />
                <path
                    d="M315.025 473.673c-7.294-2.573-14.513-7.045-20.79-13.322-6.277-6.277-10.748-13.496-13.322-20.79-2.574-7.294-7.045-14.513-13.322-20.79-6.277-6.277-13.496-10.748-20.79-13.322-7.294-2.573-14.513-7.044-20.79-13.322-6.277-6.277-10.748-13.496-13.322-20.79-2.574-7.294-7.045-14.513-13.322-20.79-6.277-6.277-13.496-10.748-20.79-13.322-7.294-2.573-14.513-7.045-20.79-13.322-6.277-6.277-10.748-13.496-13.322-20.79-2.574-7.294-7.045-14.513-13.322-20.79-6.277-6.277-13.496-10.748-20.79-13.322-7.294-2.573-14.513-7.045-20.79-13.322-6.277-6.277-10.748-13.496-13.322-20.79-2.574-7.294-7.045-14.513-13.322-20.79-6.277-6.277-13.496-10.748-20.79-13.322l23.852-23.852c7.294 2.573 14.513 7.045 20.79 13.322 6.277 6.277 10.748 13.496 13.322 20.79 2.574 7.294 7.045 14.513 13.322 20.79 6.277 6.277 13.496 10.748 20.79 13.322 7.294 2.573 14.513 7.045 20.79 13.322 6.277 6.277 10.748 13.496 13.322 20.79 2.574 7.294 7.045 14.513 13.322 20.79 6.277 6.277 13.496 10.748 20.79 13.322 7.294 2.574 14.513 7.045 20.79 13.322 6.277 6.277 10.748 13.496 13.322 20.79 2.574 7.294 7.045 14.513 13.322 20.79 6.277 6.277 13.496 10.748 20.79 13.322 7.294 2.573 14.513 7.045 20.79 13.322 6.277 6.277 10.748 13.496 13.322 20.79 2.574 7.294 7.045 14.513 13.322 20.79 6.277 6.277 13.496 10.748 20.79 13.322l-23.852 23.852z"
                    fill="#f9e8d4"
                />
                <path
                    d="M348.693 426.052c-3.87-2.464-7.64-5.469-11.163-8.991-6.281-6.281-10.909-13.336-13.768-20.351-2.852-7.007-7.487-14.07-13.761-20.344-6.281-6.281-13.336-10.909-20.35-13.768-7.007-2.852-14.07-7.487-20.344-13.761-6.281-6.281-10.909-13.336-13.768-20.35-2.859-7.014-7.487-14.07-13.761-20.344-6.281-6.281-13.336-10.909-20.351-13.768-7.014-2.859-14.07-7.487-20.344-13.761-6.281-6.281-10.909-13.336-13.768-20.35-2.859-7.014-7.487-14.07-13.761-20.344-6.281-6.281-13.336-10.909-20.35-13.768-7.014-2.859-14.07-7.487-20.344-13.761-6.281-6.281-10.909-13.336-13.768-20.351-2.859-7.014-7.487-14.07-13.761-20.344-4.584-4.584-9.581-8.288-14.674-11.067-3.202-1.747-7.165-1.213-9.744 1.366l-16.352 16.352c7.013 2.855 14.068 7.489 20.345 13.767 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.767 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.332 10.911 20.344 13.766l12.574-12.574c3.68-3.668 3.053-9.82-1.33-12.61z"
                    fill="#fb4239"
                />
                <g fill="#e21717">
                    <path d="M296.1 458.486c-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766L32.39 210.518l-21.029 21.029 5.67 2.311c5.485 2.235 10.854 5.89 15.551 10.587 4.69 4.69 8.344 10.059 10.58 15.544 3.682 9.03 9.544 17.731 16.95 25.136 7.412 7.412 16.113 13.274 25.15 16.963 5.478 2.228 10.847 5.883 15.544 10.58 4.69 4.69 8.344 10.059 10.58 15.544 3.682 9.03 9.544 17.731 16.956 25.143 7.412 7.412 16.106 13.268 25.143 16.956 5.478 2.228 10.847 5.883 15.544 10.58 4.69 4.69 8.344 10.059 10.58 15.544 3.682 9.03 9.544 17.731 16.956 25.143 7.412 7.412 16.106 13.268 25.143 16.956 5.478 2.228 10.847 5.883 15.544 10.58 4.69 4.69 8.351 10.066 10.58 15.544 3.682 9.03 9.545 17.731 16.956 25.143 5.904 5.904 12.616 10.82 19.672 14.433l21.029-21.029 10.955-10.955c-7.012-2.853-14.067-7.487-20.344-13.764zM84.907 192.114c6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.767 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.332 10.911 20.344 13.766l11.156-11.156-5.67-2.311c-5.478-2.228-10.854-5.89-15.544-10.58-4.697-4.697-8.352-10.066-10.58-15.544-3.682-9.044-9.538-17.738-16.95-25.15-7.412-7.412-16.113-13.274-25.15-16.95-5.478-2.228-10.854-5.89-15.544-10.58-4.697-4.697-8.351-10.066-10.58-15.544-3.682-9.044-9.538-17.738-16.95-25.15-7.412-7.412-16.113-13.274-25.15-16.95-5.485-2.235-10.854-5.89-15.544-10.58-4.697-4.697-8.351-10.066-10.58-15.544-3.682-9.044-9.538-17.738-16.95-25.15-7.412-7.412-16.113-13.274-25.15-16.95-5.485-2.235-10.854-5.89-15.551-10.587-4.69-4.69-8.344-10.059-10.58-15.544-3.675-9.037-9.538-17.738-16.943-25.143-5.904-5.904-12.623-10.827-19.679-14.44L64.554 178.34c7.02 2.862 14.076 7.497 20.353 13.774z" />
                </g>
                <path
                    d="M295.416 493.282c-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.012-2.854-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766-7.013-2.855-14.068-7.489-20.345-13.766-6.277-6.277-10.912-13.332-13.766-20.345-2.855-7.013-7.489-14.068-13.766-20.345-6.277-6.277-13.333-10.912-20.345-13.766l21.01-21.01c7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766 7.013 2.855 14.068 7.489 20.345 13.766 6.277 6.277 10.912 13.332 13.766 20.345 2.855 7.013 7.489 14.068 13.766 20.345 6.277 6.277 13.333 10.912 20.345 13.766l-21.01 21.01z"
                    fill="#ff8859"
                />
            </g>
        </svg>
    </SvgIcon>
)

let BaconandEggsIcon: any = pure(svg)
BaconandEggsIcon.displayName = "BaconandEggsIcon"
BaconandEggsIcon.muiName = "SvgIcon"

export default BaconandEggsIcon
