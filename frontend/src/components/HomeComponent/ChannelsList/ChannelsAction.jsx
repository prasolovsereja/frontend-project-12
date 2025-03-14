import { useState, useId, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChannelButton from "./ChannelButton.jsx";
import { openModal } from "../../../slices/modalSlice.js";

const ChannelsAction = ({ channel }) => {
  const dropdownId = useId();
  const dropdownRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectedChannel = useSelector(
    (state) => state.channels.selectedChannel
  );
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div
      ref={dropdownRef}
      role="group"
      className={`d-flex dropdown btn-group ${isMenuOpen ? "show" : ""}`}
      style={{ position: "relative" }}
    >
      <ChannelButton channel={channel} />
      <button
        type="button"
        id={dropdownId}
        aria-expanded={isMenuOpen}
        className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${
          selectedChannel && selectedChannel.id === channel.id
            ? "btn-secondary"
            : ""
        }
        ${isMenuOpen ? "show" : ""}`}
        onClick={toggleMenu}
      >
        <span className="visually-hidden">Упарвление каналом ::after</span>
      </button>
      {isMenuOpen && (
        <div
          x-placement="bottom-start"
          aria-labelledby={dropdownId}
          className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}
          data-popper-reference-hidden="false"
          data-popper-placement="bottom-end"
          data-popper-escaped="false"
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            transform: "translate3d(-8px, 40px, 0px)",
          }}
        >
          <a
            data-rr-ui-dropdown-item
            className="dropdown-item"
            role="button"
            href="#"
            onClick={() => {
              dispatch(openModal({ type: "remove", channel }));
            }}
          >
            Удалить
          </a>
          <a
            data-rr-ui-dropdown-item
            className="dropdown-item"
            role="button"
            href="#"
            onClick={() => dispatch(openModal({ type: "rename", channel }))}
          >
            Переименовать
          </a>
        </div>
      )}
    </div>
  );
};

export default ChannelsAction;
