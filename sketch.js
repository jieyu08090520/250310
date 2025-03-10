let radio;
let button;
let restartButton;
let input;
let questions = [];
let currentQuestionIndex = 0;
let correctAnswer;
let resultText = '';
let correctCount = 0;
let incorrectCount = 0;

function preload() {
  // 載入 CSV 檔案
  questions = loadTable('questions.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#fefae0");
  
  // 建立 Radio 物件
  radio = createRadio();
  radio.position(windowWidth / 2 - 100, windowHeight / 2 - 20);
  radio.style('width', '400px');
  radio.style('font-size', '20px');
  radio.style('display', 'block');
  
  // 建立填充題輸入框
  input = createInput();
  input.position(windowWidth / 2 - 100, windowHeight / 2 - 20);
  input.style('width', '400px');
  input.style('font-size', '20px');
  input.hide();
  
  // 建立按鈕物件
  button = createButton('提交');
  button.position(windowWidth / 2 - 30, windowHeight / 2 + 100);
  button.style('font-size', '20px');
  button.mousePressed(checkAnswer);
  
  // 顯示第一題
  showQuestion();
}

function draw() {
  background("#fefae0");
  
  // 顯示左上角資訊
  textAlign(LEFT);
  textSize(20);
  fill(0);
  text('413730994陳佳堉', 10, 30);
  text(`答對題數：${correctCount}，答錯題數：${incorrectCount}`, 10, 60);
  
  if (currentQuestionIndex < questions.getRowCount()) {
    // 顯示題目
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text(questions.getString(currentQuestionIndex, 'question'), windowWidth / 2, windowHeight / 2 - 60);
  } else {
    // 顯示測驗結果
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text(`測驗結束！答對題數：${correctCount}，答錯題數：${incorrectCount}`, windowWidth / 2, windowHeight / 2 - 60);
    
    // 移除選項和按鈕
    radio.hide();
    input.hide();
    button.hide();
    
    // 顯示重新開始按鈕
    if (!restartButton) {
      restartButton = createButton('重新開始');
      restartButton.position(windowWidth / 2 - 50, windowHeight / 2 + 100);
      restartButton.style('font-size', '20px');
      restartButton.mousePressed(restartQuiz);
    }
  }
  
  // 顯示結果
  textSize(24);
  text(resultText, windowWidth / 2, windowHeight / 2 + 160);
}

function showQuestion() {
  radio.html('');
  input.hide();
  let question = questions.getString(currentQuestionIndex, 'question');
  let options = questions.getString(currentQuestionIndex, 'options').split(';');
  correctAnswer = questions.getString(currentQuestionIndex, 'answer');
  let type = questions.getString(currentQuestionIndex, 'type');
  
  print(type)
  if (type === 'fill') {
    // 顯示填充題
    input.show();
  } else {
    // 顯示選擇題
    options.forEach(option => {
      let optionLabel = option.replace(/\s+/g, ' ');
      radio.option(optionLabel);
    });
    radio.show();
  }
}

function checkAnswer() {
  let answer;
  let type = questions.getString(currentQuestionIndex, 'type');
  if (type === 'fill') {
    answer = input.value();
  } else {
    answer = radio.value();
  }
  
  if (answer) {
    if (answer === correctAnswer) {
      resultText = '答對了！';
      correctCount++;
    } else {
      resultText = '錯誤，請再試一次。';
      incorrectCount++;
    }
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.getRowCount()) {
      showQuestion();
    } else {
      resultText = `測驗結束！答對題數：${correctCount}，答錯題數：${incorrectCount}`;
    }
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  correctCount = 0;
  incorrectCount = 0;
  resultText = '';
  radio.show();
  input.hide();
  button.show();
  restartButton.remove();
  restartButton = null;
  showQuestion();
}
