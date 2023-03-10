import {
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  Image,
  InputNumber,
  Button,
} from "antd";
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsState } from "../../../../services/redux/selectors/selectors";

import * as Ai from "react-icons/ai";
import { productManager } from "./ManagerProductTable";
import * as picture from "../../../../assets/images/images";
import * as valueConfig from "../../../../config/valueConfig";
import UploadProductImage from "./UploadProductImage";
import * as saga from "../../../../services/redux/actions/sagaAction";
import { Success, Error, Warning } from "../../../toast/Toast";

function RightBarProductInfo() {
  let dispatch = useDispatch();
  let prState = useSelector(productsState);
  const [open, setOpen] = useState(false);
  const [viewStatus, setViewStatus] = useState(true);
  const [newStatus, setNewStatus] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  let productContext = useContext(productManager);

  useEffect(() => {
    setOpen(productContext.drawer.show);
    setViewStatus(productContext.drawer.viewSt);
    setNewStatus(productContext.drawer.new);
    //Remove key form object and update state
    let newValue = { ...productContext.drawer.data };
    delete newValue.key;
    setProductInfo(newValue);
  }, [productContext]);

  const resetDrawer = () => {
    productContext.toggleDrawer(false);
  };

  const closeDrawer = () => {
    setOpen(false);
    setTimeout(resetDrawer, 200);
  };

  const checkSatisfyCond = (currentArr, newObj) => {
    let result = true;
    for (let i = 0; i < currentArr.length; i++) {
      if (
        currentArr[i].id !== newObj.id &&
        currentArr[i].productCode === newObj.productCode
      ) {
        return false;
      }
    }
    return result;
  };

  const getImageInfo = () => {
    let picture = document.querySelector(".ant-upload-list-item-image");
    let pictureName = "";
    if (picture != null) {
      pictureName = picture.getAttribute("alt").split(".")[0];
    }
    return pictureName;
  };

  const updateProductInfo = () => {
    let checkId = checkSatisfyCond(prState, productInfo);
    if (!checkId) {
      Warning("M?? s???n ph???m ???? t???n t???i");
      return;
    }
    let pictureName = getImageInfo();
    let productValue = { ...productInfo, productImage: pictureName };
    if (
      productValue.productCode === "" ||
      productValue.productDesc === "" ||
      productValue.productImage === "" ||
      productValue.productName === "" ||
      productValue.productPrice === "" ||
      productValue.productQuantity === "" ||
      productValue.productTitle === "" ||
      productValue.remainQuantity === ""
    ) {
      Error("Vui l??ng ??i???n ?????y ????? c??c th??ng tin");
      return;
    }
    setTimeout(() => {
      delete productValue[""];
      dispatch(saga.update_ProdInfoAct(productValue));
    }, 200);
    closeDrawer();
    console.log("%cUpdate th??nh c??ng", "color: green");
    Success("C???p nh???t s???n ph???m th??nh c??ng");
  };

  const addNewProduct = () => {
    let checkId = checkSatisfyCond(prState, productInfo);
    if (!checkId) {
      Warning("M?? s???n ph???m ???? t???n t???i");
      return;
    }
    let pictureName = getImageInfo();
    let productValue = { ...productInfo, productImage: pictureName };
    console.log(productValue);
    if (
      productValue.productCode === "" ||
      productValue.productDesc === "" ||
      productValue.productImage === "" ||
      productValue.productName === "" ||
      productValue.productPrice === "" ||
      productValue.productQuantity === "" ||
      productValue.productTitle === "" ||
      productValue.remainQuantity === ""
    ) {
      Error("Vui l??ng ??i???n ?????y ????? c??c th??ng tin");
      return;
    }

    setTimeout(() => {
      delete productValue[""];
      dispatch(saga.add_NewProductAct(productValue));
    }, 200);
    closeDrawer();
    console.log("%cTh??m s???n ph???m m???i th??nh c??ng", "color: green");
    Success("Th??m s???n ph???m m???i th??nh c??ng");
  };

  const getDrawerValue = (event) => {
    let name = event.target.id;
    let value = event.target.value;
    setProductInfo({ ...productInfo, [name]: value });

    if (name === "productCode") {
      setProductInfo({ ...productInfo, [name]: value.toUpperCase() });
    }

    if (name === "productPrice") {
      let splitArr = value.split(" ");
      let newValue;
      if (splitArr[1] !== "" && splitArr[1] !== undefined) {
        newValue = parseFloat(splitArr[1].replace(/,/g, ""));
      }
      setProductInfo({ ...productInfo, [name]: newValue });
    }
    if (name === "productQuantity" || name === "remainQuantity") {
      let newValue = parseFloat(value.replace(/,/g, ""));
      setProductInfo({ ...productInfo, [name]: newValue });
    }
  };

  //==========Switch Element Title and Button==========//
  let elementBtnCtrl;
  let elementTitle;
  let elememntImage;
  elementBtnCtrl = viewStatus ? (
    <Space>
      <Ai.AiOutlineClose size={25} onClick={closeDrawer} />
    </Space>
  ) : newStatus ? (
    <Space>
      <Button onClick={closeDrawer}>H???y b???</Button>
      <Button onClick={addNewProduct} type="primary">
        Th??m m???i
      </Button>
    </Space>
  ) : (
    <Space>
      <Button onClick={closeDrawer}>H???y b???</Button>
      <Button onClick={updateProductInfo} type="primary">
        C???p nh???t
      </Button>
    </Space>
  );

  elementTitle = newStatus ? "Th??m s???n ph???m m???i" : "Th??ng tin s???n ph???m";

  elememntImage =
    newStatus || !viewStatus ? (
      <UploadProductImage product={productInfo} />
    ) : (
      <Image width={150} src={picture[productInfo.productImage]} />
    );

  return (
    <>
      <Drawer
        title={elementTitle}
        width={720}
        onClose={() => {
          setOpen(false);
          setTimeout(resetDrawer, 200);
        }}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={elementBtnCtrl}
      >
        {/* Drawer Form Start */}
        <Form
          layout="vertical"
          hideRequiredMark
          disabled={viewStatus}
          initialValues={productInfo}
          onChange={getDrawerValue}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="id" label="ID">
                <Input placeholder="Kh??ng c?? th??ng tin" disabled={true} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="productCode" label="M?? s???n ph???m">
                <Input placeholder="Kh??ng c?? th??ng tin" disabled={viewStatus} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="productName" label="T??n s???n ph???m">
                <Input placeholder="Kh??ng c?? th??ng tin" disabled={viewStatus} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="productTitle" label="Th????ng hi???u">
                <Input placeholder="Kh??ng c?? th??ng tin" disabled={viewStatus} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="productPrice" label="????n gi??">
                <InputNumber
                  min={0}
                  placeholder="Kh??ng c?? th??ng tin"
                  disabled={viewStatus}
                  style={{ width: "100%" }}
                  formatter={(value) => {
                    return `${valueConfig.currencyIcon} ${value}`.replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    );
                  }}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="productQuantity" label="T???ng h??ng">
                <InputNumber
                  min={0}
                  placeholder="Kh??ng c?? th??ng tin"
                  disabled={viewStatus}
                  style={{ width: "100%" }}
                  formatter={(value) => {
                    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="remainQuantity" label="H??ng t???n">
                <InputNumber
                  min={0}
                  placeholder="Kh??ng c?? th??ng tin"
                  disabled={viewStatus}
                  style={{ width: "100%" }}
                  formatter={(value) => {
                    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="productDesc" label="M?? t??? chi ti???t">
                <Input.TextArea
                  showCount
                  maxLength={100}
                  disabled={viewStatus}
                  rows={3}
                  placeholder="Kh??ng c?? th??ng tin"
                  style={{ height: 80, resize: "none" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item name="productImage" label="H??nh ???nh">
              {elememntImage}
            </Form.Item>
          </Row>
        </Form>
        {/* Drawer Form End */}
      </Drawer>
    </>
  );
}

export default RightBarProductInfo;
