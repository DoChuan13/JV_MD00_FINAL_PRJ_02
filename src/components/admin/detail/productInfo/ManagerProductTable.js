import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, Button, Image } from "antd";

import RightBarProductInfo from "./RightBarProductInfo";
import * as stateConst from "../../../../services/constants/stateConstants";
import { productsState } from "../../../../services/redux/selectors/selectors";
import * as picture from "../../../../assets/images/images";
import * as formatValue from "../../../../utils/valueUtils/formatValue";
import * as valueConfig from "../../../../config/valueConfig";
import * as notifyAction from "../../../../services/redux/actions/notifyActions";
import { useParams } from "react-router-dom";

//import class template
import Product from "../../../../services/class/products/Product";
import CenteredModal from "../../../modal/CenteredModal";
import Toast from "../../../../components/toast/Toast";
// const { Column } = Table;

export const productManager = createContext();
function ManagerProductTable() {
  let params = useParams();
  let prState = useSelector(productsState);
  let dispatch = useDispatch();

  const [productsList, setProductList] = useState([]);
  const [showDrawer, setShowDrawer] = useState({
    data: "",
    show: false,
    viewSt: true,
  });

  const [size] = useState("small");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    let renderValue = prState.map((value) => {
      return { ...value, key: value.id };
    });
    setProductList(renderValue);
  }, [prState, params]);

  const handleAdminAction = (product, action) => {
    let viewSt = true;
    if (
      action === stateConst.VIEW_PROD_ACT_TYPE ||
      action === stateConst.EDIT_PRD_ACT_TYPE
    ) {
      if (action === stateConst.EDIT_PRD_ACT_TYPE) {
        viewSt = false;
      }
      setShowDrawer({ data: product, show: true, viewSt: viewSt, new: false });
    }
    if (action === stateConst.DELETE_PROD_ACT_TYPE) {
      dispatch(notifyAction.deleteProduct(product));
    }

    if (action === stateConst.ADD_PROD_ACT_TYPE) {
      let id;
      if (prState.length === 0) {
        id = 1;
      } else {
        id = prState[prState.length - 1].id + 1;
      }
      let blankData = new Product(id);
      setShowDrawer({ data: blankData, show: true, viewSt: false, new: true });
    }
  };

  const toggleDrawer = (status) => {
    setShowDrawer({ data: "", view: status, viewSt: true });
  };

  const handleChange = (pagination, filters, sorter) => {
    // console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "H??nh ???nh",
      dataIndex: "productImage",
      key: "productImage",
      render: (data) => {
        return <Image width={50} src={picture[data]} />;
      },
    },
    {
      title: "M?? s???n ph???m",
      dataIndex: "productCode",
      key: "productCode",
      filteredValue: filteredInfo.productCode || null,
      onFilter: (value, record) => record.productCode.includes(value),
      sorter: (a, b) => {
        let arrA = a.productCode.split("");
        let arrB = b.productCode.split("");
        // "Gi?? tr??? v??o", a, b);
        if (arrA.length === arrB.length) {
          return arrA[arrA.length - 1] - arrB[arrB.length - 1];
        } else {
          return arrA.length - arrB.length;
        }
      },
      sortOrder:
        sortedInfo.columnKey === "productCode" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "T??n s???n ph???m",
      dataIndex: "productName",
      key: "productName",
      filteredValue: filteredInfo.productName || null,
      onFilter: (value, record) => record.productName.includes(value),
      sorter: (a, b) => a.productName.length - b.productName.length,
      sortOrder:
        sortedInfo.columnKey === "productName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "????n gi??",
      dataIndex: "productPrice",
      key: "productPrice",
      sorter: (a, b) => a.productPrice - b.productPrice,
      sortOrder:
        sortedInfo.columnKey === "productPrice" ? sortedInfo.order : null,
      ellipsis: true,
      render: (data) => {
        return formatValue.formatCurrency(
          data,
          valueConfig.languageCode,
          valueConfig.currencyCode
        );
      },
    },
    // {
    //   title: "T???ng h??ng",
    //   dataIndex: "productQuantity",
    //   key: "productQuantity",
    //   sorter: (a, b) => a.productQuantity - b.productQuantity,
    //   sortOrder:
    //     sortedInfo.columnKey === "productQuantity" ? sortedInfo.order : null,
    //   ellipsis: true,
    //   render: (data) => {
    //     return formatValue.formatNumber(data, "en-US");
    //   },
    // },
    {
      title: "T???n kho",
      dataIndex: "remainQuantity",
      key: "remainQuantity",
      sorter: (a, b) => a.remainQuantity - b.remainQuantity,
      sortOrder:
        sortedInfo.columnKey === "remainQuantity" ? sortedInfo.order : null,
      ellipsis: true,
      render: (data) => {
        return formatValue.formatNumber(data, valueConfig.languageCode);
      },
    },
    {
      title: "H??nh ?????ng",
      key: "key",
      render: (data) => {
        return (
          <Space size="small">
            <Button
              type="primary"
              ghost
              size={size}
              onClick={() => {
                handleAdminAction(data, stateConst.VIEW_PROD_ACT_TYPE);
              }}
            >
              Xem
            </Button>
            <Button
              type="primary"
              // ghost
              size={size}
              onClick={() => {
                handleAdminAction(data, stateConst.EDIT_PRD_ACT_TYPE);
              }}
            >
              S???a
            </Button>
            <Button
              type="primary"
              danger
              size={size}
              onClick={() => {
                handleAdminAction(data, stateConst.DELETE_PROD_ACT_TYPE);
              }}
            >
              Xo??
            </Button>
          </Space>
        );
      },
    },
  ];

  let contextValue = {
    drawer: showDrawer,
    toggleDrawer: toggleDrawer,
  };

  let elementDrawer = !showDrawer.show ? <></> : <RightBarProductInfo />;

  return (
    <>
      <productManager.Provider value={contextValue}>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleAdminAction("", stateConst.ADD_PROD_ACT_TYPE);
            }}
          >
            Th??m s???n ph???m m???i
          </Button>
        </Space>
        <div className="admin_product_manager">
          <Table
            columns={columns}
            dataSource={productsList}
            onChange={handleChange}
          />
          {elementDrawer}
        </div>
        <CenteredModal />
        <Toast />
      </productManager.Provider>
    </>
  );
}
export default ManagerProductTable;
