// React
import { React, useEffect, useRef, useState } from "react";

// Nextjs components
import Head from "next/head";
import Link from "next/link";

// Custom Components
import Appbutton from "../../components/button/appbutton";

import jQuery from "jquery";
const $ = jQuery;

export default function Contact(){

    const executed = useRef(0);

    const [f_process_state, set_f_process_state] = useState(false);

    const form_validation = () => {

        if ( f_process_state ) return;

        const contact_form = document.querySelector(".contact-form");

        let css_selectors = [
                    ".contact-form input[name='name']",
                    ".contact-form input[name='mobile']",
                    ".contact-form input[name='email']",
                    ".contact-form textarea"
                ]

        const name_input = document.querySelector(css_selectors[0]);
        const mobile_input = document.querySelector(css_selectors[1]);
        const email_input = document.querySelector(css_selectors[2]);
        const message_input = document.querySelector(css_selectors[3]);

        const e_mail = "srushti@anotheridea.in"

        name_input.setCustomValidity("Name field must not be empty");
        mobile_input.setCustomValidity("Please enter a phone number");
        email_input.setCustomValidity("Please enter an e-mail");
        message_input.setCustomValidity("Write few lines");

        css_selectors.forEach((c_s, index) => {

            document.querySelector(c_s).addEventListener("input", (e)=>{
                e.target.setCustomValidity("");

                if ( index == 0 ){
                    if (e.target.value == ""){
                        e.target.setCustomValidity("Name field must not be empty")
                    }
                }
                else if (index == 1){

                    if (e.target.value == ""){
                        e.target.setCustomValidity("Please enter a phone number")
                    }
                    try {

                        let str_last_el = (e.target.value.split('')[e.target.value.length-1]).toString().toLowerCase()

                        if ( str_last_el < '0' || str_last_el > '9' ){
                            e.target.value = e.target.value.substring(0, e.target.value.length-1) + e.target.value.substring(e.target.value.length);
                        }

                        if ( e.target.value.length > 10 ){
                            e.target.value = e.target.value.substring(0, (e.target.value.length > 10) ? 10 : e.target.value.length);
                        }

                    } catch (error) {}

                }
                else if (index == 2){

                    if (e.target.value == ""){
                        e.target.setCustomValidity("Please enter an e-mail")
                    }

                }
                else if (index == 3){

                    if (e.target.value == ""){
                        e.target.setCustomValidity("Write few lines")
                    }

                }
            });

        })

        // mobile_input.addEventListener("input", handler_mobile);
        contact_form.addEventListener("submit", (e)=> {

            e.preventDefault();

            $.ajax({
                url: `https://formsubmit.co/ajax/${e_mail}`,
                method: "POST",
                data: {
                    name: name_input.value,
                    mobile: mobile_input.value,
                    email: email_input.value,
                    message: message_input.value,
                    _subject: "Another Idea Contact Details Submitted."
                },
                dataType: "json",
                beforeSend: ()=>{
                    set_f_process_state(true);
                },
                success: ()=>{
                    name_input.value = "";
                    mobile_input.value = "";
                    email_input.value = "";
                    message_input.value = "";
                }
            });


        }); // contact form requiting to formsubmit for email
    }

    useEffect(() => {
		if (typeof window === "undefined") { return; }
        if ( !executed.current){

            form_validation()

            executed.current = 1;
        }
    }, [])

    return (
        <div className="Contact-page" data-scroll-container>
            <Head><title>Contact Us - Another Idea</title></Head>

            <section className="Contact-fields">
                <div className="Menu Contact-menu" style={{"background":"rgb(85, 65, 248)"}}>
                    <Link href={"/"}>
                        <button aria-label="open menu" className="MenuButton Header-button ContactMenu-button colorFill menu-open" style={{"--x":"30.2695px", "--y":"98.2717px", "--r":"0px", "--ease":"expo"}}>
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="MenuButton-border" >
                                <circle cx="50" cy="50" r="49" ></circle>
                            </svg>
                            <span className="MenuButton-bg" ></span>
                            <div className="MenuButton-label" >
                                <span data-v-2cdfcd8e="">Menu</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="MenuButton-cross" >
                                <path d="M0 8.6h20v2.7H0V8.6z" ></path>
                                <path d="M8.6 0h2.7v20H8.6V0z" ></path>
                            </svg>
                        </button>
                    </Link>
					<div className="Menu-wrapper">
						<div className="ContactForm-wrapper">
                            <div className="ContactForm-title">
                                Let&apos;s Talk
                            </div>
                            <div className="ContactForm">
                                <div className="ContactForm-details">
                                    <div className="ContactDetailsItem">
                                        <h3 className="ContactDetailsLabel">Email</h3>
                                        <span className="ContactDetailsInfo">abhishek@anotheridea.in</span>
                                    </div>
                                    <div className="ContactDetailsItem">
                                        <h3 className="ContactDetailsLabel">Phone</h3>
                                        <span className="ContactDetailsInfo">+91 90040 79140</span>
                                    </div>
                                    <div className="ContactDetailsItem">
                                        <h3 className="ContactDetailsLabel">Address</h3>
                                        <span className="ContactDetailsInfo">
                                            Another Idea
                                            2nd Floor, 1/447, Brady Gladys Plaza,
                                            Senapati Bapat Marg,
                                            Mumbai, 400013
                                        </span>
                                    </div>
                                    <div className="ContactDetailsItem">
                                        <a href="https://goo.gl/maps/VjyPbnGvXj2SAmec7" target={"_blank"} rel="noreferrer">
                                            <span className="ContactDetailsInfo Contact-Map">
                                                Brady Gladys Plaza <img src="/assets/marker.png" alt="" />
                                            </span>
                                        </a>
                                    </div>
                                </div>
                                <div className="ContactForm-form">

                                {
                                    f_process_state ?
                                    (<div className="ContactForm-processing">
                                        <lottie-player src="/assets/success.json"  background="transparent"  speed="1"  style={{width: "180px", height: "180px"}} autoplay></lottie-player>
                                    </div>) :
                                    (<form method="POST" action="/contact" className="contact-form" >
                                        {/* <input type="hidden" name="_next" value="http://anotherideaproduction.com/contact/?"/> */}
                                        <input className="FormInput" type="text" name="name" spellCheck={false} autoComplete="false" required placeholder="Name" id="" />
                                        <input className="FormInput" type="tel" name="mobile" spellCheck={false} placeholder="Mobile" required id=""/>
                                        <input className="FormInput" type="email" name="email" spellCheck={false} placeholder="Email" required id="" />
                                        <textarea className="FormInput" name="message" spellCheck={false} placeholder="Message" id="" cols="30" rows="10"></textarea>
                                        <button className="FormButton" type="submit">
                                            <Appbutton label="Submit"
                                                bgColor="white"
                                                textColor="#5541f8"
                                                hoverTextColor="#fff"
                                                hoverBgColor="#5541f8"
                                                marginTop="calc( (30 / var(--vw-size-px)) * 1vw )"
                                                hrefDir={false}
                                                className="FormInputButton"
                                            />
                                        </button>
                                    </form>)
                                }

                                </div>
                            </div>
                        </div>
						<div className="Menu-secondNav">
                            <div className="Menu-socials">
                                <div className="Menu-socialsItem">
                                    <Link href={"https://vimeo.com/anotherideaspaces"} passHref legacyBehavior>
                                        <a className="Menu-socialsItemLink" target={"_blank"} rel="noopener noreferrer">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="Menu-socialsItemIcon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <g clipPath="url(#clip0_3_9)">
                                                    <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="white"/>
                                                    <path d="M17.14 6.10001C17.4676 6.05838 17.8003 6.08937 18.1146 6.19077C18.4288 6.29218 18.7169 6.46151 18.9584 6.68676C19.1999 6.912 19.3888 7.18763 19.5118 7.49409C19.6348 7.80056 19.6888 8.13033 19.67 8.46001C19.7488 9.47362 19.5408 10.4889 19.07 11.39C17.7164 14.2156 15.7525 16.7054 13.32 18.68C12.8316 19.0665 12.2598 19.3336 11.65 19.46C11.3684 19.5377 11.071 19.5379 10.7894 19.4604C10.5077 19.383 10.2522 19.2308 10.05 19.02C9.46635 18.4343 9.05175 17.7019 8.85 16.9C8.4 15.32 8 13.73 7.53 12.15C7.38173 11.5298 7.13168 10.9384 6.79 10.4C6.45 9.89001 6.23 9.84001 5.71 10.14C5.56595 10.209 5.43149 10.2964 5.31 10.4C5.03 10.65 4.85 10.61 4.63 10.3C4.2 9.69001 4.18 9.71001 4.75 9.21001C5.54 8.52001 6.29 7.77001 7.13 7.13001L7.7 6.73001C7.94135 6.52165 8.2327 6.37958 8.54549 6.31773C8.85829 6.25588 9.18178 6.27638 9.48427 6.37721C9.78676 6.47803 10.0578 6.65574 10.271 6.89289C10.4841 7.13005 10.6319 7.41851 10.7 7.73001C10.9476 8.64851 11.1248 9.58456 11.23 10.53C11.3809 11.4847 11.5879 12.4297 11.85 13.36C11.9473 13.7164 12.1027 14.0542 12.31 14.36C12.53 14.64 12.79 14.71 13.05 14.46C14.0567 13.5215 14.7865 12.3247 15.16 11C15.45 9.84001 14.84 9.31001 13.64 9.55001C13.47 9.55001 13.26 9.77001 13.13 9.61001C13 9.45001 13.19 9.26001 13.25 9.09001C13.467 8.38333 13.8641 7.74528 14.4024 7.23857C14.9407 6.73187 15.6015 6.37395 16.32 6.20001C16.5912 6.15133 16.865 6.11795 17.14 6.10001V6.10001Z" fill="#5542F7"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3_9">
                                                    <rect width="24" height="24" fill="white"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span className="Menu-socialsItemLabel">
                                                Vimeo
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="Menu-logoContainer onlyDesk">
                            <Link href={"/"} passHref legacyBehavior>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="255" height="26" viewBox="0 0 255 26" fill="none">
                                        <g clipPath="url(#clip0_12_104)">
                                            <path d="M18.2104 21.7579H6.09577L4.34813 25.5621H0L12.0377 0H12.2754L24.3132 25.5621H19.958L18.2104 21.7579ZM16.6585 18.3847L12.1636 8.59368L7.68962 18.3847H16.6585Z" fill="white"/>
                                            <path d="M48.3747 0.451572V26H48.1859L31.814 9.2642V25.5963H27.7945V0.0752563H28.0042L44.3411 16.7837V0.451572H48.3747Z" fill="white"/>
                                            <path d="M52.7158 13.0684C52.7103 10.5031 53.4828 7.99381 54.9355 5.85853C56.3882 3.72325 58.4558 2.05803 60.8762 1.07381C63.2967 0.089585 65.9611 -0.169351 68.5321 0.3298C71.103 0.828951 73.4647 2.06373 75.3181 3.87772C77.1714 5.6917 78.433 8.00328 78.943 10.5196C79.453 13.036 79.1884 15.6438 78.1828 18.0129C77.1773 20.3819 75.4759 22.4056 73.2943 23.8274C71.1127 25.2493 68.549 26.0054 65.928 26C62.4296 25.982 59.0797 24.6138 56.6059 22.1926C54.1321 19.7713 52.7342 16.4925 52.7158 13.0684V13.0684ZM75.1206 13.0684C75.133 11.2896 74.6057 9.54725 73.6053 8.06211C72.605 6.57698 71.1767 5.41594 69.5015 4.72613C67.8263 4.03633 65.9795 3.84882 64.1953 4.18736C62.4111 4.52591 60.7697 5.37527 59.4792 6.6278C58.1887 7.88033 57.3072 9.47965 56.9463 11.2231C56.5855 12.9665 56.7615 14.7755 57.4522 16.4209C58.1429 18.0663 59.3171 19.4739 60.826 20.4655C62.3349 21.457 64.1105 21.9878 65.928 21.9905C68.3553 21.9834 70.6819 21.0397 72.4028 19.3643C74.1238 17.6888 75.1003 15.4168 75.1206 13.041V13.0684Z" fill="white"/>
                                            <path d="M98.2803 4.41315H91.4226V25.5621H87.382V4.41315H80.5313V0.513153H98.2803V4.41315Z" fill="white"/>
                                            <path d="M121.216 0.513153V25.5621H117.204V14.9842H106.117V25.5621H102.118V0.513153H106.117V11.0774H117.204V0.513153H121.216Z" fill="white"/>
                                            <path d="M130.8 4.38578V10.8037H140.51V14.7174H130.8V21.6484H142.027V25.5621H126.788V0.513153H142.027V4.38578H130.8Z" fill="white"/>
                                            <path d="M160.916 25.5621L154.03 15.8668H150.884V25.5621H146.865V0.513153H154.82C159.581 0.513153 163.488 4.10526 163.488 8.56631C163.497 10.1019 163.013 11.6013 162.103 12.8525C161.194 14.1037 159.905 15.0433 158.42 15.5384L165.872 25.5621H160.916ZM154.897 12.6032C156.037 12.6201 157.138 12.2003 157.966 11.4333C158.794 10.6663 159.283 9.61286 159.329 8.49789C159.313 7.94584 159.185 7.40241 158.953 6.89899C158.721 6.39556 158.389 5.94213 157.977 5.56487C157.565 5.18761 157.081 4.89401 156.552 4.70103C156.023 4.50804 155.461 4.4195 154.897 4.44052H150.863V12.651L154.897 12.6032Z" fill="white"/>
                                            <path d="M179.371 0.513153H183.39V25.5621H179.371V0.513153Z" fill="white"/>
                                            <path d="M209.444 13.0684C209.444 20.7658 204.376 25.5621 196.253 25.5621H188.962V0.513152H196.253C204.376 0.499467 209.444 5.31631 209.444 13.0684ZM205.383 13.0684C205.383 7.7521 201.852 4.42684 196.232 4.42684H192.939V21.6484H196.26C201.873 21.6484 205.383 18.3368 205.383 13.0547V13.0684Z" fill="white"/>
                                            <path opacity="0.6" d="M235.386 23.7763L236.316 21.7579L242.377 8.59368L248.417 21.7579H248.431L250.178 25.5621H254.526L242.489 0H242.251L230.213 25.5621H234.561L235.386 23.7763Z" fill="#BABCBE"/>
                                            <path d="M217.791 21.6484V14.7174H229.752L231.597 10.8037H217.791V4.38578H234.617L236.442 0.513153H213.771V25.5621H224.642L226.487 21.6484H217.791Z" fill="white"/>
                                            <path d="M228.99 25.5621H229.018V25.5142L228.99 25.5621Z" fill="white"/>
                                        </g>
                                            <defs>
                                                <clipPath id="clip0_12_104">
                                                    <rect width="254.526" height="26" fill="white"/>
                                                </clipPath>
                                            </defs>
                                    </svg>
                                </a>
                            </Link>
                        </div>

					</div>
				</div>
            </section>

        </div>
    )
}