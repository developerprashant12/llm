import React from 'react'
import "../../App.css";

function ChatComponent({
  isChatVisible,
  toggleChat,
  closeChat,
  messageList,
  inputValue,
  setInputValue,
  handleSubmit,
}) {
  return (
    <div className="botIcon" style={{display: "none"}}>
      {/* Chat */}
      <div className="botIconContainer" onClick={toggleChat}>
        {isChatVisible === false ? (
          <div className="iconInner">
            <i className="fa fa-commenting" aria-hidden="true"></i>
          </div>
        ) : (
          ""
        )}
      </div>
      {/* Chat */}
      {/* Chat Message */}
      {isChatVisible === true ? (
        <div className="Layout-open">
          <div className="Messenger_messenger">
            <div className="Messenger_header">
              <h4 className="Messenger_prompt">Virtual assistant</h4>{" "}
              <span className="chat_close_icon" onClick={closeChat}>
                <i className="fa fa-window-close" aria-hidden="true"></i>
              </span>
            </div>
            <div className="Messenger_content">
              <div className="defltBox">
                <p>
                  Welcome! 👋 Ask me about <b>LLMs</b> Assistant or select an
                  option below to get started.
                </p>
                <ul>
                  <li>
                    <span>
                      <input
                        style={{
                          marginTop: "5px",
                          position: "relative",
                          top: "2px",
                        }}
                        type="checkbox"
                      />{" "}
                      Brand Representation
                    </span>{" "}
                    <svg
                      id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0f62fe"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      data-di-res-id="26678fd6-58246de"
                      data-di-rand="1697448215957"
                    >
                      <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                      <title></title>
                    </svg>
                  </li>
                  <li>
                    <span>
                      <input
                        style={{
                          marginTop: "5px",
                          position: "relative",
                          top: "2px",
                        }}
                        type="checkbox"
                      />{" "}
                      Brand Favorability
                    </span>{" "}
                    <svg
                      id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0f62fe"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      data-di-res-id="26678fd6-58246de"
                      data-di-rand="1697448215957"
                    >
                      <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                      <title></title>
                    </svg>
                  </li>
                  <li>
                    <span>
                      <input
                        style={{
                          marginTop: "5px",
                          position: "relative",
                          top: "2px",
                        }}
                        type="checkbox"
                      />{" "}
                      Brand Reach
                    </span>{" "}
                    <svg
                      id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0f62fe"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      data-di-res-id="26678fd6-58246de"
                      data-di-rand="1697448215957"
                    >
                      <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                      <title></title>
                    </svg>
                  </li>
                  <li>
                    <span>
                      <input
                        style={{
                          marginTop: "5px",
                          position: "relative",
                          top: "2px",
                        }}
                        type="checkbox"
                      />{" "}
                      Competition
                    </span>{" "}
                    <svg
                      id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0f62fe"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      data-di-res-id="26678fd6-58246de"
                      data-di-rand="1697448215957"
                    >
                      <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                      <title></title>
                    </svg>
                  </li>
                  <li>
                    <span>
                      <input
                        style={{
                          marginTop: "5px",
                          position: "relative",
                          top: "2px",
                        }}
                        type="checkbox"
                      />{" "}
                      Hallucination ID
                    </span>{" "}
                    <svg
                      id="ucx-e4ee9485-a9e1-4019-ac40-61cc046a1ca5"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#0f62fe"
                      width="36"
                      height="36"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                      data-di-res-id="26678fd6-58246de"
                      data-di-rand="1697448215957"
                    >
                      <polygon points="18 6 16.57 7.393 24.15 15 4 15 4 17 24.15 17 16.57 24.573 18 26 28 16 18 6"></polygon>
                      <title></title>
                    </svg>
                  </li>
                </ul>
              </div>
              <div className="Messages">
                <div className="Messages_list">{messageList}</div>
              </div>
              <form id="messenger" onSubmit={handleSubmit}>
                <div className="Input Input-blank">
                  <input
                    name="msg"
                    className="Input_field"
                    placeholder="What Would You Like to Focus On?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="Input_button Input_button-send"
                  >
                    <div className="Icon">
                      <svg
                        viewBox="1496 193 57 54"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <g
                          id="Group-9-Copy-3"
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                          transform="translate(1523.000000, 220.000000) rotate(-270.000000) translate(-1523.000000, -220.000000) translate(1499.000000, 193.000000)"
                        >
                          <path
                            d="M5.42994667,44.5306122 L16.5955554,44.5306122 L21.049938,20.423658 C21.6518463,17.1661523 26.3121212,17.1441362 26.9447801,20.3958097 L31.6405465,44.5306122 L42.5313185,44.5306122 L23.9806326,7.0871633 L5.42994667,44.5306122 Z M22.0420732,48.0757124 C21.779222,49.4982538 20.5386331,50.5306122 19.0920112,50.5306122 L1.59009899,50.5306122 C-1.20169244,50.5306122 -2.87079654,47.7697069 -1.64625638,45.2980459 L20.8461928,-0.101616237 C22.1967178,-2.8275701 25.7710778,-2.81438868 27.1150723,-0.101616237 L49.6075215,45.2980459 C5.08414042,47.7885641 49.1422456,50.5306122 46.3613062,50.5306122 L29.1679835,50.5306122 C27.7320366,50.5306122 26.4974445,49.5130766 26.2232033,48.1035608 L24.0760553,37.0678766 L22.0420732,48.0757124 Z"
                            id="sendicon"
                            fill="#96AAB4"
                            fillRule="nonzero"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* Chat Message */}
    </div>
  );
}

export default ChatComponent