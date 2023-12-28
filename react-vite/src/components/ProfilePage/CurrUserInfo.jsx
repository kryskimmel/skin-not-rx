import { useSelector } from "react-redux"
// import { useEffect } from "react"

function CurrUserInfo () {
    // const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)


    return (
        <>
        <h1>Current User Info</h1>
        <ul>
            {currentUser
            ? Object.keys(currentUser).map((attr) => (
                <li key={attr} style={{listStyle:"none"}}> {attr.toUpperCase()}: <span style={{color:"green"}}>{currentUser[attr]}</span></li>))
            : <p> No user info to display!</p>}
        </ul>
        </>
    )
}

export default CurrUserInfo;
