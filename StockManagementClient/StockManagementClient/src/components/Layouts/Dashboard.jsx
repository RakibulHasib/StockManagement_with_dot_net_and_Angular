/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AppContext } from "App";
import AppBreadcrumb from "AppBreadcrumb";
import AppFooter from "AppFooter";
import AppInlineMenu from "AppInlineMenu";
import AppMenu from "AppMenu";
import AppRightMenu from "AppRightMenu";
import AppTopbar from "AppTopbar";
import classNames from "classnames";
import React, { useContext, useEffect, useRef, useState } from "react";
import PrimeReact from "primereact/api";
import AppConfig from "../../AppConfig";

const Dashboard = ({ children}) => {
    const [ripple, setRipple] = useState(true);
    const [menuMode, setMenuMode] = useState("static");
    const [inlineMenuPosition, setInlineMenuPosition] = useState("top");
    const [desktopMenuActive, setDesktopMenuActive] = useState(true);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [rightMenuActive, setRightMenuActive] = useState(false);
    const [messageMenuActive, setMessageMenuActive] = useState(false);
    const [menuActive, setMenuActive] = useState(false);
    const [inputStyle, setInputStyle] = useState("outlined");
    const [mobileTopbarActive, setMobileTopbarActive] = useState(false);
    const [menuTheme, setMenuTheme] = useState("light");
    const [topbarTheme, setTopbarTheme] = useState("blue");
    const [theme, setTheme] = useState("indigo");
    const [isInputBackgroundChanged, setIsInputBackgroundChanged] = useState(false);
    const [inlineMenuActive, setInlineMenuActive] = useState({});
    const [searchActive, setSearchActive] = useState(false);
    let currentInlineMenuKey = useRef(null);
    const { isRTL, colorMode, setRTL, setColorMode, setNewThemeLoaded } = useContext(AppContext);
    const [menuItem, setMenuItem] = useState([]);
    let searchClick;
    let topbarItemClick;
    let menuClick;
    let inlineMenuClick;

    const routes = [
        { parent: "", label: "" },
        { parent: "Favorites", label: "Dashboard Analytics" },
        { parent: "UI Kit", label: "Form Layout" },
        { parent: "UI Kit", label: "Input" },
        { parent: "UI Kit", label: "Float Label" },
        { parent: "UI Kit", label: "Invalid State" },
        { parent: "UI Kit", label: "Button" },
        { parent: "UI Kit", label: "Table" },
        { parent: "UI Kit", label: "List" },
        { parent: "UI Kit", label: "Panel" },
        { parent: "UI Kit", label: "Tree" },
        { parent: "UI Kit", label: "Overlay" },
        { parent: "UI Kit", label: "Menu" },
        { parent: "UI Kit", label: "Message" },
        { parent: "UI Kit", label: "File" },
        { parent: "UI Kit", label: "Chart" },
        { parent: "UI Kit", label: "Misc" },
        { parent: "Utilities", label: "Display" },
        { parent: "Utilities", label: "Elevation" },
        { parent: "Utilities", label: "Flexbox" },
        { parent: "Utilities", label: "Icons" },
        { parent: "Utilities", label: "Widgets" },
        { parent: "Utilities", label: "Grid" },
        { parent: "Utilities", label: "Spacing" },
        { parent: "Utilities", label: "Typography" },
        { parent: "Utilities", label: "Text" },
        { parent: "Pages", label: "Crud" },
        { parent: "Pages", label: "Calendar" },
    ];

    useEffect(() => {
        if (menuMode === "overlay") {
            hideOverlayMenu();
        }
        if (menuMode === "static") {
            setDesktopMenuActive(true);
        }
    }, [menuMode]);

    useEffect(() => {
        onColorModeChange(colorMode);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onMenuThemeChange = (theme) => {
        setMenuTheme(theme);
    };

    const onTopbarThemeChange = (theme) => {
        setTopbarTheme(theme);
    };

    useEffect(() => {
        // const appLogoLink = document.getElementById("app-logo");
        // if (topbarTheme === "white" || topbarTheme === "yellow" || topbarTheme === "amber" || topbarTheme === "orange" || topbarTheme === "lime") {
        //     appLogoLink.src = "assets/layout/images/logo-dark.png";
        // } else {
        //     appLogoLink.src = "assets/layout/images/logo-dark.png";
        // }
    }, [topbarTheme]);

    const replaceLink = (linkElement, href, callback) => {
        if (isIE()) {
            linkElement.setAttribute("href", href);

            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute("id");
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute("href", href);
            cloneLinkElement.setAttribute("id", id + "-clone");

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", id);

                if (callback) {
                    callback();
                }
            });
        }
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };
    const handleInputStyleChange = (newStyle) => {
        // Handle the change in input style
        // e.g., update a state or perform other actions
      };

  
      const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
      };
    const onInlineMenuPositionChange = (mode) => {
        setInlineMenuPosition(mode);
    };

    const onMenuModeChange = (mode) => {
        setMenuMode(mode);
    };

    const onRTLChange = () => {
        setRTL((prevState) => !prevState);
    };

    const onMenuClick = (event) => {
        menuClick = true;
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;

        if (isDesktop()) setDesktopMenuActive((prevState) => !prevState);
        else setMobileMenuActive((prevState) => !prevState);

        event.preventDefault();
    };

    const onTopbarItemClick = (event) => {
        topbarItemClick = true;
        if (activeTopbarItem === event.item) setActiveTopbarItem(null);
        else {
            setActiveTopbarItem(event.item);
        }

        event.originalEvent.preventDefault();
    };

    const onSearch = (event) => {
        searchClick = true;
        setSearchActive(event);
    };

    const hideOverlayMenu = () => {
        setMobileMenuActive(false);
        setDesktopMenuActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 1024;
    };

    const isHorizontal = () => {
        return menuMode === "horizontal";
    };

    const isSlim = () => {
        return menuMode === "slim";
    };

    const isIE = () => {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    };

    const onInlineMenuClick = (e, key) => {
        let menuKeys = { ...inlineMenuActive };
        if (key !== currentInlineMenuKey.current && currentInlineMenuKey.current) {
            menuKeys[currentInlineMenuKey.current] = false;
        }

        menuKeys[key] = !menuKeys[key];
        setInlineMenuActive(menuKeys);
        currentInlineMenuKey.current = key;
        inlineMenuClick = true;
    };

    const layoutContainerClassName = classNames("layout-wrapper ", "layout-menu-" + menuTheme + " layout-topbar-" + topbarTheme, {
        "layout-menu-static": menuMode === "static",
        "layout-menu-overlay": menuMode === "overlay",
        "layout-menu-slim": menuMode === "slim",
        "layout-menu-horizontal": menuMode === "horizontal",
        "layout-menu-active": desktopMenuActive,
        "layout-menu-mobile-active": mobileMenuActive,
        "layout-topbar-mobile-active": mobileTopbarActive,
        "layout-rightmenu-active": rightMenuActive,
        "p-input-filled": inputStyle === "filled",
        "p-ripple-disabled": !ripple,
        "layout-rtl": isRTL,
    });

    const onMenuItemClick = (event) => {
        if (!event.item.items && (menuMode === "overlay" || !isDesktop())) {
            hideOverlayMenu();
        }

        if (!event.item.items && (isHorizontal() || isSlim())) {
            setMenuActive(false);
        }
    };

    const onRootMenuItemClick = (event) => {
        setMenuActive((prevState) => !prevState);
    };

    const onRightMenuButtonClick = () => {
        setRightMenuActive((prevState) => !prevState);
    };
    const onMessageButtonClick = () => {
        setMessageMenuActive((prevState) => !prevState);
    };

    const onMobileTopbarButtonClick = (event) => {
        setMobileTopbarActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onDocumentClick = (event) => {
        if (!searchClick && event.target.localName !== "input") {
            setSearchActive(false);
        }

        if (!topbarItemClick) {
            setActiveTopbarItem(null);
        }

        if (!menuClick && (menuMode === "overlay" || !isDesktop())) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (inlineMenuActive[currentInlineMenuKey.current] && !inlineMenuClick) {
            let menuKeys = { ...inlineMenuActive };
            menuKeys[currentInlineMenuKey.current] = false;
            setInlineMenuActive(menuKeys);
        }

        if (!menuClick && (isSlim() || isHorizontal())) {
            setMenuActive(false);
        }

        searchClick = false;
        topbarItemClick = false;
        inlineMenuClick = false;
        menuClick = false;
    };

    const onThemeChange = (theme) => {
        setTheme(theme);
        const themeLink = document.getElementById("theme-css");
        const themeHref = "assets/theme/" + theme + "/theme-" + colorMode + ".css";
        replaceLink(themeLink, themeHref);
    };

    const onColorModeChange = (mode) => {
        setColorMode(mode);
        setIsInputBackgroundChanged(true);

        if (isInputBackgroundChanged) {
            if (mode === "dark") {
                setInputStyle("filled");
            } else {
                setInputStyle("outlined");
            }
        }

        if (mode === "dark") {
            setMenuTheme("dark");
            setTopbarTheme("dark");
        } else {
            setMenuTheme("light");
            setTopbarTheme("blue");
        }

        const layoutLink = document.getElementById("layout-css");
        const layoutHref = "assets/layout/css/layout-" + mode + ".css";
        replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById("theme-css");
        const urlTokens = themeLink.getAttribute("href").split("/");
        urlTokens[urlTokens.length - 1] = "theme-" + mode + ".css";
        const newURL = urlTokens.join("/");

        replaceLink(themeLink, newURL, () => {
            setNewThemeLoaded(true);
        });
    };

    return (
        <div className={layoutContainerClassName} onClick={onDocumentClick}>
            <AppTopbar
                horizontal={isHorizontal()}
                activeTopbarItem={activeTopbarItem}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick}
                onRightMenuButtonClick={onRightMenuButtonClick}
                onMessageMenuClick={onMessageButtonClick}
                onMobileTopbarButtonClick={onMobileTopbarButtonClick}
                mobileTopbarActive={mobileTopbarActive}
                searchActive={searchActive}
                onSearch={onSearch}
            />

            <div className="menu-wrapper" onClick={onMenuClick}>
                <div className="layout-menu-container">
                    {(inlineMenuPosition === "top" || inlineMenuPosition === "both") && <AppInlineMenu menuKey="top" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />}
                    <AppMenu model={menuItem} onMenuItemClick={onMenuItemClick} onRootMenuItemClick={onRootMenuItemClick} menuMode={menuMode} active={menuActive} />
                    {(inlineMenuPosition === "bottom" || inlineMenuPosition === "both") && <AppInlineMenu menuKey="bottom" inlineMenuActive={inlineMenuActive} onInlineMenuClick={onInlineMenuClick} horizontal={isHorizontal()} menuMode={menuMode} />}
                </div>
            </div>

            <div className="layout-main">
                <AppBreadcrumb routes={routes} />

                <div className="layout-content">{children}</div>
                <AppFooter colorMode={colorMode} />
            </div>
            {mobileMenuActive && <div className="layout-mask modal-in"></div>}
        </div>
    );
};

export default Dashboard;
