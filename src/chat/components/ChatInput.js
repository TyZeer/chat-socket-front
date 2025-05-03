import React, { useState } from "react";
import { Button, Modal } from "antd";

const isImage = (file) => file && file.type && file.type.startsWith("image/");

const ChatInput = ({ text, setText, sendMessage, handleFileChange, file, setFile }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const handlePreviewClick = () => {
    if (isImage(file)) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setShowImageModal(true);
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = file.name || "image.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="message-input">
      <div className="wrap">
        <input
          name="user_input"
          size="large"
          placeholder="Write your message..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage(text);
            }
          }}
        />
        {/* File preview */}
        {file && (
          <div className="file-preview">
            {isImage(file) ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="file-preview-img"
                style={{ cursor: "pointer" }}
                onClick={handlePreviewClick}
              />
            ) : (
              <span className="file-preview-icon">
                <i className="fa fa-paperclip" /> {file.name}
              </span>
            )}
            <button
              className="file-remove-btn"
              onClick={() => setFile(null)}
              type="button"
              aria-label="Remove file"
            >
              ×
            </button>
          </div>
        )}
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginLeft: "10px" }}
          className="file-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="file-label">
          <i className="fa fa-paperclip" aria-hidden="true"></i>
        </label>
        <Button
          icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>}
          onClick={() => sendMessage(text)}
        />
      </div>
      {/* Image modal */}
      <Modal
        open={showImageModal}
        onCancel={() => setShowImageModal(false)}
        footer={null}
        centered
        width={Math.min(window.innerWidth, 600)}
        bodyStyle={{ textAlign: "center", padding: 0, background: "#222" }}
      >
        {imageUrl && (
          <>
            <img
              src={imageUrl}
              alt="full"
              style={{ maxWidth: "100%", maxHeight: "70vh", display: "block", margin: "0 auto" }}
            />
            <Button
              type="primary"
              style={{ margin: "16px auto 16px auto", display: "block" }}
              onClick={handleDownload}
            >
              Скачать
            </Button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ChatInput;