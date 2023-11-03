import React, { useCallback, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  UncontrolledTooltip,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  InputGroup,
  UncontrolledAlert,
} from "reactstrap";
import { Link } from "react-router-dom";

import { chatData } from "../../common/data";
import Reciever from "./Reciever";
import Sender from "./Sender";
import { handleSearchData } from "Components/Common/SearchFile";

//Import Scrollbar
import SimpleBar from "simplebar-react";

const ChantBox = () => {
  const [searchMenu, setSearchMenu] = useState<boolean>(false);
  const [settingsMenu, setSettingsMenu] = useState<boolean>(false);
  const [otherMenu, setOtherMenu] = useState<boolean>(false);

  const [text, setText] = useState<any>("");
  const [messages, setMessages] = useState([...chatData]);
  const [messageBox, setMessageBox] = useState<any>(null);

  const scrollToBottom = useCallback(() => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  }, [messageBox]);

  useEffect(() => {
    if ((messages || []).length > 1) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);


  const onSendMessage = () => {
    const obj = JSON.parse(localStorage.getItem("authUser") || "");
    const name = obj && obj.username ? obj.username : "Admin";

    var modifiedMessages = [...messages];
    const lastItem = modifiedMessages.length
      ? modifiedMessages[modifiedMessages.length - 1]
      : { id: 1 };
    const today = new Date();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const senderObj = {
      id: lastItem["id"] + 1,
      name: name,
      msg: text,
      time: `${hour}.${minute}`,
      isSender: true,
    };
    modifiedMessages.push({ ...senderObj });
    setMessages(modifiedMessages);
    setText("");
  };

  //delete
  // const [deleteId, setDeleteId] = useState<number>();
  const handleDeleteData = (id: number) => {
    setMessages(
      chatData.filter((data: any) => data.id !== id)
    )
  }

  // search
  const handleChange = (ele: any) => {
    let search = ele.target.value;
    if (search) {
      handleSearchData({ setState: setMessages, data: chatData, item: search })
    } else {
      setMessages(chatData)
    }
  }

  // copy msg
  const [copyMsg, setCopyMsg] = useState<boolean>(false)
  const handleCopyMsg = () => {
    setCopyMsg(true)
    setTimeout(() => setCopyMsg(false), 1000)
  }

  // save msg
  const [saveMsg, setSaveMsg] = useState<boolean>(false)
  const handleSaveMsg = () => {
    setSaveMsg(true)
    setTimeout(() => setSaveMsg(false), 1000)
  }

  return (
    <React.Fragment>
      <Col xl={4}>
        <Card>
          <CardBody className="border-bottom">
            <Row>
              <Col md={4} xs={9}>
                <h5 className="font-size-15 mb-1">Steven Franklin</h5>
                <p className="text-muted mb-0">
                  <i className="mdi mdi-circle text-success align-middle me-1" />
                  Active now
                </p>
              </Col>
              <Col md={8} xs={3}>
                <ul className="list-inline user-chat-nav text-end mb-0">
                  <li className="list-inline-item d-none d-sm-inline-block">
                    <Dropdown
                      isOpen={searchMenu}
                      toggle={() => {
                        setSearchMenu(!searchMenu);
                      }}
                    >
                      <DropdownToggle
                        tag="i"
                        className="btn nav-btn"
                        type="button"
                      >
                        <i className="bx bx-search-alt-2" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end py-0 dropdown-menu-md">
                        <Form className="p-3">
                          <div className="m-0">
                            <InputGroup>
                              <Input
                                type="text"
                                placeholder="Search ..."
                                aria-label="Recipient's username"
                                onChange={handleChange}
                              />
                              <button className="btn btn-primary" type="submit">
                                <i className="mdi mdi-magnify"></i>
                              </button>
                            </InputGroup>
                          </div>
                        </Form>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                  <li className="list-inline-item d-none d-sm-inline-block">
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu);
                      }}
                    >
                      <DropdownToggle
                        tag="i"
                        className="btn nav-btn"
                        type="button"
                      >
                        <i className="bx bx-cog" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem href="#!">View Profile</DropdownItem>
                        <DropdownItem href="#!">Clear chat</DropdownItem>
                        <DropdownItem href="#!">Muted</DropdownItem>
                        <DropdownItem href="#!">Delete</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>

                  <li className="list-inline-item">
                    <Dropdown
                      isOpen={otherMenu}
                      toggle={() => {
                        setOtherMenu(!otherMenu);
                      }}
                    >
                      <DropdownToggle
                        tag="i"
                        className="btn nav-btn"
                        type="button"
                      >
                        <i className="bx bx-dots-horizontal-rounded" />
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#!">Action</DropdownItem>
                        <DropdownItem href="#!">Another Action</DropdownItem>
                        <DropdownItem href="#!">Something else</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </ul>
              </Col>
            </Row>
          </CardBody>
          <CardBody className="pb-0">
            <div>
              <div className="chat-conversation">
                <SimpleBar
                  style={{ marginBottom: "1rem", maxHeight: "260px" }}
                  ref={ref => setMessageBox(ref)}
                >
                  <ul className="list-unstyled">
                    <li>
                      <div className="chat-day-title">
                        <span className="title">Today</span>
                      </div>
                    </li>
                    {(messages || []).map((message: any, index: number) => (
                      <React.Fragment key={index}>
                        {message["isSender"] ? (
                          <Sender message={message} handleDeleteData={handleDeleteData} handleCopy={handleCopyMsg} handleSaveMsg={handleSaveMsg} />
                        ) : (
                          <Reciever message={message} handleDeleteData={handleDeleteData} handleCopy={handleCopyMsg} handleSaveMsg={handleSaveMsg} />
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                </SimpleBar>
                {copyMsg && <UncontrolledAlert color="warning">Message Codied</UncontrolledAlert>}
                {saveMsg && <UncontrolledAlert color="success">Message Saved</UncontrolledAlert>}
              </div>
            </div>
          </CardBody>

          <div className="p-3 chat-input-section">
            <Row>
              <Col>
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control rounded chat-input"
                    placeholder="Enter Message..."
                    value={text}
                    onChange={e => setText(e.target.value)}
                  />
                  <div className="chat-input-links">
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item">
                        <Link to="#">
                          <i
                            className="mdi mdi-emoticon-happy-outline"
                            id="Emojitooltip"
                          />
                          <UncontrolledTooltip
                            placement="top"
                            target="Emojitooltip"
                          >
                            Emojis
                          </UncontrolledTooltip>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="#">
                          <i
                            className="mdi mdi-file-image-outline"
                            id="Imagetooltip"
                          />
                          <UncontrolledTooltip
                            placement="top"
                            target="Imagetooltip"
                          >
                            Images
                          </UncontrolledTooltip>
                        </Link>
                      </li>
                      <li className="list-inline-item">
                        <Link to="#">
                          <i
                            className="mdi mdi-file-document-outline"
                            id="Filetooltip"
                          />
                          <UncontrolledTooltip
                            placement="top"
                            target="Filetooltip"
                          >
                            Add Files
                          </UncontrolledTooltip>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
              <div className="col-auto">
                <Button
                  type="submit"
                  color="primary"
                  className="chat-send w-md "
                  onClick={() => onSendMessage()}
                >
                  <span className="d-none d-sm-inline-block me-2">Send</span>
                  <i className="mdi mdi-send" />
                </Button>
              </div>
            </Row>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default ChantBox;
