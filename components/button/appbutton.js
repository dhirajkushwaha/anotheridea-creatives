import Link from "next/link";

export default function Appbutton(props, { children }) {
    const htmlStructure = (<a
                            className={
                                "AppButton colorFill " +
                                (props.className === undefined ? "" : props.className)
                            }
                            style={{
                                "--ease": "none",
                                "--ease-end": "power3",
                                "--buttonColor":
                                    props.bgColor != undefined ? props.bgColor : "#5542F7",
                                "--textColor":
                                    props.textColor != undefined ? props.textColor : "#fff",
                                "--hoverTextColor":
                                    props.hoverTextColor != undefined ? props.hoverTextColor : "#fff",
                                "--hoverColor":
                                    props.hoverBgColor != undefined ? props.hoverBgColor : "#000",
                                "--marginTop":
                                    props.marginTop != undefined ? props.marginTop : "4vw",
                            }}
                        >
                        <div className="AppButton-bg"></div>
                            <span className="AppButton-label">
                                <p>
                                    {props.label}
                                    {props.boldLabel != undefined ? (
                                        <strong> {props.boldLabel}</strong>
                                    ) : (
                                        ""
                                    )}
                                </p>
                            </span>
                        </a>)

    return (
        <>
            { props.hrefDir != false ?
            <Link href={props.href != undefined ? props.href : "/"} passHref legacyBehavior>
                { htmlStructure }
            </Link>
             : htmlStructure }
        </>
    );
}
