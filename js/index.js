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

function appStart() {
  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown); //이벤트 제거
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
      if (inputLetter === answerLetter) {
        //정답글자와 입력한 글자가 같으면 초록색
        block.style.background = "#6AAA64";
        맞은개수 += 1;
      } else if (answer.includes(inputLetter))
        block.style.background = "#C9B458";
      //정답 안에 입력한 글자가 포함되어 있으면 노란색
      else block.style.background = "#787C7e";
      block.style.color = "white";
    }

    if (맞은개수 === 5) gameover(); //게임종료
    else nextLine(); //다음줄로 넘기기
  };
  const handlekeydown = (event) => {
    const key = event.key.toUpperCase(); //대문자로
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    //마지막칸 입력 후에는 엔터키만 눌리고 정답확인
    if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    }
    //알파벳만 입력 되도록 하기
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  window.addEventListener("keydown", handlekeydown);
}

appStart();
