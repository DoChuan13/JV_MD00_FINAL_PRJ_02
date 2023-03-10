import React from "react";
import * as Fa from "react-icons/fa";
import { users } from "../../assets/images/images";

function Client() {
  return (
    <>
      {/* customer section start */}
      <div className="customer_section layout_padding">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <h1 className="customer_taital">Cảm nhận của khách hàng</h1>
            </div>
          </div>
          <div id="main_slider" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="client_section_2">
                  <div className="client_main">
                    <div className="client_left">
                      <div className="client_img">
                        <img
                          src={users["minhthu"]}
                          alt="Client"
                          style={{ borderRadius: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="client_right">
                      <h3 className="name_text">MinhThu</h3>
                      <p className="dolor_text">
                        Các thương hiệu tại shop này có chất lượng rất tốt, mọi
                        người nên ghé qua thử nhé{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="client_section_2">
                  <div className="client_main">
                    <div className="client_left">
                      <div className="client_img">
                        <img
                          src={users["minhthu"]}
                          alt="Client"
                          style={{ borderRadius: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="client_right">
                      <h3 className="name_text">MinhThu</h3>
                      <p className="dolor_text">
                        Các thương hiệu tại shop này có chất lượng rất tốt, mọi
                        người nên ghé qua thử nhé{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="client_section_2">
                  <div className="client_main">
                    <div className="client_left">
                      <div className="client_img">
                        <img
                          src={users["minhthu"]}
                          alt="Client"
                          style={{ borderRadius: "300px" }}
                        />
                      </div>
                    </div>
                    <div className="client_right">
                      <h3 className="name_text">MinhThu</h3>
                      <p className="dolor_text">
                        Các thương hiệu tại shop này có chất lượng rất tốt, mọi
                        người nên ghé qua thử nhé{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#main_slider"
              role="button"
              data-slide="prev"
            >
              <Fa.FaAngleLeft size={30} />
            </a>
            <a
              className="carousel-control-next"
              href="#main_slider"
              role="button"
              data-slide="next"
            >
              <Fa.FaAngleRight size={30} />
            </a>
          </div>
        </div>
      </div>
      {/* customer section end */}
    </>
  );
}

export default Client;
