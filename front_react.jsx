import React from "react";
import Axios from "axios";

const App = () => {
  //
  uploadHandler = e => {
    console.log(e.target.files);
    let fileList = e.target.files;
    const reader = new FileReader();

    if (fileList[0] && fileList[0].type !== "text/csv") {
      alert("Only **.csv file format");
      e.target.value = "";
      return;
    } else if (fileList && fileList[0]) {
      reader.readAsDataURL(fileList[0]);
      reader.onload = e => {
        const fd = {
          data: e.target.result,
          name: fileList[0].name,
          type: fileList[0].type
        };

        Axios.post(
          "http://localhost:4444/api/users/upload-csv",
          fd
          // e.target.result
        ).then(res => {
          console.log(res.data);
          return res.data;
        });
      };
    }
  };

  getAll = () => {
    let config = {
      method: "GET",
      url: "http://localhost:4444/api/users/all"
    };
    Axios(config).then(res => {
      console.log(res.data);
      return res;
    });
  };
  download = () => {
    window.open("http://localhost:4444/api/users/download-users-json");
  };

  return (
    <div>
      <input type="file" onChange={this.uploadHandler} />
      <button type="button" onClick={this.getAll}>
        GetAll
      </button>
      <button type="button" onClick={this.download}>
        Download
      </button>
    </div>
  );
};

export default App;
