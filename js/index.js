// 요구사항
// 1. 5글자 단어 (존재하는 단어 아니어도 됨)
// 2. 6번의 시도 가능
// 3. 존재하면 노란색, 위치도 맞으면 초록색 표시
// 4. 게임 종료 판단
// (추가) 상단에 게임 시간 표시
// (선택) 키보드에도 동일하게 표시
// (선택) 키보드 입력도 가능하게

const answer = "APPLE";
let index = 0;
let attempts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color:black; color:white; width:200px; height:100px;"; //css 직접 적용, 이렇게 넣으면 오타 나기도 쉽고 추천하는 방법은 아님
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown); //이벤트 제거
    displayGameover();
    clearInterval(timer); //타이머 인터벌 끝내기. timer변수에 저장한 인터벌 아이디 호출
  };

  const nextLine = () => {
    if (attempts === 6) return; //마지막줄까지 입력했으면 그대로 종료
    attempts += 1;
    index = 0;
  };

  const handleEnterkey = () => {
    let 맞은개수 = 0;
    //정답확인
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const inputLetter = block.innerText;
      const answerLetter = answer[i];

      const keyboardBlock = document.querySelector(
        `.keyboard-column[data-key='${inputLetter}']`
      );

      if (inputLetter === answerLetter) {
        //정답글자와 입력한 글자가 같으면 초록색
        block.style.background = "#6AAA64";
        keyboardBlock.style.background = "#6AAA64";
        맞은개수 += 1;
      } else if (answer.includes(inputLetter)) {
        block.style.background = "#C9B458";
        keyboardBlock.style.background = "#C9B458";
      }
      //정답 안에 입력한 글자가 포함되어 있으면 노란색
      else {
        block.style.background = "#787C7e";
        keyboardBlock.style.background = "#787C7e";
      }
      block.style.color = "white";
      keyboardBlock.style.color = "white";
    }

    if (맞은개수 === 5) gameover(); //게임종료
    else nextLine(); //다음줄로 넘기기
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const keyclick = (event) => {
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    const letter = event.target.innerText;
    thisBlock.innerText = letter;
    index += 1;
  };

  const handlekeydown = (event) => {
    const key = event.key.toUpperCase(); //대문자로
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    //백스페이스 눌렀을 땐 지워주기
    if (event.key === "Backspace") handleBackspace();
    //마지막칸 입력 후에는 엔터키만 눌리고 정답확인
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey(thisBlock);
      else return;
    }
    //알파벳만 입력 되도록 하기
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date(); //선언되는 순간 변수에 저장됨
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0"); //padStart 사용하기 위해 문자열로
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");

      timeDiv.innerText = `${분}:${초}`; // 백틱(`) 사용하면 변수를 문자열에 넣을 수 있다
    }
    timer = setInterval(setTime, 1000); //timer변수에 인터벌 아이디 저장
  };

  startTimer();

  window.addEventListener("keydown", handlekeydown);

  // 모든 요소를 선택합니다.
  let btns = document.querySelectorAll(".keyboard-column");

  // 각 요소에 대해 반복하여 클릭 이벤트 리스너를 추가합니다.
  btns.forEach((btn) => {
    btn.addEventListener("click", keyclick);
  });
}

appStart();
