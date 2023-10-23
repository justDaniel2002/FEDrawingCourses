import { useRecoilState } from "recoil";
import { accountState } from "../../atom/accountState";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [account, setAccount] = useRecoilState(accountState);
  return (
    <main>
      <div className="flex mt-10 pb-10">
        <div className="w-3/12 py-10 border-2 border-grey500 rounded-xl">
          <div className="text-center mb-5 px-10">
            <img
              className="w-2/3 m-auto mb-3"
              src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
            />
            <div className="text-lg font-medium">{account?.sub}</div>
            <div>{account?.iss}</div>
          </div>
          <div className="py-3 px-10 bg-lightgrey text-white hover:bg-lightgrey hover:text-white">
            Account Info
          </div>
          <Link to={"/"} className="block py-3 px-10 hover:bg-lightgrey hover:text-white">
            Back
          </Link>
        </div>
        <div className="w-9/12 p-10 flex">
          <div className="1/3">
            <img
              className="rounded-full mb-5 w-2/3"
              src="https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj"
            />
            <div className="text-lg font-medium mb-3">Change profile image</div>
            <input
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
          </div>
          <div className="2/3 px-5">
          <div className="text-lg font-medium mb-3">Change profile info</div>
            <label className="text-sm">Email</label>

            <input
              className="block mb-3 p-2 border-2 rounded-xl border-grey500"
              placeholder="Email"
              value={account?.iss}
            />

            <label className="text-sm">Name</label>
            <input
              className="block mb-3 p-2 border-2 rounded-xl border-grey500"
              placeholder="Name"
              value={account?.sub}
            />
            <div>
              <button className="mt-10 p-2 px-5 bg-emailbg text-white">
                Save
              </button>
            </div>
            <hr className="my-10" />
            <div className="text-lg font-medium mb-3">Change account password</div>
            <label className="text-sm">Current Password</label>
            <input
              className="block mb-3 p-2 border-2 rounded-xl border-grey500"
              placeholder="•••••••••••"
            />
            <label className="text-sm">New Password</label>
            <input
              className="block mb-3 p-2 border-2 rounded-xl border-grey500"
              placeholder="•••••••••••"
            />
            <div>
              <button className="mt-10 p-2 px-5 bg-emailbg text-white">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
