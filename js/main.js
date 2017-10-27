"use strict";

const COMEBACK_TITLE = "Come back to me";
const LEAVE_TITLE = "Leave page";

class App {
    

    constructor() {
        this.invisibleAudio = document.getElementById("invisibleAudio");
        this.portrait = document.getElementById("portrait");
    }

    comeBack() {
        document.title = COMEBACK_TITLE;
        
        this.invisibleAudio.play();
    }

    leaveAgain() {
        document.title = LEAVE_TITLE;
        this.portrait.classList.add("visible");
    }

    initWithVisibilityAPI() {
        document.addEventListener("visibilitychange", () => {
            console.log(document.visibilityState);
        
            switch (document.visibilityState) {
            case "hidden":
            case "unloaded":
                this.comeBack();
                break;
            case "visible":
                this.leaveAgain();
                break;
            }
        });
    }

    initWithBlur() {
        window.addEventListener("blur", () => {
            this.comeBack();
        });
        
        window.addEventListener("focus", () => {
            this.leaveAgain();
        });
    }

    init() {


        document.getElementById("soundOnButton").addEventListener("click", () => {
            document.getElementById("confirmationPanel").classList.add("hidden");
            document.getElementById("instructionsPanel").classList.add("visible");
            this.invisibleAudio.load();

            switch (location.search) {
            case "?b":
                this.initWithBlur();
                break;
            case "?vb":
                this.initWithVisibilityAPI();
                this.initWithBlur();
                break;
            case "?v":
            default:
                this.initWithVisibilityAPI();
                break;
            }
        });
    }
}

window.addEventListener("load", () => {
    const app = new App();
    app.init();
});