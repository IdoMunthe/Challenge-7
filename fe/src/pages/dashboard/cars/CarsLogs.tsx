import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { ICars } from "@/interfaces/ICars";
import { formatRupiah } from "@/lib/utils";
import { useFetchCarsLogs } from "@/features/cars/useFetchCarsLogs";
import LayoutDashboard from "@/components/dashboard/Layout";
import SidebarSubMenu from "@/components/dashboard/SidebarSubMenu";
import Spinner from "react-bootstrap/Spinner";

export default function CarsLogs(): ReactElement {
  const { data: dataCarsLogs, isLoading: isLoadingCarsLogs } = useFetchCarsLogs();
  const dataCars: ICars[] = dataCarsLogs

  const renderCars = () => {          
    return dataCars?.map((row, key) => {
      return (
        <div className="col-4" key={key}>
          <div className="card filter-car-content">
            <img
              src={row.image}
              className="card-img-top car-img"
              alt={row.manufacture}
            />
            <div className="card-body">
              <h6 className="card-text">
                {row.manufacture} / {row.type}
              </h6>
              <h5 className="card-title">Rp. {formatRupiah(row.rentPerDay)} / hari</h5>
              <p className="card-text">{row.description}</p>
              <p className="card-text">
                <span className="fa-solid fa-users"></span> {row.capacity} Orang
              </p>
              <p className="card-text">
                <span className="fa-solid fa-gear"></span> {row.transmission}
              </p>
              <p className="card-text">
                <span className="fa-regular fa-calendar"></span> Tahun{" "}
                {row.year}
              </p>

              <div className="button d-flex align-items-end gap-2">
                <Link
                  to={`/dashboard/cars/logs/detail/${row.id}`}
                  className="btn filter-car-btn btn-info text-white"
                >
                  <span className="fa-solid fa-circle-info"></span>&nbsp;Detail Log
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <>
      <LayoutDashboard menu="cars">
        {/*SIDEBAR SUB MENU*/}
        <div className="col-2 bg--white g-0 vh-100">
          <ul className="list-group justify-content-center mt-1 gap-2">
            <li className="list-group-item list-sub-menu">
              <a href="#" className="nav-link">
                CARS
              </a>
            </li>
            <SidebarSubMenu
              subMenu="Data Cars"
              isActive="false"
              url="/dashboard/cars"
            />
            <SidebarSubMenu
              subMenu="Data Logs Cars"
              isActive="true"
              url="/dashboard/cars/logs"
            />
          </ul>
        </div>
        {/*CONTENT*/}
        <div className="col-10 bg--dashboard-white">
          <div className="row">
            <div className="col-12 bg--dashboard-white">
              <div className="container-fluid">
                <div className="row mt-3">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb fw-bold">
                      <li className="breadcrumb-item">Cars</li>
                      <li
                        className="breadcrumb-item fw-normal active"
                        aria-current="page"
                      >
                        Data Logs Cars
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="row mt-2">
                  <div className="col-6">
                    <h4>Data Logs Cars</h4>
                  </div>
                </div>
                <div className="row mt-5">
                  {renderCars()}
                  {isLoadingCarsLogs ? (
                    <div className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
}
