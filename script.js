function showSection(sectionId) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all tabs
  const tabs = document.querySelectorAll(".nav-tab");
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Show selected section
  document.getElementById(sectionId).classList.add("active");

  // Add active class to clicked tab
  event.target.classList.add("active");
}

function startQuiz() {
  alert("🎉 ქვიზი დაიწყო! შეკითხვები ჩაიტვირთება ახალ ფანჯარაში.");
  // აქ შეიძლება დაემატოს რეალური ქვიზის ლოგიკა
}

// Code syntax highlighting simulation
document.addEventListener("DOMContentLoaded", function () {
  // Add some interactivity
  const codeBlocks = document.querySelectorAll(".example-box code");
  codeBlocks.forEach((block) => {
    block.addEventListener("click", function () {
      // Copy to clipboard functionality could be added here
      console.log("Code block clicked - copy functionality can be added");
    });
  });
});
