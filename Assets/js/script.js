var currentDayEl = $("#currentDay");

var timeBlock = $(".time-block");

var currentTime = moment().hour();

// get data from localStorage
let dataObj
if (localStorage.getItem("data")) {
    dataObj = JSON.parse(localStorage.getItem("data"));
} else {
    dataObj = {};
}



function init() {
    // display current day at the top of the calender
    currentDayEl.text(moment().format("dddd, MMMM Do"));

    

    // adding time, textarea, and button to timer block
    for (var i=9; i<= 17; i++) {
        let rowEl = $('<div class="row">');

        let hr = moment().hour(i);

        let eventText;
        if (dataObj[hr.format("hA")]){
            eventText = dataObj[hr.format("hA")];
        } else {
            eventText = "";
        }

        let hourEl = $(`<div class="hour col-1">${hr.format("hA")}</div>`);
        
        let event = $(`<textarea data-number="${hr.format("hA")}" class="${color(hr)} description col-10">${eventText}</textarea>`)

        let button = $(`<button data-number="${hr.format("hA")}" class="saveBtn col-1"><i class="fas fa-save"></i></button>`)


        rowEl.append(hourEl);
        rowEl.append(event);
        rowEl.append(button);

        timeBlock.append(rowEl);
    }

}

// check each time block is in the past, present, or future 
function color(time) {
    var status 
    if (time.hour() == currentTime) {
        status = "present";
    } else if (time.hour() < currentTime){
        status = "past";
    } else {
        status = "future";
    }
    return status 
}

// render the webpage
init();

// save data when save button is clicked
timeBlock.on("click", ".saveBtn", function(event) {
    // get the index of save button is clicked
    var indexTimeBlock = $(event.currentTarget).data("number");

    var description = $(`textarea[data-number="${indexTimeBlock}"]`).val();

    dataObj[indexTimeBlock] = description
    console.log(dataObj)
    localStorage.setItem("data",JSON.stringify(dataObj));
    
});
