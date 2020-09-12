import React, {useCallback, useState} from 'react';
import ReactInterval from 'react-interval';

import './App.css';

const TYPE = {
  Message: 0,
  Select: 1,
  Result: 2,
  Share: 3,
  Writing: 4,
}
const okMessage = {
  type: TYPE.Message,
  value: "⭕　正解！！"
};
const ngMessage = {
  type: TYPE.Message,
  value: "❌　はずれ！！"
};
const firstQuiz = {
  type: TYPE.Message,
  value: "2に関するクイズをどんどん出していくから"
};
const quiz = [
  {
    type: TYPE.Message,
    value: "ボタンを押して答えてね。"
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "初夢についてのことわざ。一は富士、二(1)、三茄子。(1)に入るのはなに？",
  },
  {
    type: TYPE.Select,
    response: "一富士二鷹三茄子。江戸時代のころには流布していたとされています。四以降は何種類か存在していますが、四扇、五煙草、六座頭と続くものが有名です。",
    value: [
      {
        text: "鷹",
        answer: true,
      },
      {
        text: "鴨"
      },
      {
        text: "雁"
      },
      {
        text: "隼"
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "二次元バーコードの一種、QRコード。QRって何の略？",
  },
  {
    type: TYPE.Select,
    response: "QRは、Quick Responseの略で、「高速読み取り」を意図しています。日本のデンソーが開発し、現在はQRコード決済など世界中で広く使われています。",
    value: [
      {
        text: "Quarantine Reservation",
      },
      {
        text: "Quick Response",
        answer: true,
      },
      {
        text: "Qualify Ray"
      },
      {
        text: "Quattro Rettangolo"
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "セカンドハンドって何のこと？",
  },
  {
    type: TYPE.Select,
    response: "中古品のことです。略して「セコハン」とも呼ばれます。",
    value: [
      {
        text: "ブレーキ",
      },
      {
        text: "中古品",
        answer: true,
      },
      {
        text: "利き手じゃない方の手"
      },
      {
        text: "対抗者"
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "現在の国連加盟国のうち、一番領土が広いのはロシアですが、二番目に広いのはどこでしょう？",
  },
  {
    type: TYPE.Select,
    response: "ロシア、カナダ、アメリカ、中国、ブラジルと続きます。",
    value: [
      {
        text: "アメリカ",
      },
      {
        text: "中国",
      },
      {
        text: "オーストラリア"
      },
      {
        text: "カナダ",
        answer: true,
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "野球のポジションを守備番号で表したとき、「2」になるポジションはどれ？",
  },
  {
    type: TYPE.Select,
    response: "キャッチャーです。1のピッチャーを起点として、捕手、内野、外野の順に9のライトまで数字が振られます。",
    value: [
      {
        text: "サード",
      },
      {
        text: "セカンド",
      },
      {
        text: "ファースト"
      },
      {
        text: "キャッチャー",
        answer: true,
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "ずばり、太陽系の第二惑星は？",
  },
  {
    type: TYPE.Select,
    response: "太陽から近い順に水星、金星、地球と並んでいます。金星には自転速度を超えるような強風が吹いており、スーパーローテーションと呼ばれています。",
    value: [
      {
        text: "金星",
        answer: true,
      },
      {
        text: "地球",
      },
      {
        text: "水星"
      },
      {
        text: "火星",
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "イギリス英語で「2nd floor」と言ったら、日本では一般的に何階のことを指す？",
  },
  {
    type: TYPE.Select,
    response: "イギリスでは日本の一階を「ground floor」と呼び、その上の階層から「1st」「2nd」と増えていきます。",
    value: [
      {
        text: "地下一階",
      },
      {
        text: "一階",
      },
      {
        text: "二階",
      },
      {
        text: "三階",
        answer: true,
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "中国史上で、一番最初に皇帝に即位したのは始皇帝ですが、二番目に即位したのは誰？",
  },
  {
    type: TYPE.Select,
    response: "秦の二代目皇帝、胡亥が該当します。兄の扶蘇を謀略で殺害して即位しました。",
    value: [
      {
        text: "子嬰",
      },
      {
        text: "胡亥",
        answer: true,
      },
      {
        text: "扶蘇",
      },
      {
        text: "陳勝",
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "ツーブロックってどんな髪型？",
  },
  {
    type: TYPE.Select,
    response: "トップとサイドで髪の長さを変えて、意識的に段差をつくるような髪型です。日本では1980年代と2010年代に流行しました。",
    value: [
      {
        text: "髪の束を棘のように立てる髪型",
      },
      {
        text: "髪の長さに差をつけて段差ができるような髪型",
        answer: true,
      },
      {
        text: "頭頂部以外を刈り上げて、残った髪を結う髪型",
      },
      {
        text: "前髪を額に垂らすようにカットした髪型",
      }
    ]
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "東海道五十三次において日本橋を起点としたとき、一番目は品川宿ですが、二番目は？",
  },
  {
    type: TYPE.Select,
    response: "川崎宿です。東海道ではなく、甲州街道に向かうと高井戸宿を通ります。",
    value: [
      {
        text: "川崎宿",
        answer: true,
      },
      {
        text: "高井戸宿",
      },
      {
        text: "新宿",
      },
      {
        text: "神奈川宿",
      }
    ]
  },
  {
    type: TYPE.Message,
    value: "おつかれさま。",
  },
  {
    type: TYPE.Message,
    value: "あなたの成績は……",
  },
  {
    type: TYPE.Writing,
  },
  {
    type: TYPE.Result,
  },
  {
    type: TYPE.Share,
  },
];

const ResultRender = ({okCount, ngCount}) => {
  return (
      <React.Fragment>
        <React.Fragment>
          <div className="line__left">
            <div className="line__left-text">
              <div className="text">⭕:{okCount}, ❌:{ngCount}</div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
  )
};

const ShareRender = ({okCount, ngCount}) => {
  const shareUrl = "http://twitter.com/share?url=https://friendly-lamport-2b360e.netlify.app&text=2についてのクイズに" + okCount +
      "問正解しました！%20%23web1week%20&via=tRiaeZ1&related=tRiaez1&hashtags=#web1week";

  return (
      <React.Fragment>
        <React.Fragment>
          <div className="line__left">
            <div className="line__left-text">
              <div className="text">
                <a href={shareUrl} target="_blank">
                  結果をTwitterでシェアできます。</a></div>
            </div>
          </div>
        </React.Fragment>
      </React.Fragment>
  )
};
const MessageRender = ({object}) => {
  return (
      <React.Fragment>
        <div className="line__left">
          <div className="line__left-text">
            <div className="text">{object.value}</div>
          </div>
        </div>
      </React.Fragment>
  )
};
const WritingRender = () => {
  return (
      <React.Fragment>
        <div className="line__left">
          <div className="line__left-text">
            <div className="text">...</div>
          </div>
        </div>
      </React.Fragment>
  );
};
const SelectRender = ({object, onOK, onNG}) => {
  const [state, setState] = useState({
    selected: false,
    selectedText: ""
  });
  const onDivClicked = useCallback((value) => {
    setState({
      ...state,
      selected: true,
      selectedText: value.text
    });
    if (value.answer) {
      onOK(object.response);
    } else {
      onNG(object.response);
    }
  }, [object.response, onNG, onOK, state]);
  return (
      <React.Fragment>
        <div className="line__right">
            {state.selected && (
                <div className="text">
                  {state.selectedText}
                </div>
            )}
            {!state.selected && (
                <div className="text">
                  {object.value.map((v, i) => {
                    return (<div key={i} className="select" onClick={() => onDivClicked(v)}>{v.text}</div>)
                  })}
                </div>
            )}
        </div>
      </React.Fragment>
  );
};


function App() {
  const [state, setState] = useState({
    index: 1,
    wait: false,
    okCount: 0,
    ngCount: 0,
    currentText: [firstQuiz],
    prevElement: null,
    end: false
  });
  const onOK = useCallback((response) => {
    quiz.unshift({
      type: TYPE.Message,
      value: response,
    });
    quiz.unshift(okMessage);
    setState({
      ...state,
      okCount: (state.okCount+1),
      wait: false,
    });
  }, [state]);


  const onNG = useCallback((response) => {
    quiz.unshift({
      type: TYPE.Message,
      value: response,
    });
    quiz.unshift(ngMessage);
    setState({
      ...state,
      ngCount: (state.ngCount+1),
      wait: false,
    });
  }, [state]);

  const ref = React.createRef();
  const scrollToBottomOfList = React.useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [ ref ])

  const timer = useCallback(() => {
    if (state.wait || state.end) {
      return;
    }
    if (quiz.length === 0) {
      setState({
        ...state,
        end: true
      });
      return;
    }
    const newElement = quiz.shift();
    const newText = state.currentText;
    if (state.prevElement && state.prevElement.type === TYPE.Writing) {
      newText.pop();
    }
    newText.push(newElement);

    const newIndex = state.index + 1;
    setState({
      ...state,
      index: newIndex,
      currentText: newText,
      prevElement: newElement,
      wait: (newElement.type === TYPE.Select)
    });
    scrollToBottomOfList();
  }, [scrollToBottomOfList, state]);

  React.useEffect(()=>{
    scrollToBottomOfList();
  }, [scrollToBottomOfList]);

  return (
      <div className="line__container">
        <div className="line__title">
          Qui2
        </div>
        <div className="line__container scroll">
          {state.currentText.map((v, idx) => {
            if (v.type === TYPE.Message) {
              return (<MessageRender key={idx} object={v}/>);
            } else if(v.type === TYPE.Select) {
              return (<SelectRender key={idx} object={v} onOK={onOK} onNG={onNG}/>);
            } else if(v.type === TYPE.Result){
              return (<ResultRender okCount={state.okCount} ngCount={state.ngCount}/>);
            } else if(v.type === TYPE.Share){
              return (<ShareRender okCount={state.okCount} ngCount={state.ngCount}/>);
            } else if (v.type === TYPE.Writing) {
              return (<WritingRender key={idx}/>);
            } else {
              return (<React.Fragment></React.Fragment>);
            }
          })}
          <div style={{ float:"left", clear: "both" }}
               ref={ref}>
          </div>
        </div>
        <ReactInterval timeout={1100} enabled={(!state.wait) && (!state.end)}
                       callback={timer} />
      </div>
  );
}

export default App;
