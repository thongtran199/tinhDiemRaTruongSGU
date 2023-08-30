const inputSTCTichLuy = document.getElementById("stcTichLuy");
const inputGPATichLuy = document.getElementById("gpaTichLuy");
const inputSTCYeuCau = document.getElementById("stcYeuCau");
const inputGPAMongMuon = document.getElementById("gpaMongMuon");
const input4HCT = document.getElementById("soMon4ChiHCT");
const input3HCT = document.getElementById("soMon3ChiHCT");
const input2HCT = document.getElementById("soMon2ChiHCT");

const chuaDien = document.getElementsByClassName("chua-dien")[0];
const ketQua = document.getElementsByClassName("ket-qua")[0];
const kiemTraButton = document.getElementById("kiemTraButton");
document.addEventListener("DOMContentLoaded", function () {
  const inputElements = document.getElementsByClassName("form-control");

  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].addEventListener("input", function (event) {
      // console.log(event.target.value);
      handle();
    });
  }
  const selectElements = document.getElementsByClassName("form-select");
  for (let i = 0; i < selectElements.length; i++) {
    selectElements[i].addEventListener("change", function (event) {
      handle();
    });
  }
});
kiemTraButton.addEventListener("click", function () {
  handle();
});

function handle() {
  var stcTichLuy = inputSTCTichLuy.value;
  var gpaTichLuy = inputGPATichLuy.value;
  const stcYeuCau = inputSTCYeuCau.value;
  const gpaMongMuon = inputGPAMongMuon.value;
  const soMon4HTC = input4HCT.value == "" ? 0 : parseInt(input4HCT.value);
  const soMon3HTC = input3HCT.value == "" ? 0 : parseInt(input3HCT.value);
  const soMon2HTC = input2HCT.value == "" ? 0 : parseInt(input2HCT.value);
  // console.log(soMon4HTC);
  if (stcTichLuy && gpaTichLuy && stcYeuCau && gpaMongMuon) {
    if (gpaTichLuy && (gpaTichLuy < 0.0 || gpaTichLuy > 4.0)) {
      ketQua.innerHTML = "Xem lại GPA tích lũy";
      return;
    }
    if (gpaMongMuon && (gpaMongMuon < 0.0 || gpaMongMuon > 4.0)) {
      ketQua.innerHTML = "Xem lại GPA mong muốn";
      return;
    }
    if (soMon4HTC < 0 || soMon3HTC < 0 || soMon2HTC < 0) {
      ketQua.innerHTML = "Số môn học cải thiện phải là số dương";
      return;
    }
    if (soMon4HTC > 0) {
      const formSelect = input4HCT.nextElementSibling;
      // console.log(formSelect);
      console.log(formSelect.value);
      gpaTichLuy =
        (gpaTichLuy * stcTichLuy + soMon4HTC * 4 * formSelect.value) /
        stcTichLuy;
    }
    if (soMon3HTC > 0) {
      const formSelect = input3HCT.nextElementSibling;
      // console.log(formSelect);
      console.log(formSelect.value);
      gpaTichLuy =
        (gpaTichLuy * stcTichLuy + soMon3HTC * 3 * formSelect.value) /
        stcTichLuy;
    }
    if (soMon2HTC > 0) {
      const formSelect = input2HCT.nextElementSibling;
      // console.log(formSelect);
      console.log(formSelect.value);
      gpaTichLuy =
        (gpaTichLuy * stcTichLuy + soMon2HTC * 2 * formSelect.value) /
        stcTichLuy;
    }
    console.log("GPA tich luy: " + gpaTichLuy);
    const stcConLai = stcYeuCau - stcTichLuy;

    ketQua.innerHTML = "Bạn cần đạt tối thiểu ";
    var span1 = document.createElement("span");
    var span2 = document.createElement("span");
    span1.className = "fw-bolder";
    span2.className = "fw-bolder";

    var a = Math.floor(
      gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 3 * stcConLai
    );
    if (a < 0) {
      var b = Math.floor(
        gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 2 * stcConLai
      );
      if (b < 0) {
        var c = Math.floor(
          gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 1 * stcConLai
        );
        if (c < 0) {
          var d = Math.floor(
            gpaMongMuon * stcYeuCau - gpaTichLuy * stcTichLuy - 0 * stcConLai
          );
          if (d < 0) {
            ketQua.innerHTML = "";
            span1.innerHTML = "Bạn có rớt hết cũng đạt";
          } else {
            var f = stcConLai - d;
            span1.innerHTML = d + " tín chỉ D và ";
            span2.innerHTML = "rớt " + f + " tín chỉ";
          }
        } else {
          var d = stcConLai - c;
          span1.innerHTML = c + " tín chỉ C và ";
          span2.innerHTML = d + " tín chỉ D";
        }
      } else {
        var c = stcConLai - b;
        span1.innerHTML = b + " tín chỉ B và ";
        span2.innerHTML = c + " tín chỉ C";
      }
    } else {
      var b = stcConLai - a;
      if (b >= 0) {
        span1.innerHTML = a + " tín chỉ A và ";
        span2.innerHTML = b + " tín chỉ B";
      } else {
        var rs = (stcTichLuy * gpaTichLuy + stcConLai * 4) / stcYeuCau;
        // console.log(stcTichLuy);
        // console.log(gpaTichLuy);
        // console.log(stcConLai);

        ketQua.innerHTML =
          "Kịch bản ấy đẹp, tiếc là nó không xảy ra.</br> Bạn có được A hết " +
          stcConLai +
          " tín chỉ còn lại thì cũng chỉ đạt " +
          rs;
        return;
      }
    }

    ketQua.appendChild(span1);
    ketQua.appendChild(span2);
  } else {
    ketQua.innerHTML = "Chưa điền đầy đủ thông tin";
  }
}
