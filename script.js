// Navigation functionality
function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all nav tabs
  const navTabs = document.querySelectorAll(".nav-tab");
  navTabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Add active class to clicked nav tab
  event.target.classList.add("active");
}

function displayQuestion() {
  const question = quizQuestions[currentQuestionIndex];
  const quizContent = document.getElementById("quiz-content");

  quizContent.innerHTML = `
                <div class="quiz-question">
                    <h3>კითხვა ${currentQuestionIndex + 1}/${
    quizQuestions.length
  }</h3>
                    <p><strong>${question.question}</strong></p>
                    <ul class="quiz-options">
                        ${question.options
                          .map(
                            (option, index) => `
                            <li onclick="selectAnswer(${index})" data-index="${index}">
                                ${String.fromCharCode(97 + index)}) ${option}
                            </li>
                        `
                          )
                          .join("")}
                    </ul>
                    <div style="margin-top: 20px;">
                        ${
                          currentQuestionIndex > 0
                            ? '<button class="btn" onclick="previousQuestion()" style="margin-right: 10px;">⬅️ წინა</button>'
                            : ""
                        }
                        <button class="btn" onclick="nextQuestion()" id="next-btn" disabled>${
                          currentQuestionIndex === quizQuestions.length - 1
                            ? "დასრულება"
                            : "შემდეგი ➡️"
                        }</button>
                    </div>
                </div>
            `;

  // Show previously selected answer
  if (userAnswers[currentQuestionIndex] !== undefined) {
    const selectedOption = quizContent.querySelector(
      `[data-index="${userAnswers[currentQuestionIndex]}"]`
    );
    if (selectedOption) {
      selectedOption.classList.add("selected");
      document.getElementById("next-btn").disabled = false;
    }
  }
}

function selectAnswer(answerIndex) {
  // Remove previous selection
  const options = document.querySelectorAll(".quiz-options li");
  options.forEach((option) => option.classList.remove("selected"));

  // Add selection to clicked option
  event.target.classList.add("selected");

  // Store answer
  userAnswers[currentQuestionIndex] = answerIndex;

  // Enable next button
  document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
  if (userAnswers[currentQuestionIndex] === undefined) {
    alert("გთხოვთ აირჩიოთ პასუხი!");
    return;
  }

  if (currentQuestionIndex === quizQuestions.length - 1) {
    showResults();
  } else {
    currentQuestionIndex++;
    displayQuestion();
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
  }
}

function showResults() {
  let correctAnswers = 0;

  for (let i = 0; i < quizQuestions.length; i++) {
    if (userAnswers[i] === quizQuestions[i].correct) {
      correctAnswers++;
    }
  }

  const percentage = Math.round((correctAnswers / quizQuestions.length) * 100);
  let message = "";
  let emoji = "";

  if (percentage >= 90) {
    message = "შესანიშნავი! თქვენ ძალიან კარგად იცით JavaScript-ი!";
    emoji = "🏆";
  } else if (percentage >= 70) {
    message = "კარგი შედეგი! თქვენ კარგად ესმით ძირითადი კონცეფციები.";
    emoji = "👍";
  } else if (percentage >= 50) {
    message = "არცთუ ცუდი! საჭიროა დამატებითი შესწავლა.";
    emoji = "📚";
  } else {
    message = "საჭიროა მასალის გამეორება. არ იმწუხაროთ, ყველაფერი ისწავლება!";
    emoji = "💪";
  }

  const resultsHTML = `
                <div class="quiz-score">
                    <h2>${emoji} ქვიზი დასრულდა!</h2>
                    <div style="font-size: 3rem; margin: 20px 0;">${percentage}%</div>
                    <p><strong>${correctAnswers}/${
    quizQuestions.length
  } სწორი პასუხი</strong></p>
                    <p>${message}</p>
                    
                    <div style="text-align: left; max-width: 600px; margin: 30px auto;">
                        <h3>დეტალური შედეგები:</h3>
                        ${quizQuestions
                          .map((question, index) => {
                            const userAnswer = userAnswers[index];
                            const isCorrect = userAnswer === question.correct;
                            return `
                                <div style="background: ${
                                  isCorrect ? "#e8f5e8" : "#ffeaea"
                                }; 
                                           border-left: 4px solid ${
                                             isCorrect ? "#4caf50" : "#f44336"
                                           }; 
                                           padding: 15px; margin: 10px 0; border-radius: 8px;">
                                    <p><strong>კითხვა ${index + 1}:</strong> ${
                              question.question
                            }</p>
                                    <p><strong>თქვენი პასუხი:</strong> ${
                                      question.options[userAnswer]
                                    } ${isCorrect ? "✅" : "❌"}</p>
                                    ${
                                      !isCorrect
                                        ? `<p><strong>სწორი პასუხი:</strong> ${
                                            question.options[question.correct]
                                          } ✅</p>`
                                        : ""
                                    }
                                </div>
                            `;
                          })
                          .join("")}
                    </div>
                </div>
            `;

  document.getElementById("quiz-content").innerHTML = resultsHTML;
  document.getElementById("reset-btn").style.display = "inline-block";
}

function resetQuiz() {
  quizStarted = false;
  currentQuestionIndex = 0;
  userAnswers = [];

  document.querySelector(".exercise-box").style.display = "block";
  document.querySelector(".highlight").style.display = "block";
  document.querySelector('button[onclick="startQuiz()"]').style.display =
    "inline-block";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("reset-btn").style.display = "none";
}

function submitQuiz() {
  showResults();
}

// Smooth scrolling for better UX
document.addEventListener("DOMContentLoaded", function () {
  // Add smooth scrolling to all nav tabs
  const navTabs = document.querySelectorAll(".nav-tab");
  navTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    });
  });

  // Add copy code functionality to code blocks
  const codeBlocks = document.querySelectorAll(".example-box pre code");
  codeBlocks.forEach((block) => {
    block.addEventListener("click", function () {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(() => {
        // Create temporary notification
        const notification = document.createElement("div");
        notification.textContent = "კოდი დაკოპირდა! 📋";
        notification.style.cssText = `
                            position: fixed;
                            top: 20px;
                            right: 20px;
                            background: #667eea;
                            color: white;
                            padding: 10px 20px;
                            border-radius: 8px;
                            z-index: 1000;
                            animation: fadeInOut 2s ease-in-out;
                        `;

        document.body.appendChild(notification);
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 2000);
      });
    });

    // Add hover effect for code blocks
    block.style.cursor = "pointer";
    block.title = "დააკლიკეთ კოდის კოპირებისთვის";
  });
});

// Add CSS animation for notifications
const style = document.createElement("style");
style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateY(-20px); }
                20% { opacity: 1; transform: translateY(0); }
                80% { opacity: 1; transform: translateY(0); }
                100% { opacity: 0; transform: translateY(-20px); }
            }
        `;
document.head.appendChild(style);

// Add keyboard navigation
document.addEventListener("keydown", function (e) {
  if (quizStarted) {
    switch (e.key) {
      case "1":
      case "2":
      case "3":
      case "4":
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll(".quiz-options li");
        if (options[optionIndex]) {
          options[optionIndex].click();
        }
        break;
      case "Enter":
        const nextBtn = document.getElementById("next-btn");
        if (nextBtn && !nextBtn.disabled) {
          nextBtn.click();
        }
        break;
      case "ArrowLeft":
        if (currentQuestionIndex > 0) {
          previousQuestion();
        }
        break;
      case "ArrowRight":
        const nextButton = document.getElementById("next-btn");
        if (nextButton && !nextButton.disabled) {
          nextQuestion();
        }
        break;
    }
  }
});

// Progress tracking
function updateProgress() {
  if (quizStarted) {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    // Create or update progress bar
    let progressBar = document.getElementById("quiz-progress");
    if (!progressBar) {
      progressBar = document.createElement("div");
      progressBar.id = "quiz-progress";
      progressBar.style.cssText = `
                        width: 100%;
                        height: 8px;
                        background: #e9ecef;
                        border-radius: 4px;
                        margin-bottom: 20px;
                        overflow: hidden;
                    `;

      const progressFill = document.createElement("div");
      progressFill.id = "quiz-progress-fill";
      progressFill.style.cssText = `
                        height: 100%;
                        background: linear-gradient(90deg, #667eea, #764ba2);
                        border-radius: 4px;
                        transition: width 0.3s ease;
                        width: ${progress}%;
                    `;

      progressBar.appendChild(progressFill);
      document.getElementById("quiz-content").prepend(progressBar);
    } else {
      document.getElementById("quiz-progress-fill").style.width =
        progress + "%";
    }
  }
}

// Update displayQuestion to include progress
const originalDisplayQuestion = displayQuestion;
displayQuestion = function () {
  originalDisplayQuestion();
  updateProgress();
};
