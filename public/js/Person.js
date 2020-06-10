import {createSimpleNode, createSimpleNodeWithData} from "./Helper.js";
import {months} from "./months.js";

export class Person {
    constructor(params) {
        this.fullName = params.fullName;
        this.university = params.university;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
        this.type = "person"
    }

    get age() {
        const exceptions = [11, 12, 13, 14, 111, 112, 113, 114];
        const agePerson = parseInt((Date.now() - this.birthDate) / 3600 / 24 / 365.25 / 1000);
        
        if ( exceptions.indexOf(agePerson) !== -1 ) {
            return agePerson + " лет";
        } else if ( (agePerson % 10) === 1 ) {
            return agePerson + " год";
        } else if ( ((agePerson % 10) === 2) || ((agePerson % 10) === 3) || ((agePerson % 10) === 4) ) {
            return agePerson + " года";
        }
        
        return agePerson + " лет";
    };

    get birthDateStr() {
        return this.birthDate.getDate() + " " + months[this.birthDate.getMonth()];
    }; 

    get education() {
        return this.university + ", Неизвестная персона";
    };

    render() {
        const person = document.createElement("div");
        person.className = "person";

        const avatar = createSimpleNode("img", "person__avatar", person)
        avatar.setAttribute("src", this.photoUrl);
        const name = createSimpleNodeWithData("span", "person__name", person, this.fullName);
        const education = createSimpleNodeWithData("span", "person__education", person, this.education);
    
        return person;
    };

    appendToDOM()  { 
        const layout = this.render();
        const persons = document.getElementById("persons");
        persons.appendChild(layout);

        layout.addEventListener('click', (event) => {
            this.openCard(event.currentTarget);
        });
    }; 

    openCard (currentTarget) {
        const persons = document.getElementById("persons");
        const x = currentTarget.offsetTop;
        const y = currentTarget.offsetLeft;

        const page = document.getElementById("page");
            page.style.backgroundColor = "#808080";
      
        const personPopup = createSimpleNode("div","personPopup", persons);
            personPopup.style.left = y + "px";
            personPopup.style.top = x + "px ";
        
        const personPopupInfo = createSimpleNode("div","personPopup__info", personPopup);
            createSimpleNodeWithData("span", "personPopup__name ", personPopupInfo, this.fullName);

        const personPopupWrap = createSimpleNode("div", "personPopup__wrap", personPopupInfo);
            createSimpleNodeWithData("div", "personPopup__caption", personPopupWrap, "День рождения");
            createSimpleNodeWithData("div", "personPopup__birthDate", personPopupWrap, this.birthDateStr + ", " + this.age);
            createSimpleNodeWithData("div", "personPopup__caption", personPopupWrap, "Учится");
            createSimpleNodeWithData("div", "personPopup__education", personPopupWrap, this.education);

        const personPopupAvatar = createSimpleNode("img","personPopup__avatar", personPopup);
            personPopupAvatar.setAttribute("src", this.photoUrl);

        const personPopupExit = createSimpleNodeWithData("div", "personPopup__exit", personPopup, "X");
            personPopupExit.style.left = 550 + "px";
            personPopupExit.style.top = 5 + "px ";
            personPopupExit.addEventListener("click", () => {
                personPopup.style.display = "none";
                page.style.backgroundColor = "#fff";
            });

        document.addEventListener('mouseup', function(e) {
            if( (e.target.closest('.personPopup') === null) ) {
                console.log(e.target.className);
                personPopup.style.display = 'none';
                page.style.backgroundColor = "#fff";
            }
            
        });
    };
}