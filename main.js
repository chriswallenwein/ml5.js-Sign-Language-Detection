let mobileNet;
let label = "";
let imageModelDir = "./model2/"
//let imageModelDir = "https://teachablemachine.withgoogle.com/models/EQeol2q74/"
let webcam;
let c;

function setup(){
    createCanvas(640, 500);
    strokeWeight(1);
    webcam = createCapture(VIDEO);
    //webcam = ml5.flipImage(webcam);
    webcam.size(640, 480)
    webcam.hide();

    mobileNet = ml5.imageClassifier(imageModelDir + "model.json", webcam, classifyVideo);
    //
    // custom model either has to be created with tf.layers.*, tf.sequential(), and tf.model() and saved with tf.LayersMode.save()
    // or converted from Keras to Tensorflow tf.keras using tensorflowjs_converter
}

function draw(){
    image(webcam, 0, 0, width, height);
    c = webcam.get(100, 100, 200, 200)
    image(c, 100,100);
    rect(100, 100, 200, 200);
    fill(color("rgba(0, 0, 0, 0)"))
    text(label, 10, height - 100);
}

function classifyVideo(){
    mobileNet.classify(c, gotResults);
//.get(100, 100, 200, 200)
}

function gotResults(error, result){
    if(error){
        console.log(error)
    }else{
        label = result[0].label
        console.log(label)
        mobileNet.classify(gotResults);
    }
}