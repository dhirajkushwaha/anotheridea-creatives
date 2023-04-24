// React component
import { React, useEffect, useRef, useState } from "react";

// swiper slider
import { useSwiper } from 'swiper/react';

import { Swiper, SwiperSlide } from "swiper/react";

// Next component
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper";
import { Pagination } from "swiper";

function Right_click(){
    const swiper = useSwiper();
    return <button id="trust_Right" onClick={() => swiper.slideNext(1000, false)}>next</button>
}

function Left_click(){
    const swiper = useSwiper();
    return <button id="trust_Left" onClick={() => swiper.slidePrev(1000, false)}>prev</button>
}


const TRUSTER_LOGO_COUNT_PER_SLIDE = 15;

export default function Trustedby(props) {

    const executed = useRef(false);
    const TRUSTERS_ROW_COUNT = useRef(5);
    const [trusters, setTrusters] = useState([]);
    const [slides, setSlides] = useState([]);


	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		if (!executed.current) {
			executed.current = true;

			//  Trusters Logo sourcing
			if (true) {

                TRUSTERS_ROW_COUNT.current = 5;
                if (document.body.clientWidth <= 1023) { TRUSTERS_ROW_COUNT.current = 3 }

                let copyToTrusters = [];
                let trustersCount = 69;

                let numberOfRows = Math.ceil(trustersCount/TRUSTERS_ROW_COUNT.current)

                for (let rowIteration = 1; rowIteration <= numberOfRows; rowIteration++) {

                    let currentRow = [];
                    for (let relativeLogoNumber = 1; relativeLogoNumber <= TRUSTERS_ROW_COUNT.current; relativeLogoNumber++) {

                        if ( ((rowIteration-1)*TRUSTERS_ROW_COUNT.current + relativeLogoNumber) > trustersCount ) continue; // in case of exceedence due to ceil function

                        let trustedSliderItem = (<div className="trusterSliderItem">
                                                    <img
                                                        key={(rowIteration-1)*TRUSTERS_ROW_COUNT.current + relativeLogoNumber}
                                                        src={`/assets/truster/logo (${(rowIteration-1)*TRUSTERS_ROW_COUNT.current + relativeLogoNumber}).png`}
                                                        loading="lazy"
                                                        alt=""
                                                    />
                                                </div>)

                        currentRow.push( trustedSliderItem );
                    }

                    copyToTrusters.push([<div className="trusterSlider" key={rowIteration}> {currentRow} </div>]);

                }

                setTrusters(copyToTrusters);
			}



		}
	}, []);

    useEffect(() => {
        if (true) {

            let rowsPerSlide = TRUSTER_LOGO_COUNT_PER_SLIDE/TRUSTERS_ROW_COUNT.current;

            console.log(rowsPerSlide)

            let slides_copy = [];
            for (let i = 0; i < Math.ceil((trusters.length)/rowsPerSlide); i++) {
                slides_copy.push( <SwiperSlide> <div className="trusterSlideWrapper">{trusters.slice(i*rowsPerSlide, (i+1)*rowsPerSlide)}</div></SwiperSlide>)
            }

            setSlides(slides_copy);
        }

    }, [trusters])



    return (
        <>
            <div className="footerTrustedBy">
                {/* <h2>TRUSTED BY</h2> */}
                <h2>Trusted by</h2>
                <div className="trustersLoop">
                        <Swiper
                            pagination={true}
                            modules={[Pagination]}
                            className="trustedBy-slider"
                        >
                            { slides }
                            <Left_click/>
                            <Right_click/>
                        </Swiper>
                </div>
            </div>
        </>
    );
}
