const toggleDarkMode = () => {
    const root = document.querySelector(':root');
    if (root) {
        root.style.setProperty('--backgroundColor', "rgb(56, 55, 55)");
    }
    (document.querySelector("#root") as HTMLElement).style.color = "white!important";
    console.log((document.querySelector("#root") as HTMLElement).style.color);
};
export default toggleDarkMode;