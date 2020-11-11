
import React, { lazy, Suspense } from 'react'
import NavIconLayout from './nav-menu-icons-layout'
import Loading from '../components/loading';
const SignIn = lazy(()=>import("../pages/sign-in"))
const SignUp = lazy(()=>import("../pages/sign-up"))


const NavIcons = ({menuIconsRef,activeMenuIcons}) => {
    
    const components = (x) => {
        switch (x) {
            case 'signin':
                return (
                    <Suspense fallback={<Loading />}>
                        <SignIn />
                    </Suspense>
                )
            case 'signup':
                return (
                    <Suspense fallback={<Loading />}>
                        <SignUp />
                    </Suspense>
                )
            case 'search':
                return (
                    <Suspense fallback={<Loading />}>
                        <SignIn />
                    </Suspense>
                )
            case 'cart':
                return (
                    <Suspense fallback={<Loading />}>
                        <SignIn />
                    </Suspense>
                )
            case 'person':
                return (
                    <Suspense fallback={<Loading />}>
                        <SignUp />
                    </Suspense>
                )
            default:
                return null;
        }    
    }
    

    return (
        <NavIconLayout>
        <div className="nav-menu" ref={menuIconsRef}>
            {components(activeMenuIcons)}
        </div>
        </NavIconLayout>
        
    )
}

export default NavIcons
