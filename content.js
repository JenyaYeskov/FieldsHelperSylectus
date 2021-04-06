'use strict';

window.onload = setFields;


async function setFields() {

    setDocumentTypeField();
    setTypeField();
    setQttyField();
    setTruckSizeField();

    focusOnTruckField();
    focusOnDocumentSelectButton();
    focusOnPrintFileButton();
    focusOnRateField();
    focusOnPayButton();
    focusOnDriverPayButton();

    increaseRCButton();
    increaseDriverPayButton();

    hideElementByTitle("Pay Rate Analysis");
    hideElementByTitle("BOL Form");
    hideElementByTitle("Event Notifications");
    hideElementByTitle("Trip map and route");
    hideElementByTitle("Closest Units");
    hideElementByTitle("Closest Air Units");
    hideElementByTitle("Total hours (1 drv.)");
    hideElementByTitle("Fleet Messages");
    // hideElementByTitle("Trip Summary Form");

    hideElementByValue("Override Mileage")

}

function increaseDriverPayButton() {

    increaseElements(`[alt="Rate Driver Pay"]`, 180);

}

function increaseRCButton() {

    increaseElements(`[title="Image Rate Sheet"]`, 210);

}

async function increaseElements(filter, percents) {

    let elements = await getElements(filter);

    for (let i = 0; i < elements.length; i++) {

        elements[i].style.width = percents + "%";
        elements[i].style.height = percents + "%";
    }
}

async function focusOnDriverPayButton() {

    let driverPayButton = await getElements(`[alt="Rate Driver Pay"]`);

    for (let i = 0; i < driverPayButton.length; i++) {

        driverPayButton[i].focus();
        // driverPayButton[i].select();
    }
}

async function focusOnPrintFileButton() {

    try {
        let fields = await document.getElementsByName("commandbutton");

        if (fields.length > 0) {

            for (let i = 0; i < fields.length; i++) {

                if (fields[i].value === "Print Form") {
                    fields[i].focus();
                    fields[i].select();
                }
            }
        }

    } catch (e) {
        console.error("Cannot find field commandbutton");
    }

}

function focusOnDocumentSelectButton() {

    focusOnField("ctl00$bodyPlaceholder$fileupload");

}

function focusOnRateField() {

    focusOnField("ratenewaccrate");

}

function focusOnTruckField() {

    focusOnField("ctl00$bodyPlaceholder$Search");

}

function focusOnPayButton() {

    focusOnField("paybutton");

}

async function focusOnField(fieldName) {
    try {
        let field = await getField(fieldName);

        field.focus();
        field.select();

    } catch (e) {

        console.log("Cannot find field " + fieldName);
    }
}


function setDocumentTypeField() {

    setFieldValue("ctl00$bodyPlaceholder$docTypeSelect", "O6");

}

function setTypeField() {

    setFieldValue("ratenewacc", "50");
}


function setQttyField() {

    setFieldValue("ratenewaccqty", "1");
}


function setTruckSizeField() {

    setFieldValue("trucksize", "6");
}


async function setFieldValue(elementName, value) {
    try {
        let field = await getField(elementName);

        console.log(elementName + "    field.value    " + field.value);

        field.value = value;
    } catch (e) {
        console.log("Cannot find field " + elementName);
    }
}


function getField(elementName) {
    return document.getElementsByName(elementName)[0];
}


async function getElementsByTitle(elementTitle) {
    return document.querySelectorAll('[title="' + elementTitle + '"]');
}

async function getElements(filter) {
    return document.querySelectorAll(filter);
}


async function hideElementByValue(value) {
    let elements = await getElements('[value="' + value + '"]');

    for (let i = 0; i < elements.length; i++) {

        elements[i].style.visibility = "hidden";
        elements[i].parentElement.style.visibility = "hidden";
    }
}


async function hideElementByTitle(value) {
    let elements = await getElements('[title="' + value + '"]');

    for (let i = 0; i < elements.length; i++) {

        elements[i].style.visibility = "hidden";
        elements[i].parentElement.style.visibility = "hidden";
    }
}
