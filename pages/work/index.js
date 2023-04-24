
import React, { useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/navigation';


import Worknav from './worknav'
import Footer from '../../components/footer/footer';

// work page color definition
export const colorIndex = {
    0 : "#af37d9",
    1 : "#de477e",
    2 : "#f2ad45",
    3 : "#3ab8c9",
    4 : "#3b33b3"
}

const pageIndex = {
    "branding" : 0,
    "campaigns" : 1,
    "content" : 2,
    "strategy" : 3,
    "workshops" : 4
}

export function WorkHero(prop){

    return(
        <>
            <Head>
                <title>Work: {prop.title}</title>
            </Head>

            <div className="WorkHero">
                <div className="WorkHero-wrapper">
                    <h1 className="WorkHero-title HomeTitle">
                        <span className="HomeTitle-title">{prop.title}</span>
                    </h1>
                    <h2 className="WorkHero-subtitle app-text--large">
                        <p>
                            {(prop.heroCopy)}
                        </p>
                    </h2>
                </div>
            </div>
        </>
    )
}

export default function Work({ children }) {

    const {push} = useRouter();
    const executed = useRef(0);
    const [activeIndex, setActiveIndex] = useState();


    useEffect(() => {

        if ( executed.current == 0 ){

            setActiveIndex(()=>{
                let path_array = (window.location.pathname).split("/");
                return pageIndex[path_array[path_array.length-1]]
            });

            window.location.pathname === "/work" ? push("/work/branding") : null;
            executed.current++;
        }

    }, [])


    return (
        <main className='Work-page-container' style={{"--page-color":colorIndex[activeIndex]}} data-scroll-container>
            <Worknav activeIndex={activeIndex} />
            {children}
            <Footer />
        </main>
    )
}