
function routing(){
    const sections = document.querySelectorAll('.page');

    function navigate(){
        const hash = window.location.hash || '#course-list';
        sections.forEach(section=>{
            if(section.id === hash.substring(1)){
                section.style.display = "block";
                section.style.opacity = 1;
                section.style.pointerEvents = "auto";

            }
            else{
                section.style.display = "none";
                section.style.opacity = 0;
                section.style.pointerEvents = "none";
            }
        })
    }
    navigate();
    

    window.addEventListener('hashchange',navigate);

}

routing();
