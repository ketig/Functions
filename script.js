// ინტერაქტიული მაგალითების სკრიპტები

function testFunctions() {
  const output = document.getElementById("functionOutput");
  let result = "";

  // Function Declaration
  function ტრადიციული(x) {
    return x * 2;
  }

  // Function Expression
  const გამოთქმითი = function (x) {
    return x * 3;
  };

  // Arrow Function
  const ისრისებური = (x) => x * 4;

  result += "Function Declaration: ტრადიციული(5) = " + ტრადიციული(5) + "\n";
  result += "Function Expression: გამოთქმითი(5) = " + გამოთქმითი(5) + "\n";
  result += "Arrow Function: ისრისებური(5) = " + ისრისებური(5) + "\n";

  output.innerHTML = result.replace(/\n/g, "<br>");
}

function testScope() {
  const output = document.getElementById("scopeOutput");
  let result = "";

  let გლობალური = "გლობალური ცვლადი";

  function scopeTest() {
    let ფუნქციური = "ფუნქციური ცვლადი";

    if (true) {
      let ბლოკური = "ბლოკური ცვლადი";
      result += "ბლოკის შიგნით - გლობალური: " + გლობალური + "\n";
      result += "ბლოკის შიგნით - ფუნქციური: " + ფუნქციური + "\n";
      result += "ბლოკის შიგნით - ბლოკური: " + ბლოკური + "\n";
    }

    result += "ფუნქციაში - გლობალური: " + გლობალური + "\n";
    result += "ფუნქციაში - ფუნქციური: " + ფუნქციური + "\n";
    // result += 'ფუნქციაში - ბლოკური: ' + ბლოკური; // შეცდომა იქნებოდა
  }

  scopeTest();
  result += "გლობალურად - გლობალური: " + გლობალური + "\n";

  output.innerHTML = result.replace(/\n/g, "<br>");
}

function testScopeChain() {
  const output = document.getElementById("scopeChainOutput");
  let result = "";

  let a = "გლობალური a";
  let b = "გლობალური b";

  function level1() {
    let a = "დონე1 a";

    function level2() {
      let c = "დონე2 c";

      result += "დონე2-ში a: " + a + " (დონე1-იდან)\n";
      result += "დონე2-ში b: " + b + " (გლობალურიდან)\n";
      result += "დონე2-ში c: " + c + " (ლოკალური)\n";

      return "Scope Chain მუშაობს!";
    }

    return level2();
  }

  level1();
  output.innerHTML = result.replace(/\n/g, "<br>");
}

function testClosure() {
  const output = document.getElementById("closureOutput");
  let result = "";

  // Counter closure
  function შექმენი_კაუნტერი(საწყისი = 0) {
    let რიცხვი = საწყისი;

    return function () {
      რიცხვი++;
      return რიცხვი;
    };
  }

  const კაუნტერი1 = შექმენი_კაუნტერი(0);
  const კაუნტერი2 = შექმენი_კაუნტერი(10);

  result += "კაუნტერი1: " + კაუნტერი1() + "\n"; // 1
  result += "კაუნტერი1: " + კაუნტერი1() + "\n"; // 2
  result += "კაუნტერი2: " + კაუნტერი2() + "\n"; // 11
  result += "კაუნტერი1: " + კაუნტერი1() + "\n"; // 3
  result += "კაუნტერი2: " + კაუნტერი2() + "\n"; // 12

  result += "\nთითოეული closure ინარჩუნებს საკუთარ მდგომარეობას!";

  output.innerHTML = result.replace(/\n/g, "<br>");
}

// გვერდის ჩატვირთვისას მისალმება
document.addEventListener("DOMContentLoaded", function () {
  console.log("🎓 JavaScript ფუნქციები და Scope - მენტორის სესია დაიწყო!");
  console.log("📖 ყველა მაგალითი მზადაა ინტერაქციისთვის");
});
