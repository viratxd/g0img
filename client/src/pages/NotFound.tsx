import { NavLink } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="not-found">
            <h1>Sorry, we can't find that page.</h1>
            <NavLink to={"/"}>Back to Home 🏠</NavLink>
        </div>
    )
}