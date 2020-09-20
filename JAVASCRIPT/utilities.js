//Create a responsive navbar

var navbarMenuIcon = document.getElementById('navbarMenuIcon')
var navbarButtons = document.getElementsByClassName('header__nav_store')

var currentIconClass = 'fas fa-bars'

navbarMenuIcon.addEventListener('click', (e) => {
    let iconCurrentClass = e.target.classList.value;
    if (iconCurrentClass === 'fas fa-bars') {
        for (var i = 0; i < navbarButtons.length; i++) {
            navbarButtons[i].style.display = 'block'
        }
        navbarMenuIcon.setAttribute('class', 'far fa-times-circle')
        currentIconClass = 'far fa-times-circle';
    }

    else {
        for (var i = 0; i < navbarButtons.length; i++) {
            navbarButtons[i].style.display = 'none'
        }
        navbarMenuIcon.setAttribute('class', 'fas fa-bars')
        currentIconClass = 'fas fa-bars';
    }

})

//Create a responsive navbar


//Adjusting the display for the buttons according to actual screen size. 

var moreThan992 = window.matchMedia("(min-width: 992px)")

changeNavDisplay(moreThan992)
moreThan992.addListener(changeNavDisplay)

function changeNavDisplay(moreThan992) {
    if (moreThan992.matches) {
        for (var i = 0; i < navbarButtons.length; i++) {
            navbarButtons[i].style.display = 'inline-block'
        }
    } else {
        switch (currentIconClass) {
            case 'fas fa-bars':
                for (var i = 0; i < navbarButtons.length; i++) {
                    navbarButtons[i].style.display = 'none'
                }
                break;
            case 'far fa-times-circle':
                for (var i = 0; i < navbarButtons.length; i++) {
                    navbarButtons[i].style.display = 'block'
                }
        }
    }
}



function trimName(name, maxLengthAllowed, allowedChars) {
    let nameToBeReturned = name;
    if (name.length > maxLengthAllowed) {
        nameToBeReturned = name.substring(0, allowedChars) + '...'
        return nameToBeReturned
    } else {
        return nameToBeReturned
    }
}

//Adjusting the display for the buttons according to actual screen size. 


//Creating a responsive footer 

var lessThan768 = window.matchMedia("(max-width: 768px)")
lessThan768.addListener(changeFooterDisplay)



function changeFooterDisplay(lessThan768) {
    var footerDropdownHeaders = document.getElementsByClassName('dropdownHeader')
    let allGroupsToShow = document.getElementsByClassName('groups')

    // Collapsing or expanding all groups of the footer depending on screen size
    if (lessThan768.matches) {

        for (var i = 0; i < allGroupsToShow.length; i++) {
            allGroupsToShow[i].style.display = 'none';
        }

    } else {
        for (var i = 0; i < allGroupsToShow.length; i++) {
            allGroupsToShow[i].style.display = 'block';
        }
    }

    // Adding and removing the expand/collapse event listener depending on screen size
    for (var i = 0; i < footerDropdownHeaders.length; i++) {
        let clickedFooterHeader = footerDropdownHeaders[i];
        clickedFooterHeader.setAttribute('id', i)
        if (lessThan768.matches) {
            clickedFooterHeader.addEventListener('click', allowColapse)
        } else {
            clickedFooterHeader.removeEventListener('click', allowColapse)
        }
    }

}

function allowColapse(e) {
    let groupToShow = document.getElementsByClassName('group' + e.target.parentElement.id)
    for (var i = 0; i < groupToShow.length; i++) {
        if (groupToShow[i].style.display === 'block') {
            groupToShow[i].style.display = 'none'
        } else {
            groupToShow[i].style.display = 'block'
        }
    }
}

//Creating a responsive footer 
