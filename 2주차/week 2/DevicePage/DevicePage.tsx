import { MouseEventHandler, useCallback, useEffect, useState } from "react";
import "./DevicePage.css";
import { axiosInstance } from "../../api";
import Device, { DeviceProps } from "./Device";

const statusMap:Record<string, string> = {
  all: "전체",
  run: "켜짐",
  stop: "꺼짐",
};

const DevicePage = () => {
  const [devices, setDevices] = useState<DeviceProps[]>([]);

  const fetchAndSet = useCallback(async () => {
    const res = await axiosInstance.get("/device_status");
    setDevices(res.data);
  }, []);

  useEffect(() => {
    fetchAndSet();
    const intervalId = setInterval(fetchAndSet, 5000);
    return () => clearInterval(intervalId);
  }, [fetchAndSet]);

  const [statusFilter, setStatusFilter] = useState<'all' | 'run' | 'stop'>("all");

  const handleRadioClick: MouseEventHandler<HTMLInputElement> = (e) => {
    setStatusFilter(e.currentTarget.value as 'all' | 'run' | 'stop');
  };

  const onDelete = async (id:string) => {
    await axiosInstance.post(`[로컬호스트 주소]/delete_device/${id}`);
    await fetchAndSet();
  };

  return (
    <div className="device-status-body">
      <header className="header">
        <h1 className="header-title">스마트 안전모</h1>
        <div className="user-info">
          <div className="account">
            <div>관리자ID님</div>
          </div>
          <a href="/" className="logout">
            <button className="logout-button"></button>
          </a>
        </div>
      </header>

      <div className="device-manage">
        <h1 className="page-title">기기 상태 관리</h1>
        <div className="search-wrap">
          <div className="search-options">
            {["all", "run", "stop"].map((value) => (
              <div className="input-box">
                <input type="radio" id={value} name="active_option" value={value} checked={statusFilter === value} onClick={handleRadioClick} />
                <label htmlFor={value}>{statusMap[value]}</label>
              </div>
            ))}
          </div>
          <div className="current_device">{/* <span>켜진 기기 / 전체 기기 <p> {{devices | selectattr('전원상태', 'equalto', true) | list | length}} / {{devices | length}} </p></span> */}</div>
        </div>
      </div>

      <div className="device-status-container">
        <div className="table-style">
          <table className="device-status-table">
            <thead>
              <tr>
                <th className="table-header">디바이스명</th>
                <th className="table-header">전원상태</th>
                <th className="table-header">착용상태</th>
                <th className="table-header">최근 켠 시간</th>
                <th className="table-header">마지막 끈 시간</th>
                <th className="table-header">비상</th>
                <th className="table-header">삭제</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <Device {...device} key={device.id} onDelete={()=>onDelete(device.id)} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
