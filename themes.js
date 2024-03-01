// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function lightTheme() {
    setTheme('site-theme-light');
}
function darkTheme() {
    setTheme('site-theme-dark');
}
// Immediately invoked function to set the theme on initial load
(function () {
   if (localStorage.getItem('theme') === 'site-theme-dark') {
       setTheme('site-theme-dark');
   } else {
       setTheme('site-theme-light');
   }
})();