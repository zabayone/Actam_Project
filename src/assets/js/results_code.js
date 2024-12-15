var types
var values
var cat

var exe_array = []
var day_array = []

// Function to update the results based on the selected category
function showCategory(category) {
    correctCount = storage.calculateTotalCorrectResults;
    //correctCount= 
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsContent = document.getElementById('resultsContent');
    const sliderElements = document.querySelectorAll('.slider_element');

    sliderElements.forEach(element => {
        element.addEventListener('click', () => {
            // Remove the 'active' class from all elements
            sliderElements.forEach(el => el.classList.remove('active'));

            // Add the 'active' class to the clicked element
            element.classList.add('active');
        });
    });

    // Update the title based on the category
    const titles = {
        intervals: 'Intervals Results',
        chords: 'Chords Results',
        scales: 'Scales Results'
    };

    resultsTitle.textContent = titles[category] || 'Results';

    // Create the correct blocks HTML dynamically based on the correctCount
    let correctBarsHTML = '';
    for (let i = 0; i < correctCount; i++) {
        correctBarsHTML += '<a class="correct_bar"></a>';
    }

    // Update the content dynamically (this can be replaced with actual data fetching logic)
    const content = {
        intervals: '<p>Here are the results for intervals.</p>',
        chords: '<p>Here are the results for chords.</p>',
        scales: '<p>Here are the results for scales.</p>'
    };

    // Add the correct blocks and total block HTML to the content
    const dynamicContent = `
        ${content[category] || '<p>No results available.</p>'}
        <div class="bars">
            <!-- Correct blocks -->
            <div class="correct_blocks">
                ${correctBarsHTML}
            </div>
            <!-- Total blocks -->
            <div class="total_blocks">
                <a class="total_bar"></a>
            </div>
        </div>
    `;

    resultsContent.innerHTML = dynamicContent;
}

async function init(){
    let i = 0
    let str = "Container-" + i.toString()
    let item
    while(item = localStorage.getItem(str)){
        exe_array.push(new ExerciseContainer(null,i))
        i = i+1
        str = "Container-" + i.toString()
    }
    i = 0
    str = "Day-" + i.toString()
    while(item = localStorage.getItem(str)){
        day_array.push(new DayContainer(i))
        i = i+1
        str = "Day-" + i.toString()
    }
}

init()