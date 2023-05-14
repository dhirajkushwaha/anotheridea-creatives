import Link from "next/link"
import { useEffect } from "react";

import Appbutton from "../button/appbutton"

export default function Footer(){

    useEffect(() => {
        // document.querySelector('.Footer-planetbgVideo').playbackRate = 0.9;
    }, [])


    return (
        <footer>
            <div className="Footer-wrapper">
                <div className="footerRow">
                    <h2>Wherever you are, <br/> We&#39;ve got Another Idea for you.</h2>
                    <Appbutton
                        href="/contact"
                        label="LET&#39;S"
                        boldLabel="&nbsp;TALK"
                        marginTop="11vw"
                    />
                </div>
                <div className="Footer-planetbg">
                    <video loop={"loop"} muted={true} preload={"auto"} playsInline={true} autoPlay={true} className="lazy Video Footer-planetbgVideo gifLike in-view">
                        <source data-src="/assets/planet.ebe16bb2.webm" type="video/webm" />
                        <source data-src="/assets/planet.ebe16bb2.mp4" type="video/mp4" />
                        {/* <source src="/assets/planet.ebe16bb2.webm" data-src="/assets/planet.ebe16bb2.webm" type="video/webm" />
                        <source src="/assets/planet.ebe16bb2.mp4" data-src="/assets/planet.ebe16bb2.mp4" type="video/mp4" /> */}
                    </video>
                </div>
            </div>
            <div className="copyRightText">
                © 2023 All Rights Reserved Another Idea
            </div><hr color="black" />
        </footer>
    )
}