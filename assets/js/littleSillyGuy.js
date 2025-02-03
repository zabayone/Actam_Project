
const littleGuy=document.getElementById('boton');
let active=false;



function showMessage(){
    let cat = localStorage.getItem("category");
    let level = localStorage.getItem("level");
    const container =document.getElementById("tutorial");
    if(level===null){
        switch (parseInt(cat)) {
            case 0:
            case 1:
                container.style.display="block"
                container.innerHTML = `
                <p>On each section, first level is unison,</p> 
                <p>Second level is ascendent</p> 
                <p>Third is descendent</p> 
                <p>And the exam has all of them</p> 
                <p>Levels in red are exams</p> 
            `
                break;

            case 2:
            case 3:
                container.style.display="block"
                container.innerHTML = `
                <p>On each section, first level is ascendent</p> 
                <p>Second level is descendent</p> 
                <p>Third and exam have both</p> 
                <p>Levels in red are exams</p> 
            `
                break;
        
            default:
                container.style.display="block"
                container.innerHTML = `
                <p>If this appear we are fucked</p> 
            `
                break;
        }

    }else{
        switch (parseInt(cat)) {
            case 0:
            case 1:
            case 2:
                container.style.display="block"
                container.innerHTML = `
                <p>You can use the keyboard to help you</p> 
                <p>The keyboard wont be aviable on exams</p> 
                <p>The piano can be played with your keybard starting in key A that plays C</p>
                <p>&#9654 Begins the game and also to repeat the first note</p> 
                <p>&#8634 Repeats all the played notes</p> 
                <p>&#11208&#11208 Goes to next one</p> 
            `
                break;
            case 3:
                container.style.display="block"
                container.innerHTML = `
                <p>You have all the time you want to figure out the note</p>
                <p>When you are ready, press the microphone and it will star recording</p>
                <p>It will turn off eventually, try to be on pitch then!</p>
                <p>&#9654 Repeats the reference note</p> 
                <p>&#8634 Also repeats the reference note</p> 
                <p>&#11208&#11208 Goes to next one</p> 

            `
                break;
            default:
                container.style.display="block"
                container.innerHTML = `
                <p>If this appear we are fucked</p> 
            `
                break;
        }

    }

}

littleGuy.addEventListener('click', () => {
    // Remove the 'active' class from all elements
    if(active){
        document.getElementById("tutorial").innerHTML='';
        tutorial.style.display='none';
    }else{
        showMessage();
    }
    active = !active
});