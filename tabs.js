const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');


// We will be listening to an event (keydown) if it happens trigger the changeTabFocus function 
tabList.addEventListener('keydown', changeTabFocus);


// Now we will create an event listener to each tab specifically in onr tabs and the event will be for a (click) which will trigger the changeTabPanel function
tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


// The changeTabFocus function
let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
        
        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }
        
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

// The changeTabPanel function

function changeTabPanel(e) {

    //We need a way to link our tabs in the html page to the content and images so to do that we will use the getAttribute to link it with the data-img and aria-controls that are in out html
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    
    // Now we are basically living on each tab by it self, but for us to change the whole content of the page we need to be able to go out into the main basically to change everything (image and content) so to do that we will create 2 constants that will take us 1 step away to the tabslist and another 1 that will take us another step farther away to the main

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;


    // We will cycle through our tabContainer through the tabs Doing this will mean that when we move from a tab find the one that is not selected and set its select attribute to false while the selected one will set its selected attribute to true.
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
        
    targetTab.setAttribute("aria-selected", true);


    //Before removing the hidden attribute of the selected panel we have to give every other panel an attribute of hidden we will do this by going into our mainContainer query selecting all of the divs with a role of tabpanel and for each tabpanel and give it an attribute of hidden

    hideContent(mainContainer,'[role="tabpanel"]');
    showContent(mainContainer,[`#${targetPanel}`]);

    // mainContainer.
    // querySelectorAll('[role="tabpanel"]').
    // forEach((panel) => panel.setAttribute('hidden' , true));

    // mainContainer.querySelector(`#${targetPanel}`).removeAttribute('hidden');


    hideContent(mainContainer,'picture')
    showContent(mainContainer,[`#${targetImage}`]);
    // mainContainer
    //     .querySelectorAll('picture')
    //     .forEach((picture) => picture.setAttribute("hidden", true));
        
    // mainContainer.querySelector([`#${targetImage}`]).removeAttribute('hidden');
    
    console.log(mainContainer);
}


function hideContent (parent , content){
    parent.
    querySelectorAll(content).
    forEach((item) => item.setAttribute('hidden', true));
}

function showContent (parent , content){
    parent.querySelector(content).removeAttribute('hidden');
}