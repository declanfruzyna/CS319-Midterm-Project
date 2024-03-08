// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
function setHovered(highLightName) {
    localStorage.setItem('highLight', highLightName);
    document.documentElement.className = highLightName;
}
// function to toggle between light and dark theme
function lightTheme() {
    setTheme('site-theme-light');
}
function darkTheme() {
    setTheme('site-theme-dark');
}
addEventListener("mouseover", (event) => {event.target.style.color = "red"});
onmouseover = (event) => {};
addEventListener("mouseout", (event) => {event.target.style.color = "--color-small-text"});
onmouseoout = (event) => {};
// Immediately invoked function to set the theme on initial load
(function () {
   if (localStorage.getItem('theme') === 'site-theme-dark') {
       setTheme('site-theme-dark');
   } else {
       setTheme('site-theme-light');
   }
})();
