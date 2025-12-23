function askAI() {
  const lesson = document.getElementById("lesson").value;
  const question = document.getElementById("question").value;
  const chat = document.getElementById("chat");

  if (lesson.trim() === "" || question.trim() === "") return;

  // 🔴 ล้างคำตอบเก่าทั้งหมด
  chat.innerHTML = "";

  // แสดงคำถาม
  addMessage(question, "user");
  addMessage("AI กำลังวิเคราะห์บทเรียน...", "ai");

  setTimeout(() => {
    const answer = smartMultiAnswer(lesson, question);

    // ลบข้อความ "กำลังวิเคราะห์..."
    chat.lastChild.remove();

    // แสดงคำตอบใหม่
    addMessage(answer, "ai");
  }, 1000);
}

