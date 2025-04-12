// 표

import { FormEventHandler } from "react";
import "./DevicePage.css";

export interface DeviceProps {
  id: string;
  디바이스명: string;
  전원상태: boolean;
  착용상태: boolean;
  동작시간: string;
  마지막동작시간: string;
  비상: boolean;
  onDelete: ()=>void;
}

const Device = ({ id, 디바이스명, 전원상태, 착용상태, 동작시간, 마지막동작시간, 비상, onDelete }: DeviceProps) => {

  const handleDelete:FormEventHandler<HTMLFormElement> = (e)=>{
    e.preventDefault();
    onDelete();
  }
  
  return (
    <>
      <tr>
        {/* <td className="table-cell">{id}</td> */}
        <td className="table-cell">{디바이스명}</td>
        <td className="table-cell">{전원상태 ? "켜짐" : "꺼짐"}</td>
        <td className="table-cell">{착용상태 ? "착용" : "미착용"}</td>
        <td className="table-cell">{동작시간}</td>
        <td className="table-cell">{마지막동작시간 == "0" ? " " : 마지막동작시간}</td>
        <td className="table-cell">{비상 ? "🚨" : " "}</td>
        <td className="table-cell">
          <form onSubmit={handleDelete} method="POST" className="delete-htmlForm">
            <button type="submit" className="delete-button">
              삭제
            </button>
          </form>
        </td>
      </tr>
    </>
  );
};

export default Device;
