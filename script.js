function askAI() {
  const lesson = document.getElementById("lesson").value;
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer");

  if (lesson.trim() === "" || question.trim() === "") {
    answer.innerText = "กรุณาใส่บทเรียนและคำถามก่อน";
    return;
  }

  answer.innerText = "AI กำลังวิเคราะห์บทเรียน...";

  setTimeout(() => {
    answer.innerText = findAnswer(lesson, question);
  }, 1200);
}

function findAnswer(lesson, question) {
  const sentences = lesson.split(/[\.\n]/);
  const keywords = question.toLowerCase().split(" ");

  let bestSentence = "";
  let maxScore = 0;

  sentences.forEach(sentence => {
    let score = 0;
    keywords.forEach(word => {
      if (sentence.toLowerCase().includes(word)) {
        score++;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestSentence = sentence;
    }
  });

  if (maxScore === 0) {
    return "AI ไม่พบคำตอบที่ตรงกับบทเรียนที่ให้มา";
  }

  return bestSentence.trim();
}
