import React, {useCallback, useState} from 'react';
import ReactInterval from 'react-interval';

import './App.css';

const TYPE = {
  Message: 0,
  Select: 1,
  Result: 2,
  Share: 3,
}
const okMessage = {
  type: TYPE.Message,
  value: "⭕　正解！！"
};
const ngMessage = {
  type: TYPE.Message,
  value: "❌　はずれ！！"
};
const quiz = [
  {
    type: TYPE.Message,
    value: "2に関するクイズをどんどん出していくから"
  },{
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
    response: "一富士二鷹三茄子。江戸時代のころには流布されていたとされています。四以降は何種類か存在されていますが、四扇、五煙草、六座頭と続くものが有名です。",
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "二次元バーコードの一種、QRコード。QRって何の略？",
  },
  {
    type: TYPE.Select,
    response: "QRは、Quick Responseの略で、「高速読み取り」を意図した単語です。日本のデンソーが開発し、現在はQRコード決済など世界中で広く使われています。",
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
        text: "Quiz Reference"
      }
    ]
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "世界で一番領土が広いのはロシアですが、二番目に広いのはどこでしょう？",
  },
  {
    type: TYPE.Select,
    response: "カナダ、アメリカ、中国、ブラジルと続きます。",
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "野球のポジションを守備番号で表したとき、「2」になるポジションはどれ？",
  },
  {
    type: TYPE.Select,
    response: "1のピッチャーを起点として、捕手、内野、外野の順に9のライトまで数字が振られます。",
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "太陽系の第二惑星は次のうちどれ？",
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "イギリス英語で「2nd floor」と言うとき、日本では一般的に何階のこと？",
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "中国の歴史で、一番最初に皇帝に即位したのは始皇帝ですが、二番目に即位した皇帝は誰？",
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "ツーブロックってどういう髪型？",
  },
  {
    type: TYPE.Select,
    response: "髪の長さに差をつけて段差ができるような髪型です。日本では1980年代と2010年代に流行しました。",
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
    type: TYPE.Message,
    value: "問題"
  },
  {
    type: TYPE.Message,
    value: "東海道五十三次、日本橋を起点として、一番目は品川宿ですが二番目は？",
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
  const shareUrl = "http://twitter.com/share?url=https://friendly-lamport-2b360e.netlify.app&text=2についてのクイズに" + okCount + " / " + (okCount + ngCount) +
      "問正解しました！&via=tRiaeZ1&related=tRiaez1&hashtags=#web1week";

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
  }, [onNG, onOK, state]);
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
  )
};


function App() {
  const [state, setState] = useState({
    index: 1,
    wait: false,
    okCount: 0,
    ngCount: 0,
    currentText: [quiz[0]],
    end: false
  });
  const onOK = useCallback((response) => {
    const newText = state.currentText;
    newText.push(okMessage);
    newText.push({
      type: TYPE.Message,
      value: response,
    });
    setState({
      ...state,
      currentText: newText,
      okCount: (state.okCount+1),
      wait: false,
    });
  }, [state]);


  const onNG = useCallback((response) => {
    const newText = state.currentText;
    newText.push(ngMessage);
    newText.push({
      type: TYPE.Message,
      value: response,
    });
    setState({
      ...state,
      currentText: newText,
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
    if (state.index >= quiz.length) {
      setState({
        ...state,
        end: true
      });
      return;
    }
    const newElement = quiz[state.index];

    const newText = state.currentText;
    if (newElement.type === TYPE.Message) {
      newText.push(newElement);
    } else {
      newText.push(newElement);
    }

    const newIndex = state.index + 1;
    setState({
      ...state,
      index: newIndex,
      currentText: newText,
      wait: (newElement.type === TYPE.Select)
    });
    scrollToBottomOfList();
  }, [scrollToBottomOfList, state]);

  React.useEffect(()=>{
    scrollToBottomOfList();
  }, [scrollToBottomOfList]);

  return (
      <div class="line__container">
        <div class="line__title">
          Qui2
        </div>
        <div class="line__container scroll">
          {state.currentText.map((v, idx) => {
            if (v.type === TYPE.Message) {
              return (<MessageRender key={idx} object={v}/>);
            } else if(v.type === TYPE.Select) {
              return (<SelectRender key={idx} object={v} onOK={onOK} onNG={onNG}/>);
            } else if(v.type === TYPE.Result){
              return (<ResultRender okCount={state.okCount} ngCount={state.ngCount}/>);
            } else if(v.type === TYPE.Share){
              return (<ShareRender okCount={state.okCount} ngCount={state.ngCount}/>);
            }
          })}
          <div style={{ float:"left", clear: "both" }}
               ref={ref}>
          </div>
        </div>
        <ReactInterval timeout={1500} enabled={(!state.wait) && (!state.end)}
                       callback={timer} />
      </div>
  );
}

export default App;
