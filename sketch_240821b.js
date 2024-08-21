let screenWidth = 1000;  // عرض الشاشة
let screenHeight = 600;  // ارتفاع الشاشة
let temp = "";              // درجة الحرارة
let Patmosphere = "";       // الضغط الجوي
let Preq = 0;              // ضغط النيتروجين المطلوب
let tempSelected = false;
let PatmosphereSelected = false;

function setup() {
    createCanvas(screenWidth, screenHeight);
    textFont('Aldhabi', 40);
}

function draw() {
    background(0);  // لون الخلفية الأسود
    fill(255, 215, 0);  // لون الخط الذهبي
    textAlign(CENTER);
    text("Nitrogen Pressure required for Exocet MM40 B3 ammunition", screenWidth / 2, 50);

    textAlign(LEFT);
    text("Enter Temperature in Celsius:", screenWidth / 2 - 300, 150);
    text("Enter Atmospheric Pressure in mbar:", screenWidth / 2 - 350, 250);

    if (Preq > 0) {
        fill(255, 215, 0);  // لون الخط الذهبي
        text("Required Nitrogen Pressure (mbar): " + nf(Preq, 1, 2), screenWidth / 2 - 250, 500);
    }

    drawInputFields();
    drawCalculateButton();
}

function drawInputFields() {
    fill(tempSelected ? 180 : 180);
    rect(screenWidth / 2 + 50, 120, 200, 50);
    fill(0, 0, 0);  // لون النص الذهبي
    text(temp, screenWidth / 2 + 70, 150);

    fill(PatmosphereSelected ? 180 : 180);
    rect(screenWidth / 2 + 50, 220, 200, 50);
    fill(0, 0, 0);  // لون النص الذهبي
    text(Patmosphere, screenWidth / 2 + 70, 250);
}

function drawCalculateButton() {
    fill(0, 102, 153);
    rect(screenWidth / 2 - 75, 350, 150, 50);
    fill(255);
    textAlign(CENTER, CENTER);
    text("Calculate", screenWidth / 2, 375);
}

function mousePressed() {
    if (mouseX > screenWidth / 2 + 50 && mouseX < screenWidth / 2 + 250 && mouseY > 120 && mouseY < 170) {
        tempSelected = true;
        PatmosphereSelected = false;
    } else if (mouseX > screenWidth / 2 + 50 && mouseX < screenWidth / 2 + 250 && mouseY > 220 && mouseY < 270) {
        PatmosphereSelected = true;
        tempSelected = false;
    } else if (mouseX > screenWidth / 2 - 75 && mouseX < screenWidth / 2 + 75 && mouseY > 350 && mouseY < 400) {
        if (temp !== "" && Patmosphere !== "") {
            let tempValue = parseFloat(temp);
            let PatmosphereValue = parseFloat(Patmosphere);
            Preq = 4.828 * (tempValue + 273) - PatmosphereValue;
        }
        tempSelected = false;
        PatmosphereSelected = false;
    } else {
        tempSelected = false;
        PatmosphereSelected = false;
    }
}

function keyPressed() {
    if ((key >= '0' && key <= '9') || key === '.') {
        if (tempSelected) {
            temp += key;
        } else if (PatmosphereSelected) {
            Patmosphere += key;
        }
    } else if (key === 'Backspace') {
        if (tempSelected && temp.length > 0) {
            temp = temp.substring(0, temp.length - 1);
        } else if (PatmosphereSelected && Patmosphere.length > 0) {
            Patmosphere = Patmosphere.substring(0, Patmosphere.length - 1);
        }
    }
}
