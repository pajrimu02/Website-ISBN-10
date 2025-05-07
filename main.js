// Fungsi Validasi ISBN-10
function validateISBN10() {
  let isbn = document.getElementById("isbn").value.trim();
  let result = document.getElementById("result");

  if (!/^[0-9]{9}[0-9xX]$/.test(isbn)) {
    result.textContent = "Masukkan 10 digit untuk validasi ISBN-10.";
    result.style.color = "red";
    return;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(isbn[i]);
    if (isNaN(digit)) {
      result.textContent = "Terdapat karakter tidak valid.";
      result.style.color = "red";
      return;
    }
    sum += (10 - i) * digit;
  }

  let checkDigit = isbn[9].toLowerCase() === "x" ? 10 : parseInt(isbn[9]);
  if (isNaN(checkDigit)) {
    result.textContent = "Check digit tidak valid.";
    result.style.color = "red";
    return;
  }

  sum += checkDigit;

  if (sum % 11 === 0) {
    result.textContent = "✅ ISBN-10 valid!";
    result.style.color = "green";
  } else {
    result.textContent = "❌ ISBN-10 tidak valid.";
    result.style.color = "red";
  }
}

// Fungsi mencari Check Digit ISBN-10
function findCheckDigit10() {
  let isbn = document.getElementById("isbn").value.trim();
  let result = document.getElementById("result");

  if (!/^[0-9]{9}$/.test(isbn)) {
    result.textContent =
      "Masukkan tepat 9 digit angka untuk mencari check digit ISBN-10.";
    result.style.color = "red";
    return;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    let digit = parseInt(isbn[i]);
    if (isNaN(digit)) {
      result.textContent = "Karakter tidak valid ditemukan.";
      result.style.color = "red";
      return;
    }
    sum += (10 - i) * digit;
  }

  let checkDigit = (11 - (sum % 11)) % 11;
  result.innerHTML = `🔢 Check digit untuk ISBN-10 ini adalah <b>${
    checkDigit === 10 ? "X" : checkDigit
  }</b>`;
  result.style.color = "blue";
}

// Fungsi mencari nilai x pada ISBN-10
function solveForX10() {
  let isbn = document.getElementById("isbn").value.trim();
  let result = document.getElementById("result");

  if (!/^[0-9xX]{10}$/.test(isbn)) {
    result.textContent =
      "Masukkan 10 digit dengan satu 'x' sebagai angka yang ingin dicari.";
    result.style.color = "red";
    return;
  }

  let xCount = (isbn.match(/[xX]/g) || []).length;
  if (xCount !== 1) {
    result.textContent = "ISBN harus mengandung tepat satu 'x'.";
    result.style.color = "red";
    return;
  }

  let xIndex = isbn.toLowerCase().indexOf("x");
  let totalKnown = 0;

  for (let i = 0; i < 10; i++) {
    if (i === xIndex) continue;
    let digit = parseInt(isbn[i]);
    if (isNaN(digit)) {
      result.textContent = "Karakter selain 'x' harus berupa angka.";
      result.style.color = "red";
      return;
    }
    totalKnown += (10 - i) * digit;
  }

  for (let x = 0; x <= 10; x++) {
    let xValue = x === 10 ? 10 : x;
    let total = totalKnown + (10 - xIndex) * xValue;
    if (total % 11 === 0) {
      result.innerHTML = `❓ Nilai <b>x</b> yang valid adalah <b>${
        x === 10 ? "X" : x
      }</b>`;
      result.style.color = "blue";
      return;
    }
  }

  result.textContent = "Tidak ditemukan nilai yang valid untuk 'x'.";
  result.style.color = "red";
}
