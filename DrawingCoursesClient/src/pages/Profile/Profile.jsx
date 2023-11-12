import { useRecoilState } from "recoil";
import { accountState } from "../../atom/accountState";
import { Line } from "react-chartjs-2";
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { fileToBase64 } from "../../utils/util";
import { api } from "../../api/api";
import { toast } from "react-toastify";

export const Profile = () => {
  window.scrollTo(0, 0);
  const [account, setAccount] = useRecoilState(accountState);
  const [avatarFile, setAvatarfile] = useState(account.img);
  const navigate = useNavigate();

  const submitAvatar = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await api.postProfileImage(formData, account.sub);
    console.log(result);
    setAccount({...account, img: result.img});
  };

  const submitPassword = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      oldPassword: formData.get("oldPassword"),
      newPassword: formData.get("newPassword"),
    };
    const result = await api.changePassword(data, account.token);
    console.log(result);
    localStorage.clear();
    setAccount(undefined);
    navigate("/auth/login");
  };

  const submitInfo = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    const result = await api.changeAccountInfo(data);
    toast(result, {type: toast.TYPE.INFO})
    setAccount({...account, address: data.address});
  };
  return (
    <main>
      <div className="flex mt-10 pb-10">
        <div className="w-3/12 py-10 border-2 border-grey500 rounded-xl">
          <div className="text-center mb-5 px-10">
            {account.img ? (
              <img className="w-2/3 m-auto mb-3" src={account.img} />
            ) : (
              <img
                className="w-2/3 m-auto mb-3"
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              />
            )}

            <div className="text-lg font-medium">{account?.sub}</div>
            <div>{account?.iss}</div>
          </div>
          <div className="py-3 px-10 bg-lightgrey text-white hover:bg-lightgrey hover:text-white">
            Account Info
          </div>
          <Link
            to={"/"}
            className="block py-3 px-10 hover:bg-lightgrey hover:text-white"
          >
            Back
          </Link>
        </div>
        <div className="w-9/12 p-10 flex">
          <div className="1/3">
            {avatarFile ? (
              <img
                className="rounded-full mb-5 w-2/3 border"
                src={avatarFile}
              />
            ) : (
              <img
                className="rounded-full mb-5 w-2/3 border"
                src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              />
            )}

            <div className="text-lg font-medium mb-3">Change profile image</div>
            <Form onSubmit={submitAvatar}>
              <input
                onChange={async (event) => {
                  setAvatarfile(await fileToBase64(event.target.files[0]));
                }}
                type="file"
                name="image"
                className="p-2 border border-grey500 w-2/3"
                placeholder="No file selected"
              />
              <button className="p-2 bg-buttonBlue text-white font-medium">
                Upload Image
              </button>
              <div>
                <button className="mt-10 p-2 px-5 bg-emailbg text-white">
                  Save
                </button>
              </div>
            </Form>
          </div>
          <div className="2/3 px-5">
            <Form onSubmit={submitInfo}>
              <div className="text-lg font-medium mb-3">
                Change profile info
              </div>

              <label className="text-sm">Name</label>
              <input
                name="username"
                readOnly
                className="block mb-3 p-2 border-2 rounded-xl border-grey500"
                placeholder="Name"
                defaultValue={account?.sub}
              />

              <label className="text-sm">Address</label>
              <input
                name="address"
                className="block mb-3 p-2 border-2 rounded-xl border-grey500"
                placeholder="Address"
                defaultValue={account?.address}
              />

              <div>
                <button className="mt-10 p-2 px-5 bg-emailbg text-white">
                  Save
                </button>
              </div>
            </Form>
            <hr className="my-10" />
            <div className="text-lg font-medium mb-3">
              Change account password
            </div>
            <Form onSubmit={submitPassword}>
              <label className="text-sm">Current Password</label>
              <input
                type="password"
                name="oldPassword"
                className="block mb-3 p-2 border-2 rounded-xl border-grey500"
                placeholder="•••••••••••"
              />
              <label className="text-sm">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="block mb-3 p-2 border-2 rounded-xl border-grey500"
                placeholder="•••••••••••"
              />
              <div>
                <button className="mt-10 p-2 px-5 bg-emailbg text-white">
                  Save
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};
