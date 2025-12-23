function askAI() {
  const lessonEl = document.getElementById("lesson");
  const questionEl = document.getElementById("question");
  const chat = document.getElementById("chat");

  if (!lessonEl || !questionEl || !chat) {
    alert("หา element ไม่เจอ");
    return;
  }

  const lesson = lessonEl.value.trim();
  const question = questionEl.value.trim();

  if (lesson === "" || question === "") return;

  // ✅ ล้างคำตอบเก่าทั้งหมด (บังคับ)
  chat.innerHTML = "";

  // แสดงคำถาม
  addMessage(question, "user");

  // แสดงสถานะคิด
  addMessage("AI กำลังวิเคราะห์บทเรียน...", "ai");

  setTimeout(() => {
    // ลบข้อความกำลังคิด
    chat.innerHTML = "";

    // แสดงคำถาม + คำตอบใหม่เท่านั้น
    addMessage(question, "user");
    addMessage(smartMultiAnswer(lesson, question), "ai");
  }, 800);
}

function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = type;
  msg.innerText = text;
  chat.appendChild(msg);
}

function smartMultiAnswer(lesson, question) {
  const stopWords = [
    "คือ","อะไร","อย่างไร","เพราะอะไร","บ้าง",
    "ได้แก่","อธิบาย","จง","จากบทเรียน"
  ];

  let keywords = question.toLowerCase().split(" ");
  keywords = keywords.filter(w => !stopWords.includes(w) && w.length > 1);

  const sentences = lesson.split(/[\n\.]/);
  let results = [];

  sentences.forEach(sentence => {
    let score = 0;
    keywords.forEach(word => {
      if (sentence.toLowerCase().includes(word)) score++;
    });
    if (score > 0) results.push(sentence.trim());
  });

  if (results.length === 0) {
    return "จากการวิเคราะห์บทเรียน ไม่พบข้อมูลที่ตรงกับคำถาม";
  }

  return "จากบทเรียนพบว่า\n- " + results.slice(0, 3).join("\n- ");
}
