let model;
let canvas;

const DRAW_WIDTH = 400;
const DRAW_HEIGHT = DRAW_WIDTH;

const PADDING = 10;
const INSTRUCTION_HEIGHT = 40;
const FOOTER_HEIGHT = 200;

const categories = ['triangle',
                'ear',
                'passport',
                'moustache',
                'trumpet',
                'toe',
                'cat',
                'grass',
                'pond',
                'cup',
                'violin',
                'syringe',
                'ladder',
                'mouse',
                'beach',
                'apple',
                'canoe',
                'firetruck',
                'headphones',
                'eraser',
                'smiley face',
                'scissors',
                'baseball bat',
                'leg',
                'bowtie',
                'animal migration',
                'circle',
                'traffic light',
                'power outlet',
                'washing machine',
                'lipstick',
                'sword',
                'van',
                'rhinoceros',
                'chair',
                'rainbow',
                'drill',
                'umbrella',
                'anvil',
                'moon',
                'wine bottle',
                'see saw',
                'hot dog',
                'The Great Wall of China',
                'nail',
                'church',
                'eye',
                'candle',
                'bicycle',
                'sea turtle',
                'cactus',
                'compass',
                'aircraft carrier',
                'cloud',
                'dragon',
                'snowman',
                'car',
                'foot',
                'axe',
                'cookie',
                'tooth',
                'backpack',
                'crab',
                'crayon',
                'giraffe',
                'stove',
                'hot air balloon',
                'mosquito',
                'finger',
                'windmill',
                'dresser',
                'kangaroo',
                'feather',
                'tree',
                'peas',
                'door',
                'bracelet',
                'bridge',
                'clock',
                'flamingo',
                'police car',
                'screwdriver',
                'carrot',
                'pear',
                'vase',
                'jacket',
                'frog',
                'toothbrush',
                'line',
                'knife',
                'potato',
                'keyboard',
                'microphone',
                'saxophone',
                'postcard',
                'sun',
                'cooler',
                'elephant',
                'star',
                'harp',
                'wristwatch',
                'ice cream',
                'pizza',
                'pickup truck',
                'lighthouse',
                'leaf',
                'campfire',
                'helicopter',
                'birthday cake',
                'hot tub',
                'bus',
                'sailboat',
                'crocodile',
                'bat',
                'popsicle',
                'castle',
                'envelope',
                'speedboat',
                'television',
                'cell phone',
                'diamond',
                'pliers',
                'ocean',
                'truck',
                'stethoscope',
                'octagon',
                'bulldozer',
                'cello',
                'tractor',
                'sweater',
                'rain',
                'spider',
                'light bulb',
                'table',
                'fish',
                'flip flops',
                'belt',
                'school bus',
                'sink',
                'purse',
                'bottlecap',
                'beard',
                'fork',
                'sock',
                'penguin',
                'bear',
                'donut',
                'crown',
                'broom',
                'underwear',
                'flashlight',
                'pig',
                'rake',
                'snake',
                'jail',
                'snorkel',
                'hospital',
                'clarinet',
                'matches',
                'oven',
                'parrot',
                'pillow',
                'yoga',
                'mushroom',
                'pants',
                'telephone',
                'house plant',
                'snail',
                'bush',
                'rabbit',
                'hedgehog',
                'broccoli',
                'marker',
                'roller coaster',
                'ambulance',
                'raccoon',
                'soccer ball',
                'binoculars',
                'horse',
                'trombone',
                'spoon',
                'lighter',
                'eyeglasses',
                'scorpion',
                'book',
                'floor lamp',
                'fence',
                'fire hydrant',
                'hat',
                'watermelon',
                'streetlight',
                'whale',
                'cake',
                'knee',
                'tent',
                'parachute',
                'lantern',
                'camera',
                'dog',
                'piano',
                'fan',
                'duck',
                't-shirt',
                'drums',
                'calculator',
                'radio',
                'saw',
                'mouth',
                'square',
                'frying pan',
                'blackberry',
                'chandelier',
                'train',
                'skull',
                'hurricane',
                'rifle',
                'flying saucer',
                'river',
                'wine glass',
                'lion',
                'key',
                'picture frame',
                'toilet',
                'toothpaste',
                'boomerang',
                'stairs',
                'guitar',
                'bread',
                'arm',
                'tornado',
                'dishwasher',
                'sandwich',
                'bucket',
                'swing set',
                'paintbrush',
                'The Eiffel Tower',
                'octopus',
                'shovel',
                'basketball',
                'pencil',
                'cruise ship',
                'monkey',
                'paint can',
                'hammer',
                'mermaid',
                'teapot',
                'mailbox',
                'necklace',
                'remote control',
                'ceiling fan',
                'hexagon',
                'bench',
                'lobster',
                'snowflake',
                'computer',
                'banana',
                'skyscraper',
                'skateboard',
                'tennis racquet',
                'flower',
                'hourglass',
                'microwave',
                'waterslide',
                'bandage',
                'bird',
                'coffee cup',
                'stitches',
                'diving board',
                'hamburger',
                'dumbbell',
                'string bean',
                'wheel',
                'camel',
                'helmet',
                'butterfly',
                'zebra',
                'cow',
                'fireplace',
                'brain',
                'baseball',
                'teddy-bear',
                'hockey stick',
                'laptop',
                'couch',
                'asparagus',
                'sleeping bag',
                'lightning',
                'submarine',
                'sheep',
                'dolphin',
                'angel',
                'nose',
                'bathtub',
                'barn',
                'calendar',
                'stereo',
                'shorts',
                'tiger',
                'megaphone',
                'cannon',
                'camouflage',
                'stop sign',
                'shark',
                'map',
                'steak',
                'strawberry',
                'swan',
                'alarm clock',
                'mountain',
                'suitcase',
                'bed',
                'hand',
                'onion',
                'shoe',
                'owl',
                'motorbike',
                'panda',
                'mug',
                'peanut',
                'bee',
                'airplane',
                'goatee',
                'squiggle',
                'The Mona Lisa',
                'squirrel',
                'garden hose',
                'zigzag',
                'toaster',
                'palm tree',
                'elbow',
                'house',
                'spreadsheet',
                'hockey puck',
                'face',
                'golf club',
                'lollipop',
                'pool',
                'ant',
                'rollerskates',
                'grapes',
                'blueberry',
                'garden',
                'basket',
                'pineapple',
                'paper clip'
            ];

let category_ids = {};

let drawing = [];
let current_stroke = [[], []];
let simplified_drawing = [];
const LOG_PEN_EVERY = 2;
let pen_is_down = false
let tick = 0;
let last_prediction;
let sortedPredictions;
let sortedPredCategories;
let sortedPredScores;
let instruction = 'loading model...';
let current_category;

let resetButton;
let nextButton;

async function setup() {
    frameRate(30);
    canvas = createCanvas(DRAW_WIDTH, DRAW_HEIGHT + PADDING + INSTRUCTION_HEIGHT + PADDING + FOOTER_HEIGHT);
    background(255);

    console.log('Loading model...');
    model = await this.loadAndWarmUpModel('models/model.json');
    console.log('Model loaded');

    this.set_category_ids();
    this.setCurrentCategory();

    resetButton = createButton('clear canvas');
    resetButton.position(10, DRAW_HEIGHT + PADDING + INSTRUCTION_HEIGHT + PADDING + 10);
    resetButton.mousePressed(this.resetCanvas);

    nextButton = createButton('next category');
    nextButton.position(10, DRAW_HEIGHT + PADDING + INSTRUCTION_HEIGHT + PADDING + 35);
    nextButton.mousePressed(this.nextCategory);
}

function set_category_ids() {
    for (let i = 0; i < categories.length; i++) {
        category_ids[categories[i]] = i;
    }
}

function setCurrentCategory() {
    current_category = categories[Math.floor(Math.random() * categories.length)];
    instruction = "Draw: " + current_category;
}

async function predict(sketch) {
    const tensor = tf.tensor(sketch).reshape([1, 200, 3]);
    const prediction = model.predict(tensor);
    const predictionArray = prediction.arraySync();
    const predictionConfidence = Math.max(...predictionArray[0]);
    const predictedCategoryId = predictionArray[0].indexOf(predictionConfidence);
    const predictedCategory = categories[predictedCategoryId];
    last_prediction = {category: predictedCategory, confidence: predictionConfidence};
    const prediction_map = categories.reduce((obj, key, index) => {
        obj[key] = predictionArray[0][index];
        return obj;
    }, {});
    predSorter = Object.entries(prediction_map).sort((a, b) => b[1] - a[1]);
    sortedPredictions = Object.fromEntries(predSorter);
    sortedPredCategories = Object.keys(sortedPredictions);
    sortedPredScores = Object.values(sortedPredictions);
    console.log(sortedPredictions);
}

async function loadAndWarmUpModel(modelPath) {
    const model = await tf.loadLayersModel(modelPath);
    const dummyData = tf.zeros([1, 200, 3]); 

    // Warm-up prediction
    model.predict(dummyData).dispose(); // Dispose to free up GPU memory

    return model;
}

function draw() {
    tick += 1;

    // background
    background(255);

    // drawing area
    fill(220);
    rect(0, 0, DRAW_WIDTH, DRAW_HEIGHT);

    // instructions area
    fill(200);
    rect(0, DRAW_HEIGHT + PADDING, DRAW_WIDTH, INSTRUCTION_HEIGHT, 15);
    fill(25);
    textSize(32);
    textAlign(CENTER);
    text(instruction, int(DRAW_WIDTH/2), DRAW_HEIGHT + PADDING + int(INSTRUCTION_HEIGHT/1.3))

    // predictions area
    if (sortedPredCategories) {
        textSize(32);
        textAlign(CENTER);
        for (let i = 0; i < 5; i++) {
            let category = sortedPredCategories[i];
            let score = sortedPredScores[i];
            fill(int(235 - (255 * score)));
            if (category == current_category) {
                fill(25, 222, 25);
            }
            text(category, int(DRAW_WIDTH/2), DRAW_HEIGHT + PADDING + INSTRUCTION_HEIGHT + PADDING + 30 + (40 * i));
        }
    }
    
    if (mouseIsPressed === true) {
        if (tick % LOG_PEN_EVERY == 0) {
            if (this.mouseInBounds()) {
                pen_is_down = true;
                current_stroke[0].push(mouseX);
                current_stroke[1].push(mouseY);
            }
        }
    } else {
        if (pen_is_down === true) {
            pen_is_down = false;
            drawing.push(current_stroke);
            simplified_drawing.push(ramerDouglasPeucker(current_stroke[0], current_stroke[1], 2.0));
            current_stroke = [[], []];
            console.log(drawing);
            scaled_drawing = this.transformStrokes(simplified_drawing, DRAW_WIDTH);
            scaled_deltas = this.strokesToDeltas(scaled_drawing, DRAW_WIDTH);
            this.predict(scaled_deltas);
        }
    }
    
    this.drawStrokes(drawing);
    if (current_stroke[0].length > 1) {
        this.drawStroke(current_stroke); 
    }
}

function resetCanvas() {
    drawing = [];
    current_stroke = [[], []];
    simplified_drawing = [];
    last_prediction = undefined;
    sortedPredictions = undefined;
    sortedPredCategories = undefined;
    sortedPredScores = undefined;
}

function nextCategory() {
    current_category = categories[Math.floor(Math.random() * categories.length)];
    instruction = "Draw: " + current_category;
    drawing = [];
    current_stroke = [[], []];
    simplified_drawing = [];
    last_prediction = undefined;
    sortedPredictions = undefined;
    sortedPredCategories = undefined;
    sortedPredScores = undefined;
}

function mouseInBounds() {
    if (mouseX >= 0 && mouseX <= DRAW_WIDTH && mouseY >= 0 && mouseY <= DRAW_HEIGHT) {
        return true;
    }
        return false;
  }
  
function drawStrokes(strokes) {
    for (let i = 0; i < drawing.length; i++) {
        this.drawStroke(drawing[i]);
    }
}

function drawStroke(stroke) {
    noFill();
    beginShape();
    for (let i = 0; i < stroke[0].length; i++) {
        vertex(stroke[0][i], stroke[1][i]);
    }
    endShape();
}

function preprocess(sketch) {
    scaledDrawing = this.transformStrokes(simplified_drawing, DRAW_WIDTH);
}

function ramerDouglasPeucker(xPoints, yPoints, epsilon) {
    if (xPoints.length !== yPoints.length) {
        throw new Error("Mismatched input dimensions.");
    }

    let points = xPoints.map((x, i) => ({ x, y: yPoints[i] }));
    let simplified = rdpRecursive(points, epsilon);

    let simplifiedX = simplified.map(point => point.x);
    let simplifiedY = simplified.map(point => point.y);

    return { x: simplifiedX, y: simplifiedY };
}

function rdpRecursive(points, epsilon) {
    let dmax = 0.0;
    let index = 0;
    let start = points[0];
    let end = points[points.length - 1];

    for (let i = 1; i < points.length - 1; i++) {
        let d = pointLineDistance(points[i], start, end);
        if (d > dmax) {
            index = i;
            dmax = d;
        }
    }

    if (dmax >= epsilon) {
        let results1 = rdpRecursive(points.slice(0, index + 1), epsilon);
        let results2 = rdpRecursive(points.slice(index), epsilon);
        return results1.slice(0, -1).concat(results2);
    } else {
        return [start, end];
    }
}

function pointLineDistance(point, lineStart, lineEnd) {
    let num = Math.abs((lineEnd.y - lineStart.y) * point.x -
        (lineEnd.x - lineStart.x) * point.y +
        lineEnd.x * lineStart.y -
        lineEnd.y * lineStart.x);

    if (num === 0) {
        return 0;
    }

    let den = Math.sqrt(Math.pow(lineEnd.y - lineStart.y, 2) + Math.pow(lineEnd.x - lineStart.x, 2));

    if (den === 0) {
        return 0;
    }

    return num / den;
}

function transformStrokes(strokes, maxVal = 255) {
    let minX = maxVal;
    let maxX = 0;
    let minY = maxVal;
    let maxY = 0;

    for (let stroke of strokes) {
        minX = Math.min(...stroke.x, minX);
        maxX = Math.max(...stroke.x, maxX);
        minY = Math.min(...stroke.y, minY);
        maxY = Math.max(...stroke.y, maxY);
    }

    let f = maxVal / Math.max(Math.max(maxX - minX, maxY - minY), 1);  // prevent divide by 0

    let resizedStrokes = [];
    for (let stroke of strokes) {
        resizedStrokes.push([
            stroke.x.map(point => (point - minX) * f),
            stroke.y.map(point => (point - minY) * f)
        ]);
    }

    return resizedStrokes;
}

function strokesToDeltas(strokes, maxLen = 255, maxSequenceLength = 200) {
    let deltas = [];

    for (let stroke of strokes) {
        let x = stroke[0];
        let y = stroke[1];
        for (let i = 0; i < x.length; i++) {
            // Calculate delta
            let dx = (i > 0 ? x[i] - x[i - 1] : x[i]) / maxLen;
            let dy = (i > 0 ? y[i] - y[i - 1] : y[i]) / maxLen;

            // Check for new stroke
            let strokeFlag;
            strokeFlag = i === 0 ? 1 : 0;
            deltas.push([dx, dy, strokeFlag]);
        }
    }

    // Padding the sequence with zeros to reach maxSequenceLength
    let paddingLength = maxSequenceLength - deltas.length;
    for (let i = 0; i < paddingLength; i++) {
        deltas.push([0, 0, 0]);
    }

    // Trim to maxSequenceLength
    return deltas.slice(0, maxSequenceLength);
}
