function askAI() {
  const lesson = document.getElementById("lesson").value;
  const question = document.getElementById("question").value;
  const chat = document.getElementById("chat");

  if (lesson.trim() === "" || question.trim() === "") return;

  addMessage(question, "user");
  addMessage("AI กำลังวิเคราะห์บทเรียน...", "ai");

  setTimeout(() => {
    const answer = smartMultiAnswer(lesson, question);
    chat.lastChild.remove();
    addMessage(answer, "ai");
  }, 1000);
}

function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = type;
  msg.innerText = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function smartMultiAnswer(lesson, question) {
  const stopWords = [
    "คือ","อะไร","อย่างไร","เพราะอะไร","บ้าง",
    "ได้แก่","อธิบาย","จง","จากบทเรียน"
  ];

  let keywords = question.toLowerCase().split(" ");
  keywords = keywords.filter(w => !stopWords.includes(w) && w.length > 1);

  const sentences = lesson.split(/[\n\.]/);
  let matches = [];

  sentences.forEach(sentence => {
    let score = 0;
    keywords.forEach(word => {
      if (sentence.toLowerCase().includes(word)) score++;
    });
    if (score > 0) matches.push(sentence.trim());
  });

  if (matches.length === 0) {
    return "จากการวิเคราะห์บทเรียน ไม่พบข้อมูลที่ตรงกับคำถาม";
  }

  return "จากบทเรียนพบว่า\n- " + matches.slice(0, 3).join("\n- ");
}

