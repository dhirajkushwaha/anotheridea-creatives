
import React, { useRef, useState } from 'react'
import { useEffect } from 'react';
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
    "compaigns" : 1,
    "content" : 2,
    "strategy" : 3,
    "workshop" : 4
}

export default function Work({ children }) {

    const {push} = useRouter();
    const executed = useRef(0);
    const [activeIndex, setActiveIndex] = useState();


    useEffect(() => {
        push("/work/branding")

        if ( executed.current == 0 ){

            setActiveIndex(()=>{
                let path_array = (window.location.pathname).split("/");
                return pageIndex[path_array[path_array.length-1]]
            });

            executed.current++;
        }

    }, [])


    return (
        <main className='Work-page-container' style={{"--page-color":colorIndex[activeIndex]}} data-scroll-container>
            <Worknav activeIndex={activeIndex} />
            {children}
            <Footer></Footer>
        </main>
    )
}