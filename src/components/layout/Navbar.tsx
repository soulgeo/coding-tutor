import { useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import Logout from "../partials/Logout";
import profileImageUrl from "../../assets/profile.svg"

const Navbar = () => {
  const { userLoggedIn } = useAuth();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  return (
    <div className="flex flex-row items-center justify-between fixed top-0 w-full shadow-md min-h-15 bg-base-100 px-2">
      <div
        id="left-navbar-items"
        className="flex flex-row items-center justify-start"
      ></div>
      <div id="right-navbar-items" className="flex flex-row justify-end">
        {userLoggedIn && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-neutral btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user_profile"
                  src={profileImageUrl}
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/p/{{ user.username }}">Profile</a>
              </li>
              <li>
                <a href="{% url 'account_email' %}">Account</a>
              </li>
              <li>
                <span onClick={openModal}>Sign Out</span>
              </li>
              <dialog
                ref={dialogRef}
                className="m-auto bg-transparent border-none w-sm p-3"
              >
                <button
                  onClick={closeModal}
                  className="btn btn-ghost btn-circle absolute top-6 right-6"
                >
                  ✕
                </button>
                <Logout />
              </dialog>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
