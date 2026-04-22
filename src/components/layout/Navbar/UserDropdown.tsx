import { useRef } from "react";
import { useAuth } from "../../../context/AuthContext";
import profileImageUrl from "../../../assets/profile.svg";
import Logout from "../../partials/Logout";
import { Link } from "react-router";

const UserDropdown = () => {
  const { userLoggedIn } = useAuth();

  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();
  return (
    <>
      {userLoggedIn && (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-neutral btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="user_profile" src={profileImageUrl} />
            </div>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-md dropdown-content bg-base-200 rounded-box mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <span onClick={openModal} className="text-error">Sign Out</span>
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
    </>
  );
};

export default UserDropdown;
