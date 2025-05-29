import user from './assets/user.png';

function Top() {
    return (
        <>
            <div className="LandingContainer">
                <div className="LogoName">
                    <p className="logo">planSafe</p>
                </div>
                <div className="user">
                    <img src={user} alt="" />
                </div>
            </div>
        </>
    )
}

export default Top