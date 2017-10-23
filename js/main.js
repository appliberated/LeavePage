"use strict";

const COMEBACK_TITLE = "Come back to me";
const LEAVE_TITLE = "Leave page";

class App {
    

    constructor() {
        this.invisibleAudio = document.getElementById("invisibleAudio");
    }

    comeBack() {
        document.title = COMEBACK_TITLE;
        
        this.invisibleAudio.play();
    }

    leaveAgain() {
        document.title = LEAVE_TITLE;
        document.getElementById("portrait").style.display = "inline-block";
    }

    init() {
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

        // window.addEventListener("beforeunload", () => {
        //     this.comeBack();
        // });

        document.getElementById("soundOnButton").addEventListener("click", () => {
            document.getElementById("confirmationPanel").style.display = "none";
            document.getElementById("instructionsPanel").style.display = "block";
            this.invisibleAudio.load();
        });
    }
}

window.addEventListener("load", () => {
    const app = new App();
    app.init();
});