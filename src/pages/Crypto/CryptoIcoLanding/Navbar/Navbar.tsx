import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link } from "react-router-dom";

// Import Images
import logodark from "../../../../assets/images/logo-dark.png";
import logolight from "../../../../assets/images/logo-light.png";

const Navbar = (props: any) => {
    const [isOpenMenu, setisOpenMenu] = useState(false);
    const [navClass, setnavClass] = useState("");

    const toggle = () => setisOpenMenu(!isOpenMenu);

    useEffect(() => {
        window.addEventListener("scroll", scrollNavigation, true);
    });

    const scrollNavigation = () => {
        var scrollup = document.documentElement.scrollTop;
        if (scrollup > 50) {
            setnavClass("sticky nav-sticky");
        } else {
            setnavClass("");
        }

        const element = document.querySelectorAll(".nav-item");
        element.forEach((item: any) => {
            item.firstChild.classList.remove("active")
            if (item.classList.contains("active")) {
                item.firstChild.classList.add("active")
            }
        })
    }

    return (
        <React.Fragment>
            <nav className={"navbar navbar-expand-lg navigation fixed-top " + navClass} id="navbar">
                <Container>
                    <Link className="navbar-brand" to="/index">
                        {props.imglight !== true ? (
                            <img
                                src={logodark}
                                alt=""
                                height="17"
                                className="card-logo card-logo-dark"
                            />
                        ) : (
                            <img
                                src={logolight}
                                alt=""
                                height="17"
                                className="card-logo card-logo-light"
                            />
                        )}
                    </Link>

                    <NavbarToggler className="navbar-toggler py-0 fs-20 text-body" onClick={toggle} type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <i className="mdi mdi-menu"></i>
                    </NavbarToggler>

                    <Collapse
                        isOpen={isOpenMenu}
                        className="navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <Scrollspy
                            offset={-18}
                            items={[
                                "home",
                                "about",
                                "features",
                                "roadmap",
                                "team",
                                "news",
                                "faqs",
                            ]}
                            currentClassName="active"
                            className="ms-auto navbar-nav nav"
                            id="navbar-example"
                        >
                            <li className="nav-item">
                                <NavLink href="#home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#features">Features</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#roadmap">Roadmap</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#team">Team</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#news">News</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink href="#faqs">FAQs</NavLink>
                            </li>
                        </Scrollspy>

                        <div className="my-2 ms-lg-2">
                            <Link to="#" className="btn btn-outline-success w-xs">Sign in</Link>
                        </div>
                    </Collapse>
                </Container>
            </nav>
        </React.Fragment>
    );
};

export default Navbar;