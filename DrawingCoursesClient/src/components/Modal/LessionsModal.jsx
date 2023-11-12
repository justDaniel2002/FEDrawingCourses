import { Form } from "react-router-dom";
import { api } from "../../api/api";
import { useRecoilValue } from "recoil";
import { accountState } from "../../atom/accountState";
import { useState } from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { totalTimeInSeconds } from "../../utils/util";

export const LessionsModal = ({ LessionsState, courseId, handelClose }) => {
  const account = useRecoilValue(accountState);
  const [Lessions, setLessions] = useState(LessionsState ?? []);

  const removeLession = (ls) => {
    const updateLession = Lessions.filter((lession) => lession !== ls);
    setLessions(updateLession);
  };

  const addLession = () => {
    const updateLession = [...Lessions, { courseId, title: "", url: "" }];
    setLessions(updateLession);
  };

  const editLessionTitle = (index, title) => {
    const updateLessions = Lessions;
    updateLessions[index].title = title;
    setLessions(updateLessions);
  };

  const editLessionUrl = (index, url) => {
    const updateLessions = Lessions;
    updateLessions[index].url = url;
    setLessions(updateLessions);
  };

  const editLessionDocument = (index, document) => {
    const updateLessions = Lessions;
    updateLessions[index].document = document;
    setLessions(updateLessions);
  };

  const editLessionDescription = (index, description) => {
    const updateLessions = Lessions;
    updateLessions[index].description = description;
    setLessions(updateLessions);
  };

  const editLessionTime = (index, estimatedTime) => {
    console.log(estimatedTime)
    const long = totalTimeInSeconds(estimatedTime.$m, estimatedTime.$s);
    console.log(long)
    const updateLessions = Lessions;
    updateLessions[index].estimatedTime = long;
    setLessions(updateLessions);
  };

  const submit = async (event) => {
    event.preventDefault();
    await api.editCourseDetail(
      {
        courseId,
        courseDetails: Lessions,
      },
      account.token
    );

    await handelClose();
  };

  return (
    <>
      <div className="p-5 max-h-screen overflow-y-scroll">
        <Form method="post" onSubmit={submit}>
          {Array.isArray(Lessions)
            ? Lessions.map((lession, index) => (
                <>
                  <label className="text-sm mb-3">Title</label>
                  <input
                    onChange={(event) =>
                      editLessionTitle(index, event.target.value)
                    }
                    defaultValue={lession.title}
                    required
                    className="p-2 rounded-full border w-full mb-5"
                  />
                  <label className="text-sm mb-3">Youtube Video ID</label>
                  <input
                    onChange={(event) =>
                      editLessionUrl(index, event.target.value)
                    }
                    defaultValue={lession.url}
                    required
                    className="p-2 rounded-full border w-full mb-5"
                  />
                  <label className="text-sm mb-3">Description</label>
                  <input
                    onChange={(event) =>
                      editLessionDescription(index, event.target.value)
                    }
                    defaultValue={lession.description}
                    required
                    className="p-2 rounded-full border w-full mb-5"
                  />
                  <label className="text-sm mb-3">Document</label>
                  <input
                    onChange={(event) =>
                      editLessionDocument(index, event.target.value)
                    }
                    defaultValue={lession.document}
                    required
                    className="p-2 rounded-full border w-full mb-5"
                  />
                  <label className="text-sm mb-3">Estimate Time</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      sx={{ marginBottom: 5 }}
                      components={["MobileTimePicker"]}
                    >
                      <DemoItem>
                        <TimePicker
                          onChange={(event) =>
                            editLessionTime(index, event)
                          }
                          views={["minutes", "seconds"]}
                          format="mm:ss"
                          value={new Date(0, 0, 0, 0, Math.floor(lession.estimatedTime / 60), lession.estimatedTime % 60)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                  {/* <input
                    type="time"
                    onChange={(event) =>
                      editLessionDocument(index, event.target.value)
                    }
                    defaultValue={lession.document}
                    required
                    className="p-2 rounded-full border w-full mb-5"
                  /> */}
                  <div className="mb-5">
                    <span
                      onClick={() => removeLession(lession)}
                      className="p-2 text-white bg-buttonBlue"
                    >
                      Remove Lession
                    </span>
                  </div>
                </>
              ))
            : ""}
          <div className="text-right">
            <button className="p-2 text-white bg-buttonBlue">Edit</button>
          </div>
        </Form>
        <button onClick={addLession} className="p-2 text-white bg-buttonBlue">
          Add Lession
        </button>
      </div>
    </>
  );
};
