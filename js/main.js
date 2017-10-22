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
    }



    init() {
        document.addEventListener("visibilitychange", () => {
            console.log(document.visibilityState);
        
            switch (document.visibilityState) {
            case "hidden":
                this.comeBack();
                break;
            case "visible":
                this.leaveAgain();
                break;
            }
        });

        // document.getElementById("test").addEventListener("click", () => {
        //     this.invisibleAudio.play();
        // });

        document.getElementById("soundOnButton").addEventListener("click", () => {
            document.getElementById("confirmationPanel").style.visibility = "collapse";
            document.getElementById("instructionsPanel").style.visibility = "visible";
            this.invisibleAudio.load();
        });
    }
}

window.addEventListener("load", () => {
    const app = new App();
    app.init();
});